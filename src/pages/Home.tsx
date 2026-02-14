import { Link } from 'react-router';
import { Sparkles, FileText, BookOpen, Zap, Download, Check, Star, Users, Award, ArrowRight, Brain, Target, Clock, Layers, TrendingUp, Shield } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Footer } from './Footer';
import { useRef } from 'react';

export function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Generate up to 50 MCQs in seconds with AI',
      color: 'from-yellow-400 to-orange-500',
    },
    {
      icon: FileText,
      title: 'Multiple Formats',
      description: 'Support for PDF, Word, and text files',
      color: 'from-blue-400 to-cyan-500',
    },
    {
      icon: Brain,
      title: 'AI-Powered',
      description: 'Advanced algorithms for quality questions',
      color: 'from-purple-400 to-pink-500',
    },
    {
      icon: BookOpen,
      title: 'Smart Library',
      description: 'Save and organize your MCQ sets',
      color: 'from-green-400 to-emerald-500',
    },
    {
      icon: Download,
      title: 'Easy Export',
      description: 'Download as PDF or copy to clipboard',
      color: 'from-red-400 to-rose-500',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data stays on your device',
      color: 'from-indigo-400 to-violet-500',
    },
  ];

  const stats = [
    { value: '50K+', label: 'MCQs Generated', icon: Sparkles },
    { value: '2,500+', label: 'Active Users', icon: Users },
    { value: '99%', label: 'Accuracy Rate', icon: Award },
    { value: '4.9/5', label: 'User Rating', icon: Star },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      {/* Hero Section with 3D Parallax */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            style={{ y }}
            className="absolute top-20 left-10 w-72 h-72 bg-violet-400/30 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            style={{ y: useTransform(scrollYProgress, [0, 1], [0, -200]) }}
            className="absolute top-40 right-20 w-96 h-96 bg-fuchsia-400/30 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              x: [0, -50, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-20 left-1/3 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              y: [0, 30, 0],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <motion.div style={{ opacity }} className="max-w-6xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateX: 90 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-full text-sm font-semibold mb-8 shadow-lg cursor-pointer"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-4 h-4" />
              </motion.div>
              AI-Powered MCQ Generator Platform
            </motion.span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-gray-900 mb-6 leading-tight"
          >
            Transform Content
            <br />
            <motion.span
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                backgroundSize: '200% 200%',
              }}
              className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-purple-600 bg-clip-text text-transparent"
            >
              Into MCQs
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto"
          >
            Generate professional multiple choice questions instantly with AI.
            Perfect for students, educators, and content creators.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12"
          >
            <Link to="/generator">
              <motion.div
                whileHover={{ scale: 1.05, rotateY: 5, z: 50 }}
                whileTap={{ scale: 0.95 }}
                style={{ transformStyle: 'preserve-3d' }}
                className="group relative px-10 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-2xl font-bold text-lg shadow-2xl overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-violet-600"
                  initial={{ x: '100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 flex items-center gap-3">
                  <Sparkles className="w-5 h-5" />
                  Start Creating Free
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </span>
              </motion.div>
            </Link>

            <Link to="/templates">
              <motion.div
                whileHover={{ scale: 1.05, rotateY: -5 }}
                whileTap={{ scale: 0.95 }}
                style={{ transformStyle: 'preserve-3d' }}
                className="px-10 py-4 bg-white text-gray-700 rounded-2xl font-bold text-lg shadow-xl border-2 border-gray-200 hover:border-violet-400 transition-all"
              >
                <span className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5" />
                  Browse Templates
                </span>
              </motion.div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600"
          >
            {['Free Forever', 'No Registration', 'Privacy Protected'].map((text, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="flex items-center gap-2"
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.3 }}
                >
                  <Check className="w-5 h-5 text-green-600" />
                </motion.div>
                <span>{text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-gray-400 rounded-full flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-gray-400 rounded-full"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* 3D Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">Thousands</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5, rotateY: 180 }}
                  whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.1,
                    rotateY: 10,
                    z: 50,
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className="relative group"
                >
                  <div className="bg-gradient-to-br from-white to-purple-50 rounded-2xl p-8 shadow-xl border border-purple-100 hover:border-violet-400 transition-all">
                    <motion.div
                      className="w-14 h-14 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </motion.div>
                    
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", delay: index * 0.1 + 0.3 }}
                      className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent mb-2"
                    >
                      {stat.value}
                    </motion.div>
                    
                    <div className="text-gray-600 font-semibold text-sm">
                      {stat.label}
                    </div>

                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-400/0 to-fuchsia-400/0 group-hover:from-violet-400/10 group-hover:to-fuchsia-400/10 transition-all" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3D Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">Features</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Everything you need to create professional MCQs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ 
                    y: -10,
                    rotateX: 5,
                    rotateY: 5,
                    scale: 1.02,
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100"
                >
                  <motion.div
                    className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 shadow-lg`}
                    whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </motion.div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>

                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/0 to-fuchsia-500/0 group-hover:from-violet-500/5 group-hover:to-fuchsia-500/5 transition-all pointer-events-none" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3D How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">Works</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Generate MCQs in three simple steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Upload Content',
                description: 'Add your text, PDF, or Word document',
                icon: FileText,
              },
              {
                step: '2',
                title: 'Configure',
                description: 'Choose quantity (3-50) and difficulty',
                icon: Target,
              },
              {
                step: '3',
                title: 'Export',
                description: 'Download or copy your MCQs',
                icon: Download,
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, rotateX: 45 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: 5,
                    z: 50
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className="relative"
                >
                  <div className="bg-gradient-to-br from-white to-purple-50 rounded-2xl p-8 shadow-xl border border-purple-100 text-center">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-full mb-6 text-white text-3xl font-bold shadow-lg"
                    >
                      {item.step}
                    </motion.div>
                    
                    <div className="mb-4">
                      <Icon className="w-10 h-10 text-violet-600 mx-auto" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">
                      {item.description}
                    </p>
                  </div>

                  {index < 2 && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8 + index * 0.2 }}
                      className="hidden md:block absolute top-1/2 -right-4 w-8 h-1 bg-gradient-to-r from-violet-400 to-fuchsia-400 z-10"
                    >
                      <ArrowRight className="w-4 h-4 text-fuchsia-600 absolute -right-1 -top-1.5" />
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3D CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-violet-600 via-fuchsia-600 to-purple-600 relative overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30, rotateX: 45 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <motion.h2
              whileInView={{ scale: [0.9, 1.05, 1] }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Ready to Transform Your Content?
            </motion.h2>
            
            <p className="text-xl text-violet-100 mb-10 max-w-2xl mx-auto">
              Join thousands creating high-quality MCQs with AI
            </p>
            
            <Link to="/generator">
              <motion.div
                whileHover={{ 
                  scale: 1.1,
                  rotateY: 5,
                  rotateX: 5,
                }}
                whileTap={{ scale: 0.95 }}
                style={{ transformStyle: 'preserve-3d' }}
                className="inline-flex items-center gap-3 px-10 py-5 bg-white text-violet-600 rounded-2xl font-bold text-xl shadow-2xl"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-6 h-6" />
                </motion.div>
                Get Started Free
                <ArrowRight className="w-6 h-6" />
              </motion.div>
            </Link>

            <div className="mt-8 flex items-center justify-center gap-8 text-violet-100">
              {['No credit card', 'Free forever', 'Start in 30s'].map((text, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <Check className="w-5 h-5" />
                  <span>{text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
