import React from 'react';
import { FileSearch, PenTool, Rocket, FileCheck, Award, Briefcase } from 'lucide-react';

const BenefitsSection = () => {
  const benefits = [
    {
      icon: <FileSearch className="w-10 h-10" />,
      title: 'Patent Filing Guidance',
      description: 'Learn the complete process of filing patents from ideation to grant',
      color: 'from-amber-400 to-amber-600'
    },
    {
      icon: <PenTool className="w-10 h-10" />,
      title: 'Research Paper Writing',
      description: 'Get expert support in writing and publishing research papers',
      color: 'from-blue-400 to-blue-600'
    },
    {
      icon: <Rocket className="w-10 h-10" />,
      title: 'Startup Mentorship',
      description: 'Transform your innovations into viable business opportunities',
      color: 'from-purple-400 to-purple-600'
    },
    {
      icon: <FileCheck className="w-10 h-10" />,
      title: 'Hands-on Projects',
      description: 'Work on real-world innovation and patent development projects',
      color: 'from-green-400 to-green-600'
    },
    {
      icon: <Award className="w-10 h-10" />,
      title: 'Internship Certificate',
      description: 'Receive an official certificate upon successful completion',
      color: 'from-amber-500 to-orange-600'
    },
    {
      icon: <Briefcase className="w-10 h-10" />,
      title: 'Industry Exposure',
      description: 'Network with industry experts and innovation leaders',
      color: 'from-cyan-400 to-cyan-600'
    }
  ];

  return (
    <section id="benefits" className="py-20 relative overflow-hidden bg-slate-900">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Internship <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Benefits</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto mb-6"></div>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Comprehensive training and mentorship to accelerate your innovation journey
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="group relative bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8 hover:border-amber-500/50 transition-all duration-300 hover:transform hover:-translate-y-2"
            >
              {/* Icon with Gradient Background */}
              <div className="mb-6">
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${benefit.color} bg-opacity-10 text-transparent bg-clip-text bg-gradient-to-br ${benefit.color} group-hover:scale-110 transition-transform duration-300`}>
                  {benefit.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors duration-300">
                {benefit.title}
              </h3>
              <p className="text-slate-400 leading-relaxed">
                {benefit.description}
              </p>

              {/* Hover Effect Line */}
              <div className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${benefit.color} group-hover:w-full transition-all duration-500 rounded-b-xl`}></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-gradient-to-r from-amber-500/10 to-blue-500/10 border border-amber-500/30 rounded-xl p-8">
            <p className="text-xl text-slate-300 mb-4">
              <span className="text-amber-400 font-semibold">All benefits included</span> in the internship program
            </p>
            <p className="text-slate-400">Plus cash rewards and recognition for top performers</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
