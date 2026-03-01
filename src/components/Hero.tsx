import React from "react";

const Hero = () => {
  return (
    <section className="w-full overflow-hidden">
      <div className="relative w-full overflow-hidden">
        <img
          src="/images/banner.png"
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
