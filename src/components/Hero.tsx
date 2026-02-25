import React from "react";

const Hero = () => {
  return (
    <section className="w-full px-4 md:px-8 mt-4 sm:mt-8 md:mt-12 overflow-hidden">
      <div className="relative w-full max-w-7xl mx-auto overflow-hidden rounded-xl sm:rounded-2xl min-w-0">
        <img
          src="/images/banner.png"
          className="w-full h-auto object-cover min-w-0"
          alt="Hero banner showcasing 3D printing services"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
