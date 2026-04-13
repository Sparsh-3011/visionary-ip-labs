import React from 'react';

const SponsorsSection = () => {
  const sponsors = [
    { name: 'Google Gemini', placeholder: true },
    { name: 'Springer', placeholder: true },
    { name: 'ScienceDirect', placeholder: true },
    { name: 'Apple Index', placeholder: true },
    { name: 'MLH', placeholder: true },
    { name: 'H & P Projects', placeholder: true },
    { name: 'NextGen Care Foundation', placeholder: true },
    { name: 'ResearchGate', placeholder: true }
  ];

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Sponsored & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Supported By</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto mb-6"></div>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Backed by leading organizations in technology, research, and innovation
          </p>
        </div>

        {/* Sponsors Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {sponsors.map((sponsor, index) => (
            <div 
              key={index}
              className="group bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8 hover:border-amber-500/50 transition-all duration-300 hover:transform hover:-translate-y-1 flex items-center justify-center"
            >
              <div className="text-center">
                {/* Placeholder for logo */}
                <div className="w-24 h-24 bg-slate-700/50 rounded-lg mx-auto mb-3 flex items-center justify-center border border-amber-500/10 group-hover:border-amber-500/30 transition-colors duration-300">
                  <div className="text-amber-400/30 text-xs font-mono">[LOGO]</div>
                </div>
                <p className="text-slate-400 text-sm font-medium group-hover:text-amber-400 transition-colors duration-300">
                  {sponsor.name}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Highlighted Partners */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-amber-500/20 rounded-xl p-8">
            <h3 className="text-xl font-bold text-white mb-3">H & P Projects</h3>
            <p className="text-slate-400 leading-relaxed">
              Leading innovation consultancy specializing in patent research, IP protection, and technology commercialization.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-amber-500/20 rounded-xl p-8">
            <h3 className="text-xl font-bold text-white mb-3">NextGen Care Foundation</h3>
            <p className="text-slate-400 leading-relaxed">
              Non-profit organization dedicated to nurturing young innovators and supporting breakthrough research initiatives.
            </p>
          </div>
        </div>

        {/* Note */}
        <div className="mt-12 text-center">
          <p className="text-slate-500 text-sm italic">
            Partner logos will be updated with actual brand assets
          </p>
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;
