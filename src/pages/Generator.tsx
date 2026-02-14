import { useState, useEffect, useRef } from 'react';
import { FileUp, FileText, Sparkles, Copy, Check, Save, Settings, Wand2, FileDown, Trash2, Upload, FileType, Zap, Key, Info, Cpu, FileSearch } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { generateMCQs } from '../utils/mcqGenerator'; // Updated to async
import { MCQCard } from '../components/MCQCard';
import { MCQ } from '../types';
import { downloadAsPDF } from '../utils/pdfExport';
import { copyToClipboard } from '../utils/clipboard';
import { parseFile } from '../utils/fileProcessing';
import { Footer } from './Footer';
import { Button } from '../components/ui/button';
import { Slider } from '../components/ui/slider';

// Background pattern
const Background = () => (
  <div className="fixed inset-0 -z-10 bg-[#fdfcff]">
    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-100/40 rounded-full blur-[100px] opacity-70" />
    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-fuchsia-100/40 rounded-full blur-[100px] opacity-70" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-50/50 rounded-full blur-[120px]" />
  </div>
);

export function Generator() {
  const [inputText, setInputText] = useState('');
  const [mcqs, setMcqs] = useState<MCQ[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [numQuestions, setNumQuestions] = useState(5);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [downloadingPDF, setDownloadingPDF] = useState(false);
  
  // AI vs Local Mode
  const [generationMode, setGenerationMode] = useState<'ai' | 'local'>('ai');
  const [apiKey, setApiKey] = useState('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');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load API Key from LocalStorage on mount (override default if user changed it)
  useEffect(() => {
    const savedKey = localStorage.getItem('groq_api_key');
    if (savedKey) setApiKey(savedKey);
  }, []);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const text = await parseFile(file);
      setInputText(text);
    } catch (error) {
      alert('Failed to read file.');
    } finally {
      event.target.value = '';
    }
  };

  const handleGenerate = async () => {
    if (!inputText.trim()) {
      alert('Please enter a topic or upload a file first!');
      return;
    }
    setIsGenerating(true);
    setMcqs([]);
    
    try {
      // Pass API key ONLY if AI mode is selected
      const keyToUse = generationMode === 'ai' ? apiKey : undefined;
      const generatedMCQs = await generateMCQs(inputText, numQuestions, difficulty, keyToUse);
      setMcqs(generatedMCQs);
    } catch (error) {
      console.error(error);
      alert("Failed to generate questions. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyAll = async () => {
    const text = mcqs.map((mcq, index) => {
      const optionsText = mcq.options.map((opt, i) => `${String.fromCharCode(65 + i)}. ${opt}`).join('\n');
      return `Q${index + 1}. ${mcq.question}\n${optionsText}\nCorrect Answer: ${mcq.correctAnswer}`;
    }).join('\n\n');
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadPDF = async () => {
    setDownloadingPDF(true);
    try { await downloadAsPDF(mcqs); } catch (e) { alert('PDF Error'); }
    setDownloadingPDF(false);
  };

  const handleDownloadTXT = () => {
    const text = mcqs.map((mcq, index) => {
      const optionsText = mcq.options.map((opt, i) => `${String.fromCharCode(65 + i)}. ${opt}`).join('\n');
      return `Q${index + 1}. ${mcq.question}\n${optionsText}\nCorrect Answer: ${mcq.correctAnswer}`;
    }).join('\n\n');
    
    const element = document.createElement("a");
    const file = new Blob([text], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "mcqs.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleSave = () => {
    const existing = localStorage.getItem('savedMCQs');
    const saved = existing ? JSON.parse(existing) : [];
    saved.push({ id: Date.now(), date: new Date().toISOString(), mcqs, title: `MCQ Set - ${new Date().toLocaleDateString()}` });
    localStorage.setItem('savedMCQs', JSON.stringify(saved));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleClear = () => {
    if (confirm('Clear everything?')) {
      setInputText('');
      setMcqs([]);
    }
  };

  return (
    <div className="h-screen font-sans text-slate-800 selection:bg-purple-100 selection:text-purple-900 overflow-hidden flex flex-col bg-[#fdfcff]">
      <Background />
      
      {/* Navbar / Header */}
      <div className="flex-none px-6 py-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-violet-500 to-fuchsia-500 p-2 rounded-xl shadow-lg shadow-purple-200 text-white">
               <Sparkles className="w-5 h-5" />
            </div>
            <h1 className="font-bold text-xl text-slate-800 tracking-tight">MCQ<span className="text-purple-600">Gen</span> AI</h1>
        </div>
        <div className="flex gap-4">
           {/* Navigation could go here */}
        </div>
      </div>

      <div className="flex-grow max-w-[1600px] mx-auto w-full px-6 pb-6 min-h-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
          
          {/* LEFT COLUMN: Input & Settings (Scrollable but hidden scrollbar) */}
          <div className="lg:col-span-5 flex flex-col gap-6 h-full overflow-y-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            
            {/* Input Text Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl shadow-purple-100/50 border border-white/50 flex-none"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h2 className="text-lg font-bold text-slate-800">Input Content</h2>
                </div>
                {inputText.length > 0 && (
                   <button onClick={handleClear} className="text-xs text-slate-400 hover:text-red-500 flex items-center gap-1 font-medium transition-colors">
                     <Trash2 className="w-3.5 h-3.5" /> Clear
                   </button>
                )}
              </div>

              {/* Upload Box */}
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="mb-6 border-2 border-dashed border-purple-100 bg-purple-50/30 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-purple-50 hover:border-purple-300 transition-all group"
              >
                <div className="w-12 h-12 bg-white text-purple-600 rounded-2xl flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform">
                  <Upload className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-700 mb-1">Upload Document</h3>
                <p className="text-xs text-slate-400 font-medium">PDF, DOCX, or TXT</p>
                <input 
                  ref={fileInputRef}
                  type="file" 
                  className="hidden" 
                  accept=".txt,.pdf,.doc,.docx" 
                  onChange={handleFileUpload} 
                />
              </div>

              {/* Text Area */}
              <div className="relative">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Enter a Topic (e.g. 'Photosynthesis') or paste your study notes here..."
                  className="w-full h-40 p-4 bg-slate-50 border border-slate-100 rounded-2xl resize-none focus:ring-2 focus:ring-purple-500/10 focus:border-purple-500 outline-none text-sm text-slate-600 leading-relaxed custom-scrollbar placeholder:text-slate-400 transition-all"
                />
              </div>
            </motion.div>

            {/* Settings Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl shadow-purple-100/50 border border-white/50 flex-none"
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-fuchsia-50 rounded-lg text-fuchsia-600">
                   <Settings className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-bold text-slate-800">Configuration</h2>
              </div>

              {/* Generation Mode Selector */}
              <div className="mb-8">
                <label className="text-sm font-bold text-slate-700 mb-4 block">Generation Mode</label>
                <div className="grid grid-cols-2 gap-3 mb-3">
                    <button
                        onClick={() => setGenerationMode('ai')}
                        className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all gap-2 ${
                            generationMode === 'ai' 
                            ? 'border-violet-500 bg-violet-50 text-violet-700 shadow-sm' 
                            : 'border-slate-100 bg-slate-50 text-slate-400 hover:bg-slate-100'
                        }`}
                    >
                        <Cpu className="w-6 h-6" />
                        <span className="text-sm font-bold">Smart AI</span>
                    </button>
                    <button
                        onClick={() => setGenerationMode('local')}
                        className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all gap-2 ${
                            generationMode === 'local' 
                            ? 'border-fuchsia-500 bg-fuchsia-50 text-fuchsia-700 shadow-sm' 
                            : 'border-slate-100 bg-slate-50 text-slate-400 hover:bg-slate-100'
                        }`}
                    >
                        <FileSearch className="w-6 h-6" />
                        <span className="text-sm font-bold">Strict Local</span>
                    </button>
                </div>
                <div className="text-xs text-slate-500 px-1 leading-relaxed">
                   {generationMode === 'ai' 
                     ? "✨ Powered by Groq Llama 3.3. Best for understanding topics and creating smart questions."
                     : "📄 Works offline. Extracts questions strictly from the text you upload. Best for specific definitions."
                   }
                </div>
              </div>

              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-sm font-bold text-slate-700">Question Count</label>
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-900 text-white font-bold text-sm shadow-lg shadow-slate-200">
                    {numQuestions}
                  </span>
                </div>
                <Slider 
                  value={[numQuestions]} 
                  onValueChange={(val) => setNumQuestions(val[0])} 
                  min={1} 
                  max={50} 
                  step={1} 
                  className="py-2"
                />
              </div>

              <div className="mb-8">
                <label className="text-sm font-bold text-slate-700 mb-4 block">Difficulty</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['easy', 'medium', 'hard'] as const).map((level) => (
                    <button
                      key={level}
                      onClick={() => setDifficulty(level)}
                      className={`py-3 px-4 rounded-xl text-sm font-bold capitalize transition-all border-2 ${
                        difficulty === level
                          ? 'border-violet-500 bg-violet-50 text-violet-700 shadow-sm'
                          : 'border-transparent bg-slate-50 text-slate-500 hover:bg-slate-100'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !inputText.trim()}
                className={`w-full h-14 font-bold text-lg rounded-2xl shadow-xl transition-all text-white ${
                    generationMode === 'ai' 
                    ? 'bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 hover:from-violet-500 hover:via-purple-500 hover:to-fuchsia-500 shadow-purple-200' 
                    : 'bg-slate-800 hover:bg-slate-700 shadow-slate-200'
                } hover:-translate-y-1`}
              >
                {isGenerating ? (
                  <div className="flex items-center gap-3">
                    <Wand2 className="w-5 h-5 animate-spin" />
                    Generating...
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 fill-current" />
                    Generate {generationMode === 'ai' ? 'AI' : 'Local'} MCQs
                  </div>
                )}
              </Button>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Generated MCQs (FIXED HEIGHT with SCROLL) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-7 h-full min-h-0 flex flex-col"
          >
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl shadow-purple-100/50 border border-white/50 h-full flex flex-col overflow-hidden relative">
              
              {/* Header */}
              <div className="flex-none p-6 border-b border-slate-100/50 flex justify-between items-center z-20 bg-white/50 backdrop-blur-sm">
                <div>
                  <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3">
                    Results 
                    {mcqs.length > 0 && (
                      <span className="text-sm bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-bold">
                        {mcqs.length}
                      </span>
                    )}
                  </h2>
                </div>
                
                {mcqs.length > 0 && (
                   <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={handleSave} className="h-9 border-slate-200 hover:bg-slate-50 hover:text-green-600 transition-colors">
                        {saved ? <Check className="w-4 h-4 mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                        Save
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleCopyAll} className="h-9 border-slate-200 hover:bg-slate-50 hover:text-blue-600 transition-colors">
                        {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                        Copy
                      </Button>
                      <div className="w-px h-6 bg-slate-200 mx-1" />
                      <Button variant="ghost" size="icon" onClick={handleDownloadTXT} className="h-9 w-9 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg">
                        <FileType className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={handleDownloadPDF} disabled={downloadingPDF} className="h-9 w-9 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                        <FileDown className="w-4 h-4" />
                      </Button>
                   </div>
                )}
              </div>

              {/* Scrollable Content Area */}
              <div className="flex-grow bg-[#fcfbff]/50 overflow-y-auto p-6 relative [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-purple-300 transition-colors">
                <AnimatePresence mode="wait">
                  {mcqs.length === 0 ? (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="h-full flex flex-col items-center justify-center text-center pb-20 opacity-60"
                    >
                      <div className="w-48 h-48 bg-gradient-to-tr from-violet-100 to-fuchsia-50 rounded-full flex items-center justify-center mb-6 animate-pulse">
                         <div className="w-32 h-32 bg-white rounded-full shadow-xl flex items-center justify-center">
                            <Sparkles className="w-12 h-12 text-purple-300" />
                         </div>
                      </div>
                      <h3 className="text-2xl font-bold text-slate-800 mb-2">Ready to Create?</h3>
                      <p className="text-slate-400 font-medium max-w-xs mx-auto mb-4">
                        Type a topic like "Photosynthesis" or upload a document to generate questions.
                      </p>
                      {generationMode === 'local' && (
                        <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
                           <Info className="w-3 h-3" />
                           Using Local Mode (Strict Text Matching)
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    <div className="space-y-6">
                      {mcqs.map((mcq, index) => (
                        <MCQCard key={index} mcq={mcq} index={index} />
                      ))}
                      
                      {/* Footer spacing */}
                      <div className="h-12 flex items-center justify-center opacity-30">
                        <div className="w-16 h-1 bg-slate-200 rounded-full" />
                      </div>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
