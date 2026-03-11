import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import { apiClient, type Product } from "@/lib/api";
import { Spinner } from "@/components/ui/Spinner";

const ProductGrid: React.FC = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") ?? undefined;

  const [activeFilter, setActiveFilter] = useState<
    "new" | "bestseller" | "custom" | null
  >(null);
  const [sortPrice, setSortPrice] = useState<"default" | "asc" | "desc">("default");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCustomMessage, setShowCustomMessage] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);
    apiClient
      .getProducts(searchTerm)
      .then((data) => {
        if (!mounted) return;
        setProducts(data);
      })
      .catch((e) => {
        if (!mounted) return;
        setError(e instanceof Error ? e.message : "Không thể tải sản phẩm");
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [searchTerm]);

  const cards = useMemo(
    () =>
      products.map((p) => ({
        id: p.id,
        image: p.imageUrl,
        title: p.name,
        price: `${new Intl.NumberFormat("vi-VN").format(p.price)} VND`,
        priceValue: p.price,
        rating: Math.round(p.averageRating ?? 0),
        reviews: p.reviewCount ?? 0,
        outOfStock: (p.stock ?? 0) <= 0,
      })),
    [products],
  );

  const filterButtons: {
    id: "new" | "bestseller" | "custom";
    label: string;
  }[] = [
    { id: "new", label: "NEW COLLECTION" },
    { id: "bestseller", label: "BEST SELLER" },
    { id: "custom", label: "CUSTOM FOR YOU" },
  ];

  const visibleCards = useMemo(() => {
    const result = [...cards];

    // Sort theo activeFilter hoặc sort giá
    if (sortPrice === "asc") {
      result.sort((a, b) => (a.priceValue ?? 0) - (b.priceValue ?? 0));
    } else if (sortPrice === "desc") {
      result.sort((a, b) => (b.priceValue ?? 0) - (a.priceValue ?? 0));
    } else if (activeFilter === "bestseller") {
      result.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    } else if (activeFilter === "new") {
      result.sort((a, b) => b.id - a.id);
    }
    // custom: giữ nguyên thứ tự

    // Luôn đẩy sản phẩm hết hàng xuống cuối (giữ nguyên thứ tự tương đối của từng nhóm)
    result.sort((a, b) => Number(a.outOfStock) - Number(b.outOfStock));

    return result;
  }, [cards, sortPrice, activeFilter]);

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
              onClick={() => {
                if (activeFilter === btn.id) {
                  setActiveFilter(null);
                  setShowCustomMessage(false);
                } else {
                  setActiveFilter(btn.id);
                  setShowCustomMessage(btn.id === "custom");
                }
              }}
              className={`px-6 sm:px-8 py-3 font-bold text-xs sm:text-sm tracking-widest border rounded-md transition-all duration-200 touch-manipulation ${
                activeFilter === btn.id
                  ? "bg-[#44FF00] text-black border-[#44FF00]"
                  : "bg-black text-white border-white/30 hover:bg-[#44FF00] hover:text-black hover:border-[#44FF00]"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {showCustomMessage && (
          <p className="relative z-10 mt-4 text-center text-xs sm:text-sm text-[#44FF00] font-semibold tracking-widest">
            Để custom thiết kế riêng, vui lòng liên hệ trực tiếp với nhà bán hàng.
          </p>
        )}
      </div>

      {/* Sort */}
      <div className="relative z-10 flex items-center gap-4 mb-4">
        <label className="text-white/80 text-sm font-medium">Sắp xếp:</label>
        <select
          value={sortPrice}
          onChange={(e) =>
            setSortPrice(e.target.value as "default" | "asc" | "desc")
          }
          aria-label="Sắp xếp theo giá"
          className="bg-black border border-white/30 text-white rounded-md px-4 py-2 text-sm font-medium tracking-wide focus:outline-none focus:border-[#44FF00]"
        >
          <option value="default">Mới nhất</option>
          <option value="asc">Giá tăng dần</option>
          <option value="desc">Giá giảm dần</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading ? (
          <div className="text-white/70 col-span-full text-center py-10 flex items-center justify-center gap-3">
            <Spinner sizeClassName="h-6 w-6" />
            <span>Đang tải sản phẩm...</span>
          </div>
        ) : error ? (
          <div className="text-red-400 col-span-full text-center py-10">
            {error}
          </div>
        ) : visibleCards.length === 0 ? (
          <div className="col-span-full text-center py-20 sm:py-24 text-white/60">
            Không có sản phẩm nào phù hợp với bộ lọc hiện tại.
          </div>
        ) : (
          visibleCards.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.image}
              title={product.title}
              price={product.price}
              rating={product.rating}
              reviews={product.reviews}
              outOfStock={product.outOfStock}
            />
          ))
        )}
      </div>
      <div className="py-10"></div>
    </section>
  );
};

export default ProductGrid;
