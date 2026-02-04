import React, { useState } from "react";
import Product3DViewer from "./Product3DViewer";
import { SparkleIcon } from "./ui/SparkleIcon";
import { RightSparkleIcon } from "./ui/RightSparkleIcon";

const ProductShowcaseDetail: React.FC = () => {
  const [viewMode, setViewMode] = useState<"3d" | "image">("3d");

  return (
    <div className="flex gap-6 w-full lg:w-[60%] lg:h-[600px]">
      {/* Thumbnails */}
      <div className="flex flex-col gap-4 shrink-0 overflow-y-auto max-h-full scrollbar-none py-1">
        {[1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className="w-16 h-16 bg-white/5 rounded-sm cursor-pointer hover:border border-white/50 transition-colors shrink-0"
          />
        ))}
        <div className="text-white flex justify-center cursor-pointer mt-2">
          <svg
            className="w-6 h-6"
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
        </div>
      </div>

      {/* Main Display */}
      <div className="flex-1 relative border border-white/20 p-1 group h-full">
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
              src="https://api.builder.io/api/v1/image/assets/7c252285b2084f26866cf7cf5b5da26b/a62acc892543afbb94e7244883611999c1b7a935?placeholderIfAbsent=true"
              className="w-full h-full object-contain"
              alt="Men Armor Black Silver"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductShowcaseDetail;
