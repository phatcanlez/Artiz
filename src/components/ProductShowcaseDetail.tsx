import React, { useState } from "react";
import Product3DViewer from "./Product3DViewer";
import { SparkleIcon } from "./ui/SparkleIcon";

const imageList = [
  "/images/airmax.jpg",
  "/images/airpod.jpg",
  "/images/lipstick.jpg",
  "/images/iphone.jpg",
];

const ProductShowcaseDetail: React.FC = () => {
  const [viewMode, setViewMode] = useState<"3d" | "image">("3d");
  const [activeIndex, setActiveIndex] = useState(0);

  const activeImage = imageList[activeIndex] ?? imageList[0];

  return (
    <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 w-full min-w-0 lg:w-[60%] lg:h-[600px]">
      {/* Thumbnails - vertical slide */}
      <div className="flex flex-row lg:flex-col gap-2 sm:gap-3 shrink-0 overflow-x-auto lg:overflow-y-auto max-h-full scrollbar-none py-1 pr-1 lg:pr-0">
        {imageList.map((src, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-sm overflow-hidden border transition-colors flex-shrink-0 ${
              index === activeIndex ? "border-[#44FF00]" : "border-white/20 hover:border-white/60"
            }`}
          >
            <img src={src} className="w-full h-full object-cover" alt={`Thumbnail ${index + 1}`} />
          </button>
        ))}
      </div>

      {/* Main Display */}
      <div className="flex-1 relative border border-white/20 p-1 group h-[420px] sm:h-[520px] lg:h-[600px]">
        <SparkleIcon className="absolute -bottom-3 -left-3 w-8 h-8 z-10 text-white" />
        <SparkleIcon className="absolute -bottom-3 -right-3 w-8 h-8 z-10 text-white" />

        {/* Toggle buttons */}
        <div className="absolute top-4 right-4 z-20 flex gap-2">
          <button
            onClick={() => setViewMode("3d")}
            className={`px-3 py-1 rounded text-xs font-bold transition-colors uppercase ${
              viewMode === "3d"
                ? "bg-white text-black"
                : "bg-black/50 text-white border border-white/20 hover:bg-black/70 backdrop-blur-sm"
            }`}
          >
            3D
          </button>
          <button
            onClick={() => setViewMode("image")}
            className={`px-3 py-1 rounded text-xs font-bold transition-colors uppercase ${
              viewMode === "image"
                ? "bg-white text-black"
                : "bg-black/50 text-white border border-white/20 hover:bg-black/70 backdrop-blur-sm"
            }`}
          >
            IMG
          </button>
        </div>

        {/* Content */}
        <div className="w-full h-full bg-[#1A1A1A] flex items-center justify-center overflow-hidden">
          {viewMode === "3d" ? (
            <Product3DViewer className="w-full h-full" />
          ) : (
            <img
              src={activeImage}
              className="w-full h-full object-contain"
              alt="Product detail"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductShowcaseDetail;
