import { useState } from 'react';
import { BookOpen, GraduationCap, Briefcase, Code, Beaker, Globe, Copy, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { copyToClipboard } from '../utils/clipboard';
import { Footer } from './Footer';

export function Templates() {
  const navigate = useNavigate();
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const templates = [
    {
      id: 1,
      title: 'History & Social Studies',
      icon: BookOpen,
      color: 'from-blue-500 to-cyan-500',
      description: 'Perfect for historical events, dates, and key figures',
      sampleText: `The French Revolution began in 1789 and lasted until 1799. It was a period of radical social and political upheaval in France that had a lasting impact on French history and more broadly throughout Europe. The Revolution overthrew the monarchy, established a republic, experienced violent periods of political turmoil, and finally culminated in a dictatorship under Napoleon Bonaparte.`,
    },
    {
      id: 2,
      title: 'Science & Biology',
      icon: Beaker,
      color: 'from-green-500 to-emerald-500',
      description: 'Great for scientific concepts and processes',
      sampleText: `Photosynthesis is the process by which plants use sunlight, water, and carbon dioxide to create oxygen and energy in the form of sugar. This process primarily occurs in the chloroplasts of plant cells, specifically in structures called thylakoids. Chlorophyll, the green pigment in plants, absorbs light energy to power the chemical reactions.`,
    },
    {
      id: 3,
      title: 'Programming & Tech',
      icon: Code,
      color: 'from-purple-500 to-violet-500',
      description: 'Ideal for coding concepts and terminology',
      sampleText: `JavaScript is a high-level, interpreted programming language that conforms to the ECMAScript specification. It is a language that is also characterized as dynamic, weakly typed, prototype-based and multi-paradigm. JavaScript was originally created to make web pages alive and interactive. Today, it can execute not only in browsers but also on servers and any device with a JavaScript engine.`,
    },
    {
      id: 4,
      title: 'Business & Economics',
      icon: Briefcase,
      color: 'from-orange-500 to-red-500',
      description: 'Suitable for business terms and economic principles',
      sampleText: `Supply and demand is an economic model of price determination in a market. It postulates that in a competitive market, the unit price for a particular good will vary until it settles at a point where the quantity demanded equals the quantity supplied, resulting in an economic equilibrium for price and quantity transacted.`,
    },
    {
      id: 5,
      title: 'Geography & Environment',
      icon: Globe,
      color: 'from-teal-500 to-cyan-500',
      description: 'Perfect for geographical facts and environmental topics',
      sampleText: `Climate change refers to long-term shifts in temperatures and weather patterns. These shifts may be natural, but since the 1800s, human activities have been the main driver of climate change, primarily due to the burning of fossil fuels like coal, oil and gas, which produces heat-trapping gases. The consequences include rising sea levels, extreme weather events, and ecosystem disruption.`,
    },
    {
      id: 6,
      title: 'Literature & Language',
      icon: GraduationCap,
      color: 'from-pink-500 to-rose-500',
      description: 'Great for literary analysis and language learning',
      sampleText: `A metaphor is a figure of speech that directly compares two unlike things without using "like" or "as". It suggests that one thing is another to make a comparison more vivid and meaningful. For example, "Time is money" is a metaphor that compares time to money, suggesting that time is valuable and should be spent wisely.`,
    },
  ];

  const handleUseTemplate = (template: typeof templates[0]) => {
    // Store the template text in localStorage to use in Generator
    localStorage.setItem('templateText', template.sampleText);
    navigate('/generator');
  };

  const handleCopyText = async (id: number, text: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } else {
      alert('Failed to copy to clipboard. Please try the "Use Template" button instead.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent mb-2">
            MCQ Templates
          </h1>
          <p className="text-gray-600 text-lg">
            Get started quickly with pre-made sample texts for different subjects
          </p>
        </motion.div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template, index) => {
            const Icon = template.icon;
            return (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-purple-100 overflow-hidden"
              >
                {/* Card Header */}
                <div className={`p-6 bg-gradient-to-br ${template.color}`}>
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {template.title}
                  </h3>
                  <p className="text-white/90 text-sm">
                    {template.description}
                  </p>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">
                      Sample Text:
                    </h4>
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 max-h-32 overflow-y-auto text-sm text-gray-600 leading-relaxed">
                      {template.sampleText}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUseTemplate(template)}
                      className={`flex-1 px-4 py-2.5 bg-gradient-to-r ${template.color} text-white rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105`}
                    >
                      Use Template
                    </button>
                    <button
                      onClick={() => handleCopyText(template.id, template.sampleText)}
                      className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      {copiedId === template.id ? (
                        <Check className="w-5 h-5 text-green-600" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-2xl p-8 text-center text-white shadow-xl"
        >
          <h2 className="text-2xl font-bold mb-3">
            Don't see your subject?
          </h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            No problem! You can paste any text or upload any document in the Generator page. 
            These templates are just here to help you get started quickly.
          </p>
          <button
            onClick={() => navigate('/generator')}
            className="px-8 py-3 bg-white text-violet-600 rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105"
          >
            Go to Generator
          </button>
        </motion.div>

      </div>
      
      <Footer />
    </div>
  );
}