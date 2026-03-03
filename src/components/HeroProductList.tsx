import React from "react";
import StarDivider from "./ui/StarDivider";

const HeroProductList: React.FC = () => {
  return (
    <section className="relative w-full bg-black flex flex-col items-center justify-center pt-10 sm:pt-14 pb-0 px-4">
      {/* ACCESSORIES title */}
      <h1
        className="text-white text-center uppercase leading-none w-full"
        style={{
          fontFamily: "'SVN-Redzone', 'Arial Black', 'Impact', sans-serif",
          fontSize: "clamp(60px, 14vw, 160px)",
          letterSpacing: "-0.02em",
        }}
      >
        ACCESSORIES
      </h1>

      {/* StarDivider */}
      <StarDivider />
    </section>
  );
};

export default HeroProductList;
