import React from 'react';

const Hero = () => {
  return (
    <section className="w-full px-4 md:px-8 mt-8 md:mt-12">
      <div className="relative w-full max-w-7xl mx-auto overflow-hidden rounded-2xl">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/756bc4a3d4832c0f27e76b75a3cd4709cde0a2ee?placeholderIfAbsent=true"
          className="w-full h-auto object-cover"
          alt="Hero banner showcasing 3D printing services"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;