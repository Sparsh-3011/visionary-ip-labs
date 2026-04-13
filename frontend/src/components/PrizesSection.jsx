import React from 'react';
import { DollarSign, Award, Users, TrendingUp } from 'lucide-react';

const PrizesSection = () => {
  const prizes = [
    {
      icon: <DollarSign className="w-12 h-12" />,
      title: 'Cash Rewards',
      description: 'Top performers receive attractive cash prizes for outstanding work',
      highlight: 'For Excellence',
      color: 'from-amber-400 to-amber-600'
    },
    {
      icon: <Award className="w-12 h-12" />,
      title: 'Official Certificate',
      description: 'Receive a verified internship completion certificate',
      highlight: 'Industry Recognized',
      color: 'from-blue-400 to-blue-600'
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: 'Recognition & Exposure',
      description: 'Get featured in our innovation showcase and professional networks',
      highlight: 'Build Your Brand',
      color: 'from-purple-400 to-purple-600'
    },
    {
      icon: <TrendingUp className="w-12 h-12" />,
      title: 'Patent Co-authorship',
      description: 'Opportunity to be listed as co-inventor on real patent applications',
      highlight: 'Career Boost',
      color: 'from-green-400 to-green-600'
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden bg-slate-900">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
      
      {/* Background Elements */}
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Rewards & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Recognition</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto mb-6"></div>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Outstanding contributions deserve exceptional recognition
          </p>
        </div>

        {/* Prizes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {prizes.map((prize, index) => (
            <div 
              key={index}
              className="group relative"
            >
              {/* Card */}
              <div className="relative bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-amber-500/50 transition-all duration-300 hover:transform hover:-translate-y-2 h-full">
                {/* Highlight Badge */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className={`inline-block bg-gradient-to-r ${prize.color} text-slate-950 text-xs font-bold px-4 py-1 rounded-full shadow-lg`}>
                    {prize.highlight}
                  </span>
                </div>

                {/* Icon */}
                <div className="mt-4 mb-6 flex justify-center">
                  <div className={`p-4 rounded-xl bg-gradient-to-br ${prize.color} bg-opacity-10 text-transparent bg-clip-text bg-gradient-to-br ${prize.color} group-hover:scale-110 transition-transform duration-300`}>
                    {prize.icon}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3 text-center group-hover:text-amber-400 transition-colors duration-300">
                  {prize.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed text-center">
                  {prize.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Opportunity */}
        <div className="bg-gradient-to-r from-amber-500/10 via-blue-500/10 to-purple-500/10 border border-amber-500/30 rounded-2xl p-8 md:p-12">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center space-x-2 bg-amber-500/20 border border-amber-500/40 rounded-full px-6 py-2">
              <Award className="w-5 h-5 text-amber-400" />
              <span className="text-amber-400 font-semibold">Special Opportunity</span>
            </div>
            
            <h3 className="text-3xl md:text-4xl font-bold text-white">
              Exclusive Benefits for Top Performers
            </h3>
            
            <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Exceptional interns get exclusive opportunities including letters of recommendation, 
              fast-track placement assistance, and invitations to industry innovation events and conferences.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <div className="bg-slate-800/50 border border-amber-500/20 rounded-lg px-6 py-3">
                <p className="text-amber-400 font-semibold">Letter of Recommendation</p>
              </div>
              <div className="bg-slate-800/50 border border-amber-500/20 rounded-lg px-6 py-3">
                <p className="text-amber-400 font-semibold">Placement Support</p>
              </div>
              <div className="bg-slate-800/50 border border-amber-500/20 rounded-lg px-6 py-3">
                <p className="text-amber-400 font-semibold">Industry Events</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrizesSection;
