import React from 'react';
import { Lightbulb, Rocket, Shield, Users } from 'lucide-react';

const AboutSection = () => {
  const features = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: 'Innovation First',
      description: 'Transform groundbreaking ideas into protected intellectual property'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Patent Protection',
      description: 'Learn the complete patent filing process from industry experts'
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: 'Startup Ecosystem',
      description: 'Bridge the gap between research and commercialization'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Expert Mentorship',
      description: 'Guided by experienced professors and industry professionals'
    }
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"></div>
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Visionary IP Labs</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto mb-6"></div>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            An Initiative by <span className="text-amber-400 font-semibold">H & P Projects</span> and <span className="text-amber-400 font-semibold">NextGen Care Foundation</span>
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left: Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-blue-500/20 rounded-2xl blur-2xl"></div>
            <img 
              src="https://images.unsplash.com/photo-1573757056004-065ad36e2cf4"
              alt="Innovation Team"
              className="relative rounded-2xl shadow-2xl border border-amber-500/20 w-full h-[400px] object-cover"
            />
          </div>

          {/* Right: Content */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-white">Empowering the Next Generation of Innovators</h3>
            <p className="text-lg text-slate-300 leading-relaxed">
              Visionary IP Labs is dedicated to nurturing innovation and protecting intellectual property. 
              We provide comprehensive training in patent research, innovation development, and startup mentorship.
            </p>
            <p className="text-lg text-slate-300 leading-relaxed">
              Our program focuses on bridging the gap between academic research and commercial applications, 
              helping students transform their innovative ideas into protected, market-ready solutions.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="bg-slate-800/50 border border-amber-500/20 rounded-lg px-4 py-2">
                <p className="text-amber-400 font-semibold">Patents</p>
              </div>
              <div className="bg-slate-800/50 border border-amber-500/20 rounded-lg px-4 py-2">
                <p className="text-amber-400 font-semibold">Research</p>
              </div>
              <div className="bg-slate-800/50 border border-amber-500/20 rounded-lg px-4 py-2">
                <p className="text-amber-400 font-semibold">Startups</p>
              </div>
              <div className="bg-slate-800/50 border border-amber-500/20 rounded-lg px-4 py-2">
                <p className="text-amber-400 font-semibold">Innovation</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-amber-500/50 transition-all duration-300 hover:transform hover:-translate-y-1"
            >
              <div className="text-amber-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">{feature.title}</h4>
              <p className="text-slate-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
