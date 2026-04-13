import React from 'react';
import { GraduationCap, BookOpen, Award, Users } from 'lucide-react';

const CredibilitySection = () => {
  const credentials = [
    {
      icon: <GraduationCap className="w-6 h-6" />,
      text: 'Associate Professor at KIIT University, Bhubaneswar'
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      text: 'Associate Editor at Journal of Field Robotics (Wiley)'
    },
    {
      icon: <Award className="w-6 h-6" />,
      text: 'SCI Journal Q1 Ranking, Impact Factor 5.2'
    },
    {
      icon: <Users className="w-6 h-6" />,
      text: '100+ Students Successfully Mentored'
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Guided by <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Experts</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto mb-6"></div>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Learn from accomplished academics and industry leaders
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Mentor Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/30 to-blue-500/30 rounded-2xl blur-3xl"></div>
            <div className="relative bg-slate-800/50 backdrop-blur-sm border-2 border-amber-500/30 rounded-2xl p-8 shadow-2xl">
              <div className="aspect-square bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl flex items-center justify-center mb-6 border border-amber-500/20">
                <div className="text-center">
                  <div className="w-32 h-32 bg-amber-500/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <GraduationCap className="w-16 h-16 text-amber-400" />
                  </div>
                  <p className="text-slate-400 text-sm">[Mentor Image Placeholder]</p>
                  <p className="text-slate-500 text-xs mt-2">Upload your mentor's photo</p>
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2">Program Mentor</h3>
                <p className="text-amber-400 font-semibold">Expert Guidance & Mentorship</p>
              </div>
            </div>
          </div>

          {/* Right: Credentials */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-white mb-8">Academic Excellence & Industry Recognition</h3>
            
            <div className="space-y-4">
              {credentials.map((credential, index) => (
                <div 
                  key={index}
                  className="flex items-start space-x-4 bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-5 hover:border-amber-500/50 transition-all duration-300 group"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center text-amber-400 group-hover:bg-amber-500/20 transition-colors duration-300">
                    {credential.icon}
                  </div>
                  <p className="text-slate-300 text-lg leading-relaxed flex-1">{credential.text}</p>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-amber-500/10 to-blue-500/10 border border-amber-500/30 rounded-xl p-6 mt-8">
              <p className="text-slate-300 leading-relaxed italic">
                "Our mentors bring years of experience in patent research, academic excellence, and industry collaboration 
                to guide you through every step of your innovation journey."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CredibilitySection;
