import React from 'react';

interface ProductShowcaseProps {
  images: string[];
  className?: string;
}

const ProductShowcase: React.FC<ProductShowcaseProps> = ({ images, className = "" }) => {
  return (
    <div className={`flex items-center justify-center gap-4 md:gap-6 flex-wrap ${className}`}>
      {images.map((src, index) => (
        <div 
          key={index}
          className="group cursor-pointer transition-transform hover:scale-105"
        >
          <img
            src={src}
            className="w-80 md:w-96 h-auto object-contain rounded-lg"
            alt={`Product showcase ${index + 1}`}
          />
        </div>
      ))}
    </div>
  );
};

export default ProductShowcase;