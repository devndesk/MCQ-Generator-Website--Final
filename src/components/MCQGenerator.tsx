import { useState } from 'react';
import { FileUp, FileText, Sparkles, Download, Copy, Check } from 'lucide-react';
import { generateMCQs } from '../utils/mcqGenerator';
import { MCQCard } from './MCQCard';
import { MCQ } from '../types';

export function MCQGenerator() {
  const [inputText, setInputText] = useState('');
  const [mcqs, setMcqs] = useState<MCQ[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [numQuestions, setNumQuestions] = useState(5);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [copied, setCopied] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setInputText(text);
    };
    reader.readAsText(file);
  };

  const handleGenerate = async () => {
    if (!inputText.trim()) {
      alert('Please enter some text or upload a file first!');
      return;
    }

    setIsGenerating(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const generatedMCQs = generateMCQs(inputText, numQuestions, difficulty);
    setMcqs(generatedMCQs);
    setIsGenerating(false);
  };

  const handleCopyAll = () => {
    const text = mcqs.map((mcq, index) => {
      const optionsText = mcq.options.map((opt, i) => 
        `${String.fromCharCode(65 + i)}. ${opt}`
      ).join('\n');
      return `Q${index + 1}. ${mcq.question}\n${optionsText}\nCorrect Answer: ${mcq.correctAnswer}`;
    }).join('\n\n');

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const text = mcqs.map((mcq, index) => {
      const optionsText = mcq.options.map((opt, i) => 
        `${String.fromCharCode(65 + i)}. ${opt}`
      ).join('\n');
      return `Q${index + 1}. ${mcq.question}\n${optionsText}\nCorrect Answer: ${mcq.correctAnswer}`;
    }).join('\n\n');

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mcqs.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Sparkles className="w-10 h-10 text-indigo-600" />
          <h1 className="text-4xl font-bold text-gray-900">MCQ Generator</h1>
        </div>
        <p className="text-lg text-gray-600">
          Generate multiple-choice questions from any text or document
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Input Text</h2>
            
            {/* File Upload */}
            <div className="mb-4">
              <label className="flex items-center justify-center w-full px-4 py-6 bg-indigo-50 border-2 border-dashed border-indigo-300 rounded-lg cursor-pointer hover:bg-indigo-100 transition-colors">
                <div className="flex flex-col items-center gap-2">
                  <FileUp className="w-8 h-8 text-indigo-600" />
                  <span className="text-sm font-medium text-indigo-600">
                    Upload PDF or Text File
                  </span>
                  <span className="text-xs text-gray-500">
                    or paste text below
                  </span>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept=".txt,.pdf,.doc,.docx"
                  onChange={handleFileUpload}
                />
              </label>
            </div>

            {/* Text Area */}
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your text here or upload a file above..."
              className="w-full h-64 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
            />

            {/* Settings */}
            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Questions: {numQuestions}
                </label>
                <input
                  type="range"
                  min="3"
                  max="15"
                  value={numQuestions}
                  onChange={(e) => setNumQuestions(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Difficulty Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['easy', 'medium', 'hard'] as const).map((level) => (
                    <button
                      key={level}
                      onClick={() => setDifficulty(level)}
                      className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
                        difficulty === level
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={isGenerating || !inputText.trim()}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <Sparkles className="w-5 h-5" />
                {isGenerating ? 'Generating...' : 'Generate MCQs'}
              </button>
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Generated MCQs {mcqs.length > 0 && `(${mcqs.length})`}
              </h2>
              {mcqs.length > 0 && (
                <div className="flex gap-2">
                  <button
                    onClick={handleCopyAll}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              )}
            </div>

            {mcqs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <FileText className="w-16 h-16 text-gray-300 mb-4" />
                <p className="text-gray-500">
                  Your generated MCQs will appear here
                </p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {mcqs.map((mcq, index) => (
                  <MCQCard key={index} mcq={mcq} index={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
