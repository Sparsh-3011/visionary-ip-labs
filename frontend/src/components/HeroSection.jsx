import React from 'react';
import { Button } from './ui/button';
import { Sparkles, TrendingUp, Award } from 'lucide-react';

const HeroSection = () => {
  const scrollToApplication = () => {
    const element = document.querySelector('#application');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1672581437674-3186b17b405a" 
          alt="Innovation Background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/95 to-slate-950"></div>
      </div>

      {/* Animated Grid Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(251, 191, 36, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(251, 191, 36, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8">
          {/* Urgency Badge */}
          <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-6 py-2 backdrop-blur-sm animate-pulse">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 font-semibold text-sm">Limited Seats Available</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 animate-gradient">
              Patent & Research
            </span>
            <br />
            <span className="text-white">Internship Program</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto font-light">
            Turn Your Ideas into <span className="text-amber-400 font-semibold">Protected Innovations</span>
          </p>

          {/* Value Props */}
          <div className="flex flex-wrap justify-center gap-6 pt-4">
            <div className="flex items-center space-x-2 text-slate-300">
              <TrendingUp className="w-5 h-5 text-amber-400" />
              <span>50+ Patents Granted</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-300">
              <Award className="w-5 h-5 text-amber-400" />
              <span>100+ Students Mentored</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-6">
            <Button 
              onClick={scrollToApplication}
              size="lg"
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-lg px-12 py-6 rounded-xl shadow-2xl shadow-amber-500/50 transform hover:scale-105 transition-all duration-300"
            >
              Apply Now
            </Button>
            <p className="text-sm text-slate-400 mt-4">No application fee • Rolling admissions</p>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
    </section>
  );
};

export default HeroSection;
