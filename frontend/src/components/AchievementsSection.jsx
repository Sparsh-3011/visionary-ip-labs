import React, { useState, useEffect } from 'react';
import { Award, FileText, Trophy, CheckCircle } from 'lucide-react';

const AchievementsSection = () => {
  const [counts, setCounts] = useState({
    patents: 0,
    students: 0,
    projects: 0
  });

  const achievements = [
    { 
      id: 'patents',
      icon: <Award className="w-12 h-12" />, 
      target: 50, 
      suffix: '+', 
      label: 'Granted Patents',
      color: 'from-amber-400 to-amber-600'
    },
    { 
      id: 'students',
      icon: <CheckCircle className="w-12 h-12" />, 
      target: 100, 
      suffix: '+', 
      label: 'Students Mentored',
      color: 'from-blue-400 to-blue-600'
    },
    { 
      id: 'projects',
      icon: <Trophy className="w-12 h-12" />, 
      target: 25, 
      suffix: '+', 
      label: 'Innovation Projects',
      color: 'from-amber-500 to-orange-600'
    }
  ];

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    achievements.forEach(achievement => {
      let current = 0;
      const increment = achievement.target / steps;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= achievement.target) {
          current = achievement.target;
          clearInterval(timer);
        }
        setCounts(prev => ({
          ...prev,
          [achievement.id]: Math.floor(current)
        }));
      }, interval);
    });
  }, []);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-slate-900"></div>
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/2 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Impact</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto mb-6"></div>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Transforming ideas into protected innovations
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => (
            <div 
              key={index}
              className="group relative bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:border-amber-500/50 transition-all duration-500 hover:transform hover:scale-105"
            >
              {/* Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${achievement.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}></div>
              
              <div className="relative z-10 text-center space-y-4">
                <div className={`inline-flex text-transparent bg-clip-text bg-gradient-to-r ${achievement.color} group-hover:scale-110 transition-transform duration-300`}>
                  {achievement.icon}
                </div>
                
                <div>
                  <div className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300 mb-2">
                    {counts[achievement.id]}{achievement.suffix}
                  </div>
                  <p className="text-lg text-slate-300 font-medium">{achievement.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Impact Statement */}
        <div className="mt-16 bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-amber-500/20 rounded-2xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Join a Community of <span className="text-amber-400">Innovators</span>
              </h3>
              <p className="text-slate-300 text-lg">
                Be part of a legacy of successful patent filings, groundbreaking research, and innovative startups.
              </p>
            </div>
            <div className="flex-shrink-0">
              <FileText className="w-24 h-24 text-amber-400 opacity-50" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
