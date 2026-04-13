import React from 'react';
import { Search, FileEdit, Shield, Lightbulb, TrendingUp, CheckCircle } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      icon: <Search className="w-8 h-8" />,
      title: 'Patent Search & Novelty Analysis',
      description: 'Comprehensive prior art search and novelty assessment for your innovations',
      features: ['Global database search', 'Novelty reports', 'Freedom to operate analysis']
    },
    {
      icon: <FileEdit className="w-8 h-8" />,
      title: 'Patent Drafting & Filing',
      description: 'Professional patent application drafting and filing support',
      features: ['Claims drafting', 'Technical drawings', 'Multi-jurisdiction filing']
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'IP Registration Services',
      description: 'Complete support for various intellectual property registrations',
      features: ['Copyright registration', 'Trademark filing', 'Design registration']
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: 'IP Consultation & Strategy',
      description: 'Strategic guidance on IP portfolio management and protection',
      features: ['IP strategy planning', 'Portfolio management', 'Licensing guidance']
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Innovation Development',
      description: 'Transform ideas into market-ready innovations',
      features: ['Concept validation', 'Prototype development', 'Market analysis']
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: 'Grant Support',
      description: 'End-to-end support from innovation to patent grant',
      features: ['Application tracking', 'Response to objections', 'Grant facilitation']
    }
  ];

  return (
    <section id="services" className="py-20 relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Services</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto mb-6"></div>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Comprehensive IP solutions for innovators and entrepreneurs
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8 hover:border-amber-500/50 transition-all duration-300 hover:transform hover:-translate-y-2"
            >
              {/* Icon */}
              <div className="mb-6">
                <div className="inline-flex p-4 bg-amber-500/10 rounded-xl text-amber-400 group-hover:bg-amber-500/20 group-hover:scale-110 transition-all duration-300">
                  {service.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors duration-300">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-slate-400 mb-4 leading-relaxed">
                {service.description}
              </p>

              {/* Features List */}
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-slate-500">
                    <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mr-2"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-amber-500/20 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Need Custom IP Solutions?
          </h3>
          <p className="text-slate-300 text-lg mb-6 max-w-2xl mx-auto">
            Our team is ready to provide tailored intellectual property services for your unique requirements
          </p>
          <a 
            href="#contact" 
            className="inline-block bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
