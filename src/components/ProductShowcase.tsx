import React from 'react';

interface ProductShowcaseProps {
  images: string[];
  className?: string;
}

const ProductShowcase: React.FC<ProductShowcaseProps> = ({ images, className = "" }) => {
  return (
    <div
      className={`flex items-stretch justify-center gap-3 sm:gap-4 md:gap-6 px-2 ${className}`}
    >
      {images.map((src, index) => (
        <div
          key={index}
          className="group cursor-pointer transition-transform hover:scale-105 flex-1 min-w-0 max-w-[400px] flex justify-center"
        >
          <img
            src={src}
            className="w-full h-auto object-contain rounded-lg"
            alt={`Product showcase ${index + 1}`}
          />
        </div>
      ))}
    </div>
  );
};

export default ProductShowcase;