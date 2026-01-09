import React, { useState } from 'react';

interface AccordionItemProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, isOpen, onToggle }) => {
  return (
    <div className="relative w-full py-[21px] border-b border-white/20">
      <button
        onClick={onToggle}
        className="relative flex items-center justify-between w-full text-left text-xl text-white font-medium"
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <svg 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  );
};

const ProductInfo: React.FC = () => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const sections = [
    'Product Description',
    'Size',
    'Material',
    'Product policy',
    'Product Preservation',
    'Delivery & TAX'
  ];

  return (
    <div className="flex w-full flex-col items-stretch text-xl text-white font-medium">
      {sections.map((section) => (
        <AccordionItem
          key={section}
          title={section}
          isOpen={openSections[section] || false}
          onToggle={() => toggleSection(section)}
        />
      ))}
    </div>
  );
};

export default ProductInfo;

