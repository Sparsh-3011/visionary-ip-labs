import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-950 border-t border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/images/logo.jpg" 
                alt="Visionary IP Labs" 
                className="h-10 w-auto object-contain"
              />
              <div>
                <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                  Visionary IP Labs
                </h3>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Empowering Innovators & Entrepreneurs through patent research, IP protection, and startup mentorship.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-slate-400 hover:text-amber-400 transition-colors duration-200 text-sm">
                  About Us
                </a>
              </li>
              <li>
                <a href="#benefits" className="text-slate-400 hover:text-amber-400 transition-colors duration-200 text-sm">
                  Benefits
                </a>
              </li>
              <li>
                <a href="#services" className="text-slate-400 hover:text-amber-400 transition-colors duration-200 text-sm">
                  Services
                </a>
              </li>
              <li>
                <a href="#application" className="text-slate-400 hover:text-amber-400 transition-colors duration-200 text-sm">
                  Apply Now
                </a>
              </li>
            </ul>
          </div>

          {/* Partners */}
          <div>
            <h4 className="text-white font-semibold mb-4">Initiatives By</h4>
            <div className="space-y-2 text-sm">
              <p className="text-slate-400">
                <span className="text-amber-400 font-semibold">H & P Projects</span>
              </p>
              <p className="text-slate-400">
                <span className="text-amber-400 font-semibold">NextGen Care Foundation</span>
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent mb-8"></div>

        {/* Tagline */}
        <div className="text-center mb-6">
          <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
            Empowering Innovators & Entrepreneurs
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-slate-500 text-sm">
            © {currentYear} Visionary IP Labs. All rights reserved.
          </p>
          <div className="flex items-center space-x-1 text-slate-500 text-sm">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>for innovators</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
