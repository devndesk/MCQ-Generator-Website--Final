import { useState } from 'react';
import { Check, X, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MCQ } from '../types';

interface MCQCardProps {
  mcq: MCQ;
  index: number;
}

export function MCQCard({ mcq, index }: MCQCardProps) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setShowAnswer(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white border border-slate-100 rounded-[1.5rem] p-6 shadow-sm hover:shadow-md transition-shadow relative"
    >
      {/* Question Header */}
      <div className="flex gap-4 mb-6">
        <div className="flex-none">
          <div className="w-8 h-8 rounded-full bg-[#a855f7] text-white flex items-center justify-center font-bold text-sm shadow-md shadow-purple-200">
            {index + 1}
          </div>
        </div>
        <div>
          <p className="text-slate-800 font-semibold text-base leading-relaxed pt-1">
            {mcq.question}
          </p>
        </div>
      </div>

      {/* Options */}
      <div className="space-y-3 pl-12">
        {mcq.options.map((option, optIndex) => {
          const optionLabel = String.fromCharCode(65 + optIndex);
          const isCorrect = option === mcq.correctAnswer;
          const isSelected = option === selectedOption;
          
          let containerStyles = 'bg-white border-slate-200 hover:border-purple-300';
          let labelStyles = 'bg-slate-100 text-slate-500 font-bold';
          let textStyles = 'text-slate-700 font-medium';
          
          if (showAnswer) {
            if (isCorrect) {
              containerStyles = 'bg-green-50 border-green-400 ring-1 ring-green-400';
              labelStyles = 'bg-green-100 text-green-700';
              textStyles = 'text-green-800 font-semibold';
            } else if (isSelected && !isCorrect) {
              containerStyles = 'bg-red-50 border-red-400 ring-1 ring-red-400';
              labelStyles = 'bg-red-100 text-red-700';
              textStyles = 'text-red-800';
            } else {
              containerStyles = 'bg-slate-50 border-slate-100 opacity-60';
            }
          } else if (isSelected) {
            containerStyles = 'bg-purple-50 border-purple-500 ring-1 ring-purple-500';
            labelStyles = 'bg-purple-100 text-purple-700';
            textStyles = 'text-purple-900 font-semibold';
          }

          return (
            <button
              key={optIndex}
              onClick={() => handleOptionClick(option)}
              disabled={showAnswer}
              className={`w-full text-left p-3 rounded-2xl border-2 transition-all flex items-center gap-4 group ${containerStyles}`}
            >
              <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-colors ${labelStyles}`}>
                {optionLabel}
              </span>
              <span className={`flex-1 ${textStyles}`}>
                {option}
              </span>
              {showAnswer && isCorrect && <Check className="w-5 h-5 text-green-600 flex-none" />}
              {showAnswer && isSelected && !isCorrect && <X className="w-5 h-5 text-red-500 flex-none" />}
            </button>
          );
        })}
      </div>

      {/* Footer / Show Answer */}
      <div className="mt-4 pl-12">
        {!showAnswer ? (
          <button
            onClick={() => setShowAnswer(true)}
            className="flex items-center gap-2 text-sm font-bold text-purple-600 hover:text-purple-700 transition-colors"
          >
            <Eye className="w-4 h-4" />
            Show Answer
          </button>
        ) : (
          <div className="bg-purple-50 rounded-xl p-4 border border-purple-100 animate-in fade-in slide-in-from-top-2 duration-300">
             <button
               onClick={() => setShowAnswer(false)}
               className="flex items-center gap-2 text-xs font-bold text-purple-600 hover:text-purple-700 mb-3"
             >
               <EyeOff className="w-3.5 h-3.5" /> Hide Answer
             </button>
             
             <p className="text-sm font-bold text-slate-800 mb-1">Correct Answer: <span className="text-purple-700">{mcq.correctAnswer}</span></p>
             {mcq.explanation && (
                <p className="text-xs text-slate-600 leading-relaxed mt-2 border-t border-purple-100 pt-2">
                   <span className="font-semibold text-purple-700 uppercase text-[10px] tracking-wider block mb-1">Explanation</span>
                   {mcq.explanation}
                </p>
             )}
          </div>
        )}
      </div>

      {/* Decorative vertical line if needed (from image) */}
      <div className="absolute top-6 bottom-6 -left-[2px] w-1 bg-transparent rounded-full" /> 
    </motion.div>
  );
}
