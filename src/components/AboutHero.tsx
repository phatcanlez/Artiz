import React from "react";

const AboutHero: React.FC = () => {
  return (
    <section className="relative w-full min-h-[500px] flex flex-col items-center justify-center py-20">
      {/* Background Image */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=1200&q=80"
          alt="About Us Background"
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <div className="flex items-center justify-center gap-4 md:gap-8 mb-8">
          <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-light tracking-wider">
            ABOUT US
          </h1>
        </div>

        {/* Decorative Stars */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="w-[200px] h-[1px] bg-white/50"></div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
