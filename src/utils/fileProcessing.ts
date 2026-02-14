import mammoth from 'mammoth';

// We declare the global variable for TypeScript
declare global {
  interface Window {
    pdfjsLib: any;
  }
}

export async function parseFile(file: File): Promise<string> {
  const fileType = file.type;
  const fileName = file.name.toLowerCase();

  try {
    if (fileType === 'application/pdf' || fileName.endsWith('.pdf')) {
      return await extractTextFromPDF(file);
    } else if (
      fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
      fileName.endsWith('.docx')
    ) {
      return await extractTextFromDOCX(file);
    } else {
      // Default to text for other formats
      return await readTextFile(file);
    }
  } catch (error) {
    console.error('Error parsing file:', error);
    throw new Error(`Failed to parse file: ${error instanceof Error ? error.message : String(error)}`);
  }
}

async function readTextFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = (e) => reject(new Error('Failed to read text file'));
    reader.readAsText(file);
  });
}

// Helper to dynamically load PDF.js from CDN
// This bypasses the environment's incompatible npm package
async function loadPdfJsLibrary(): Promise<any> {
  if (window.pdfjsLib) {
    return window.pdfjsLib;
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    // Using a stable, known-good version (v3.11.174)
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
    script.onload = () => {
      // Configure worker immediately after load
      if (window.pdfjsLib) {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        resolve(window.pdfjsLib);
      } else {
        reject(new Error('PDF.js loaded but window.pdfjsLib is undefined'));
      }
    };
    script.onerror = () => reject(new Error('Failed to load PDF.js library from CDN'));
    document.head.appendChild(script);
  });
}

async function extractTextFromPDF(file: File): Promise<string> {
  try {
    // Ensure library is loaded
    const pdfjs = await loadPdfJsLibrary();
    
    const arrayBuffer = await file.arrayBuffer();
    
    // Load the PDF document
    const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    
    let fullText = '';
    const numPages = pdf.numPages;

    // Iterate through all pages
    for (let i = 1; i <= numPages; i++) {
      const page = await pdf.getPage(i);
      
      // Get text content
      const textContent = await page.getTextContent();
      
      // Join text items
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
        
      fullText += pageText + '\n\n';
    }

    return fullText.trim();
  } catch (error) {
    console.error('PDF Extraction Error:', error);
    throw new Error('Could not extract text from PDF. The file might be corrupted or password protected.');
  }
}

async function extractTextFromDOCX(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    
    if (result.messages && result.messages.length > 0) {
      console.log('Mammoth messages:', result.messages);
    }
    
    return result.value.trim();
  } catch (error) {
    console.error('DOCX Extraction Error:', error);
    throw new Error('Could not extract text from DOCX document.');
  }
}
