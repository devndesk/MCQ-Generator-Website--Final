import { useState, useEffect } from 'react';
import { Library as LibraryIcon, Trash2, Download, Calendar, FileText, Search, Filter, FileDown } from 'lucide-react';
import { motion } from 'motion/react';
import { MCQCard } from '../components/MCQCard';
import { downloadAsPDF } from '../utils/pdfExport';
import { Footer } from './Footer';

interface SavedMCQSet {
  id: number;
  date: string;
  title: string;
  mcqs: any[];
}

export function Library() {
  const [savedSets, setSavedSets] = useState<SavedMCQSet[]>([]);
  const [selectedSet, setSelectedSet] = useState<SavedMCQSet | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [downloadingPDF, setDownloadingPDF] = useState(false);

  useEffect(() => {
    loadSavedSets();
  }, []);

  const loadSavedSets = () => {
    const saved = localStorage.getItem('savedMCQs');
    if (saved) {
      setSavedSets(JSON.parse(saved));
    }
  };

  const handleDelete = (id: number) => {
    const updated = savedSets.filter(set => set.id !== id);
    setSavedSets(updated);
    localStorage.setItem('savedMCQs', JSON.stringify(updated));
    if (selectedSet?.id === id) {
      setSelectedSet(null);
    }
  };

  const handleDownload = (set: SavedMCQSet) => {
    const text = set.mcqs.map((mcq, index) => {
      const optionsText = mcq.options.map((opt: string, i: number) => 
        `${String.fromCharCode(65 + i)}. ${opt}`
      ).join('\n');
      return `Q${index + 1}. ${mcq.question}\n${optionsText}\nCorrect Answer: ${mcq.correctAnswer}`;
    }).join('\n\n');

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${set.title}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadPDF = async (set: SavedMCQSet) => {
    setDownloadingPDF(true);
    try {
      await downloadAsPDF(set.mcqs);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
    setDownloadingPDF(false);
  };

  const filteredSets = savedSets.filter(set => 
    set.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <LibraryIcon className="w-10 h-10 text-violet-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
              Your Library
            </h1>
          </div>
          <p className="text-gray-600">
            Access all your saved MCQ sets
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Saved Sets List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-purple-100 sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5 text-violet-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Saved Sets ({savedSets.length})
                </h2>
              </div>

              {/* Search */}
              <div className="relative mb-4">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search sets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                />
              </div>

              {filteredSets.length === 0 ? (
                <div className="text-center py-12">
                  <LibraryIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">
                    {searchQuery ? 'No sets found' : 'No saved MCQ sets yet'}
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    {searchQuery ? 'Try a different search' : 'Generate and save some MCQs to see them here'}
                  </p>
                </div>
              ) : (
                <div className="space-y-2 max-h-[600px] overflow-y-auto custom-scrollbar">
                  {filteredSets.map((set) => (
                    <div
                      key={set.id}
                      onClick={() => setSelectedSet(set)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedSet?.id === set.id
                          ? 'border-violet-500 bg-violet-50'
                          : 'border-gray-200 hover:border-violet-300 hover:bg-purple-50'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900 line-clamp-1">
                          {set.title}
                        </h3>
                        <span className="flex-shrink-0 ml-2 px-2 py-1 bg-violet-100 text-violet-700 rounded-full text-xs font-semibold">
                          {set.mcqs.length} Q
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        {new Date(set.date).toLocaleDateString()}
                      </div>
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownload(set);
                          }}
                          className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
                        >
                          <Download className="w-3.5 h-3.5" />
                          Download
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirm('Are you sure you want to delete this set?')) {
                              handleDelete(set.id);
                            }
                          }}
                          className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Delete
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownloadPDF(set);
                          }}
                          className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium"
                        >
                          <Download className="w-3.5 h-3.5" />
                          Download PDF
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* MCQ Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-purple-100">
              {selectedSet ? (
                <>
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {selectedSet.title}
                    </h2>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(selectedSet.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        {selectedSet.mcqs.length} Questions
                      </div>
                    </div>
                    
                    {/* Download Actions */}
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => handleDownload(selectedSet)}
                        className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium shadow-md hover:shadow-lg"
                      >
                        <Download className="w-4 h-4" />
                        Download as TXT
                      </button>
                      <button
                        onClick={() => handleDownloadPDF(selectedSet)}
                        disabled={downloadingPDF}
                        className="flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-medium shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <FileDown className="w-4 h-4" />
                        {downloadingPDF ? 'Generating PDF...' : 'Download as PDF'}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4 max-h-[700px] overflow-y-auto custom-scrollbar">
                    {selectedSet.mcqs.map((mcq, index) => (
                      <MCQCard key={index} mcq={mcq} index={index} />
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-violet-100 to-fuchsia-100 rounded-full flex items-center justify-center mb-4">
                    <FileText className="w-12 h-12 text-violet-400" />
                  </div>
                  <p className="text-gray-500 text-lg">
                    Select a set to view MCQs
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    Choose from your saved sets on the left
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}