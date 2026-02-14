import { MCQ } from '../types';

// Fallback (Local) Generator
export const generateLocalMCQs = (text: string, count: number, difficulty: string): MCQ[] => {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 10);
  const mcqs: MCQ[] = [];
  
  const shuffled = sentences.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, count);

  selected.forEach(sentence => {
    const words = sentence.trim().split(/\s+/);
    if (words.length < 4) return;

    const targetIndex = Math.floor(Math.random() * words.length);
    const answer = words[targetIndex].replace(/[^a-zA-Z0-9]/g, '');
    
    if (answer.length < 3) return;

    const question = sentence.replace(words[targetIndex], '_______');
    
    const options = [
      answer,
      reverseString(answer),
      scrambleString(answer),
      "None of these"
    ].sort(() => 0.5 - Math.random());

    mcqs.push({
      id: Math.random().toString(36).substr(2, 9),
      question,
      options,
      correctAnswer: answer,
      explanation: `The correct word is "${answer}" based on the text.`
    });
  });

  while(mcqs.length < count) {
      if(mcqs.length === 0) break;
      const random = mcqs[Math.floor(Math.random() * mcqs.length)];
      mcqs.push({ ...random, id: Math.random().toString() });
  }

  return mcqs.slice(0, count);
};

const reverseString = (s: string) => s.split('').reverse().join('');
const scrambleString = (s: string) => s.split('').sort(() => 0.5 - Math.random()).join('');


// REAL AI GENERATOR (Groq API)
export const generateMCQsWithGroq = async (input: string, count: number, difficulty: string, apiKey: string): Promise<MCQ[]> => {
  
  // Determine if input is a topic (short) or context (long)
  const isTopic = input.length < 200;
  
  const systemPrompt = `
    You are an expert educational AI. 
    Your task is to generate ${count} multiple-choice questions (MCQs) for a student.
    Difficulty Level: ${difficulty}.
    
    OUTPUT FORMAT:
    Return ONLY a raw JSON array. No markdown, no explanations, no code blocks.
    Structure:
    [
      {
        "question": "Question text?",
        "options": ["A", "B", "C", "D"],
        "correctAnswer": "The correct option text",
        "explanation": "Why this is correct."
      }
    ]
    
    CRITICAL RULES:
    1. Ensure the output is valid JSON.
    2. Escape all double quotes inside strings (e.g., "The term \\"cell\\" means...").
    3. Do not include any trailing commas.
    4. Ensure the JSON array is closed properly with ']'.
  `;

  const userPrompt = isTopic 
    ? `Topic: "${input}". Generate ${count} comprehensive MCQs covering key concepts of this topic.`
    : `Context: "${input.substring(0, 6000)}". Generate ${count} MCQs based STRICTLY on this text.`;

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile", // High quality, fast model
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 8000 // Increased token limit for larger sets
      })
    });

    if (!response.ok) {
        const err = await response.text();
        throw new Error(`Groq API Error: ${err}`);
    }

    const data = await response.json();
    const rawContent = data.choices[0].message.content;
    
    // Clean potential markdown and whitespace
    let jsonString = rawContent.replace(/```json/g, '').replace(/```/g, '').trim();
    
    // Attempt to repair truncated JSON (if it doesn't end with ']')
    if (!jsonString.endsWith(']')) {
       // Check if it ends with '}' or '},'
       const lastBracket = jsonString.lastIndexOf('}');
       if (lastBracket !== -1) {
          jsonString = jsonString.substring(0, lastBracket + 1) + ']';
       }
    }
    
    let parsedMCQs;
    try {
        parsedMCQs = JSON.parse(jsonString);
    } catch (e) {
        // Fallback: Try to find array bracket if text surrounds it
        const start = jsonString.indexOf('[');
        const end = jsonString.lastIndexOf(']');
        if (start !== -1 && end !== -1) {
            try {
                parsedMCQs = JSON.parse(jsonString.substring(start, end + 1));
            } catch(innerE) {
                console.error("Failed to parse substring JSON:", innerE);
                throw e;
            }
        } else {
            throw e;
        }
    }
    
    if (!Array.isArray(parsedMCQs)) {
        throw new Error("AI response was not a JSON array");
    }

    return parsedMCQs.map((mcq: any) => ({
      ...mcq,
      id: Math.random().toString(36).substr(2, 9)
    }));

  } catch (error) {
    console.error("AI Generation Failed:", error);
    throw error;
  }
};

// Main Export
export const generateMCQs = async (text: string, count: number, difficulty: string, apiKey?: string): Promise<MCQ[]> => {
  if (apiKey && apiKey.length > 10) {
    try {
      return await generateMCQsWithGroq(text, count, difficulty, apiKey);
    } catch (e) {
      console.warn("AI Failed, falling back to local:", e);
      return generateLocalMCQs(text, count, difficulty);
    }
  } else {
    return generateLocalMCQs(text, count, difficulty);
  }
};
