import { Sparkles, Github, Twitter, Linkedin, Mail, Heart, Code, Zap } from 'lucide-react';
import { Link } from 'react-router';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <span className="font-bold text-2xl bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                MCQ Master
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed max-w-md">
              AI-powered MCQ generation platform for educators, students, and professionals. 
              Transform any text into high-quality multiple-choice questions instantly.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <div className="flex items-center gap-1 px-3 py-1.5 bg-violet-600/20 border border-violet-500/30 rounded-full">
                <Zap className="w-3.5 h-3.5 text-violet-400" />
                <span className="text-xs text-violet-300 font-semibold">Free Forever</span>
              </div>
              <div className="flex items-center gap-1 px-3 py-1.5 bg-green-600/20 border border-green-500/30 rounded-full">
                <Code className="w-3.5 h-3.5 text-green-400" />
                <span className="text-xs text-green-300 font-semibold">Open Source</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2.5">
              <li>
                <Link 
                  to="/" 
                  className="text-gray-400 hover:text-violet-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-violet-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/generator" 
                  className="text-gray-400 hover:text-violet-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-violet-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Generator
                </Link>
              </li>
              <li>
                <Link 
                  to="/library" 
                  className="text-gray-400 hover:text-violet-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-violet-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Library
                </Link>
              </li>
              <li>
                <Link 
                  to="/templates" 
                  className="text-gray-400 hover:text-violet-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-violet-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Templates
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Connect</h3>
            <div className="flex flex-col gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-400 hover:text-violet-400 transition-colors group"
              >
                <div className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-violet-600/20 transition-colors">
                  <Github className="w-4.5 h-4.5" />
                </div>
                <span>GitHub</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-400 hover:text-violet-400 transition-colors group"
              >
                <div className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-violet-600/20 transition-colors">
                  <Twitter className="w-4.5 h-4.5" />
                </div>
                <span>Twitter</span>
              </a>
              <a
                href="mailto:support@mcqmaster.com"
                className="flex items-center gap-3 text-gray-400 hover:text-violet-400 transition-colors group"
              >
                <div className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-violet-600/20 transition-colors">
                  <Mail className="w-4.5 h-4.5" />
                </div>
                <span>Email Us</span>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-gray-400 text-sm">
            © {currentYear} MCQ Master. All rights reserved.
          </div>
          
          {/* Made with Love */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-400">Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
            <span className="text-gray-400">by</span>
            <span className="font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              MCQ Master Team
            </span>
          </div>

          {/* Tech Stack */}
          <div className="text-gray-500 text-xs">
            Built with React, Tailwind CSS & Motion
          </div>
        </div>

        {/* Credits Line */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-600">
            Designed & Developed with passion • Empowering education through technology
          </p>
        </div>
      </div>
    </footer>
  );
}