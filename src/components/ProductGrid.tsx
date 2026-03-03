import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { SparkleIcon } from "./ui/SparkleIcon";
import { RightSparkleIcon } from "./ui/RightSparkleIcon";

const ProductGrid: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("new");
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  // Products using local images: airmax, airpod, iphone, lipstick
  const products = [
    {
      id: 1,
      image: "/images/airmax.jpg",
      title: "Men Armor Black Silver",
      price: "3.850.000 VND",
      rating: 5,
      reviews: 2,
    },
    {
      id: 2,
      image: "/images/airpod.jpg",
      title: "AirPods Pro",
      price: "5.990.000 VND",
      rating: 5,
      reviews: 12,
    },
    {
      id: 3,
      image: "/images/iphone.jpg",
      title: "iPhone Case Spider",
      price: "450.000 VND",
      rating: 4,
      reviews: 8,
    },
    {
      id: 4,
      image: "/images/lipstick.jpg",
      title: "3D Printed Lipstick",
      price: "280.000 VND",
      rating: 5,
      reviews: 5,
    },
  ];

  const filterButtons = [
    { id: "new", label: "NEW COLLECTION" },
    { id: "bestseller", label: "BEST SELLER" },
    { id: "custom", label: "CUSTOM FOR YOU" },
  ];

  return (
    <section className="w-full pb-10 sm:pb-16 pt-0 px-4 sm:px-6 lg:px-24 overflow-hidden">
      {/* Section Header - Banner as background, overlay for text readability */}
      <div
        className="relative rounded-xl overflow-hidden mb-8 sm:mb-12 py-10 sm:py-16 px-4 sm:px-6 md:px-8 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/images/banner.png)" }}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
          aria-hidden
        />
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
          {/* <SparkleIcon className="w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 shrink-0" /> */}
          <h2 className="text-white text-center text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
            Suggestions For You
          </h2>
          {/* <RightSparkleIcon className="h-8 w-auto sm:h-10 md:h-14 shrink-0" /> */}
        </div>
        <p className="relative z-10 text-white/80 text-center text-sm max-w-xl mx-auto mb-6">
          We have a lot of options for you here. If you are having trouble, we
          have some suggestions for you.
        </p>

        {/* Filter Buttons — bên trong banner */}
        <div className="relative z-10 flex flex-wrap justify-center gap-2 sm:gap-4">
          {filterButtons.map((btn) => (
            <button
              key={btn.id}
              onClick={() => setActiveFilter(btn.id)}
              className={`px-6 sm:px-8 py-3 font-bold text-xs sm:text-sm tracking-widest border transition-all duration-200 touch-manipulation ${
                activeFilter === btn.id
                  ? "bg-[#44FF00] text-black border-[#44FF00]"
                  : "bg-[#D9D7D7] text-black border-white hover:bg-[#44FF00] hover:border-[#44FF00]"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filter & Sort */}
      <div className="relative flex items-center gap-4 mb-8">
        {/* FILTER button — pill shape như ảnh */}
        <button
          onClick={() => setShowFilterPanel(!showFilterPanel)}
          className="flex items-center gap-2 px-5 py-2 bg-[#D9D7D7] text-black font-bold text-sm tracking-widest rounded-md hover:bg-[#44FF00] transition-all duration-200"
        >
          FILTER
          <img
            src="/element/mage_filter-fill.png"
            alt="filter"
            className="w-5 h-5 object-contain"
          />
        </button>

        {/* Filter Panel dropdown */}
        {showFilterPanel && (
          <div className="absolute top-12 left-0 z-50 bg-[#1a1a2e] border border-white/20 rounded-xl p-6 shadow-2xl min-w-[260px]">
            <h4 className="text-white font-bold text-sm tracking-widest mb-4">
              BỘ LỌC
            </h4>

            {/* Category */}
            <div className="mb-4">
              <p className="text-white/60 text-xs mb-2 uppercase tracking-wider">
                Danh mục
              </p>
              {["Kính mắt", "Tai nghe", "Ốp lưng", "Phụ kiện"].map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-3 mb-2 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-[#44FF00] cursor-pointer"
                  />
                  <span className="text-white text-sm transition-colors">
                    {item}
                  </span>
                </label>
              ))}
            </div>

            {/* Price Range */}
            <div className="mb-4">
              <p className="text-white/60 text-xs mb-2 uppercase tracking-wider">
                Giá
              </p>
              {["Dưới 500K", "500K - 2TR", "2TR - 5TR", "Trên 5TR"].map(
                (item) => (
                  <label
                    key={item}
                    className="flex items-center gap-3 mb-2 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      className="w-4 h-4 accent-[#44FF00] cursor-pointer"
                    />
                    <span className="text-white text-sm transition-colors">
                      {item}
                    </span>
                  </label>
                ),
              )}
            </div>

            {/* Apply button */}
            <button
              onClick={() => setShowFilterPanel(false)}
              className="w-full py-2 bg-[#44FF00] text-black font-bold text-sm tracking-widest rounded-md hover:bg-[#33cc00] transition-colors mt-2"
            >
              ÁP DỤNG
            </button>
          </div>
        )}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            image={product.image}
            title={product.title}
            price={product.price}
            rating={product.rating}
            reviews={product.reviews}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
