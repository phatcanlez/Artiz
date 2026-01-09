import React from 'react';

const HeroProductList: React.FC = () => {
  return (
    <section className="relative w-full min-h-[600px] flex flex-col items-center justify-center py-20">
      {/* Background Image */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=1200&q=80"
          alt="Artiz Background"
          className="w-full max-w-[1000px] h-auto object-contain opacity-80"
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center">
        <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-light tracking-wider mb-8">
          ACCESSORIES
        </h1>

        {/* Decorative Stars */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <StarDecoration />
          <div className="w-[200px] h-[1px] bg-white/50"></div>
          <StarDecoration />
        </div>
      </div>
    </section>
  );
};

const StarDecoration = () => (
  <svg width="40" height="40" viewBox="0 0 57 45" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M57.0199 22.5072C43.8293 24.6928 42.5593 26.4731 41.0007 45C39.442 26.4731 38.172 24.7073 24.9814 22.5072C38.172 20.3072 39.442 18.5269 41.0007 0C42.5593 18.5269 43.8293 20.2927 57.0199 22.4928V22.5072Z" fill="white"/>
    <path d="M16.6254 22.5072C9.78471 23.6507 9.12085 24.5625 8.31268 34.1878C7.5045 24.577 6.84064 23.6507 0 22.5072C6.84064 21.3637 7.5045 20.4519 8.31268 10.8266C9.12085 20.4374 9.78471 21.3637 16.6254 22.5072Z" fill="white"/>
  </svg>
);

export default HeroProductList;

