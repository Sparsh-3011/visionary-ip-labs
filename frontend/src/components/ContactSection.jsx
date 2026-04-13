import React from 'react';
import { Mail, Globe, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 relative overflow-hidden bg-slate-900">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto mb-6"></div>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you
          </p>
        </div>

        {/* Contact Info */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Email */}
          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8 hover:border-amber-500/50 transition-all duration-300">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center">
                <Mail className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Email Us</h3>
                <a 
                  href="mailto:contact@visionaryiplabs.com" 
                  className="text-amber-400 hover:text-amber-300 transition-colors duration-200"
                >
                  contact@visionaryiplabs.com
                </a>
              </div>
            </div>
          </div>

          {/* Website */}
          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8 hover:border-amber-500/50 transition-all duration-300">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center">
                <Globe className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Visit Website</h3>
                <a 
                  href="https://www.visionaryiplabs.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:text-amber-300 transition-colors duration-200"
                >
                  www.visionaryiplabs.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-white mb-6">Follow Us</h3>
          <div className="flex justify-center space-x-6">
            <a 
              href="#" 
              className="w-12 h-12 bg-slate-800/50 border border-slate-700/50 rounded-lg flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-500/50 transition-all duration-300 hover:transform hover:-translate-y-1"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="w-12 h-12 bg-slate-800/50 border border-slate-700/50 rounded-lg flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-500/50 transition-all duration-300 hover:transform hover:-translate-y-1"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="w-12 h-12 bg-slate-800/50 border border-slate-700/50 rounded-lg flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-500/50 transition-all duration-300 hover:transform hover:-translate-y-1"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="w-12 h-12 bg-slate-800/50 border border-slate-700/50 rounded-lg flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-500/50 transition-all duration-300 hover:transform hover:-translate-y-1"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
