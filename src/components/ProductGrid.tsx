import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { SparkleIcon } from "./ui/SparkleIcon";
import { RightSparkleIcon } from "./ui/RightSparkleIcon";

const ProductGrid: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("new");

  // Single static product as requested
  const product = {
    id: 1,
    image: "/images/airpod.jpg",
    title: "Men Armor Black Silver",
    price: "3.850.000 VND",
    rating: 5,
    reviews: 2,
  };

  const filterButtons = [
    { id: "new", label: "NEW COLLECTION" },
    { id: "bestseller", label: "BEST SELLER" },
    { id: "custom", label: "CUSTOM FOR YOU" },
  ];

  return (
    <section className="w-full py-10 sm:py-16 px-4 sm:px-6 lg:px-24 overflow-hidden">
      {/* Section Header */}
      <div
        className="relative rounded-xl overflow-hidden mb-8 sm:mb-12 py-10 sm:py-16 px-4 sm:px-6 md:px-8"
        style={{
          background:
            "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        }}
      >
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
          <SparkleIcon className="w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 shrink-0" />
          <h2 className="text-white text-center text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
            Suggestions For You
          </h2>
          <RightSparkleIcon className="h-8 w-auto sm:h-10 md:h-14 shrink-0" />
        </div>
        <p className="text-white/80 text-center text-sm max-w-xl mx-auto">
          We have a lot of options for you here. If you are having trouble, we
          have some suggestions for you.
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
        {filterButtons.map((btn) => (
          <button
            key={btn.id}
            onClick={() => setActiveFilter(btn.id)}
            className={`px-4 sm:px-6 md:px-8 py-3 sm:py-4 font-bold text-xs sm:text-sm transition-all rounded-lg touch-manipulation ${
              activeFilter === btn.id
                ? "bg-[#D9D7D7] text-black"
                : "bg-[#D9D7D7]/70 text-black/70 hover:bg-[#D9D7D7]"
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Filter & Sort */}
      <div className="flex items-center gap-4 mb-8">
        <button className="flex items-center gap-3 px-6 py-3 bg-[#D9D7D7] rounded-lg hover:bg-white transition-colors">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22 18.6051C22 18.804 21.921 18.9947 21.7803 19.1354C21.6397 19.276 21.4489 19.3551 21.25 19.3551H16.15C15.983 19.9779 15.6151 20.5283 15.1034 20.9208C14.5918 21.3133 13.9649 21.5261 13.32 21.5261C12.6751 21.5261 12.0482 21.3133 11.5366 20.9208C11.0249 20.5283 10.657 19.9779 10.49 19.3551H2.75C2.55109 19.3551 2.36032 19.276 2.21967 19.1354C2.07902 18.9947 2 18.804 2 18.6051C2 18.4061 2.07902 18.2154 2.21967 18.0747C2.36032 17.9341 2.55109 17.8551 2.75 17.8551H10.49C10.657 17.2322 11.0249 16.6818 11.5366 16.2893C12.0482 15.8968 12.6751 15.684 13.32 15.684C13.9649 15.684 14.5918 15.8968 15.1034 16.2893C15.6151 16.6818 15.983 17.2322 16.15 17.8551H21.25C21.4489 17.8551 21.6397 17.9341 21.7803 18.0747C21.921 18.2154 22 18.4061 22 18.6051Z"
              fill="black"
            />
          </svg>
          <span className="text-black font-medium">FILTER</span>
        </button>
      </div>

      {/* Product Grid - single static product */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <ProductCard
          key={product.id}
          id={product.id}
          image={product.image}
          title={product.title}
          price={product.price}
          rating={product.rating}
          reviews={product.reviews}
        />
      </div>
    </section>
  );
};

export default ProductGrid;
