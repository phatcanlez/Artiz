import React, { useState } from "react";

interface AccordionItemProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  isOpen,
  onToggle,
}) => {
  return (
    <div className="relative w-full py-[21px] border-b border-white/20">
      <button
        onClick={onToggle}
        className="relative flex items-center justify-between w-full text-left text-xl text-white font-medium"
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
    </div>
  );
};

const ProductInfo: React.FC = () => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [quantity, setQuantity] = useState(1);

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const sections = [
    "Product Description",
    "Size",
    "Material",
    "Product policy",
    "Product Preservation",
    "Delivery & TAX",
  ];

  return (
    <div className="w-full text-white font-medium">
      {/* Product Header */}
      <div className="flex justify-between items-start gap-2 mb-2">
        <h1 className="text-lg sm:text-2xl md:text-[32px] font-bold leading-tight min-w-0">
          Men Armor Black Silver
        </h1>
        <div className="pt-2">
          {/* Decorative sparkle if needed, or remove if not in exact design */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
          >
            <path
              d="M12 0L14.595 9.405L24 12L14.595 14.595L12 24L9.405 14.595L0 12L9.405 9.405L12 0Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>

      {/* Price */}
      <div className="text-xl font-normal text-white line-through decoration-white decoration-1 mb-2">
        3.850.000 VND
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 mb-8">
        {[1, 2, 3, 4, 5].map((i) => (
          <img
            key={i}
            src="https://api.builder.io/api/v1/image/assets/7c252285b2084f26866cf7cf5b5da26b/a42b9512f67cabe27e9f58d7dec0fb65a8cc2445?placeholderIfAbsent=true"
            className="w-[13px] h-[13px] object-contain"
            alt=""
          />
        ))}
        <span className="text-xs text-white/70 ml-2">( 2 reviews )</span>
      </div>

      {/* Actions */}
      <div className="flex gap-4 mb-4 h-[45px]">
        {/* Quantity */}
        <div className="flex items-center justify-between border border-white rounded px-4 w-[120px]">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="text-xl hover:text-gray-300"
          >
            -
          </button>
          <span className="text-sm">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="text-xl hover:text-gray-300"
          >
            +
          </button>
        </div>
        {/* Add to Cart */}
        <button className="flex-1 bg-[#D9D9D9] text-black font-bold rounded text-sm hover:bg-white transition-colors">
          Add to Cart
        </button>
      </div>

      {/* Buy Now */}
      <button className="w-full bg-[#D9D9D9] text-black font-bold rounded h-[45px] text-sm hover:bg-white transition-colors mb-8">
        Buy it now
      </button>

      {/* Accordion List */}
      <div className="flex flex-col items-stretch border-t border-white/20">
        {sections.map((section) => (
          <AccordionItem
            key={section}
            title={section}
            isOpen={openSections[section] || false}
            onToggle={() => toggleSection(section)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductInfo;
