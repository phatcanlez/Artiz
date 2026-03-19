import React, { useState, useRef } from "react";
import { useCartFly } from "@/hooks/useCartFly";
import { useCart } from "@/contexts/CartContext";

interface AccordionItemProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  isOpen,
  onToggle,
  children,
}) => (
  <div className="relative w-full border-b border-white/20">
    <button
      onClick={onToggle}
      className="relative flex items-center justify-between w-full text-left text-base text-white font-medium py-[21px]"
    >
      <span>{title}</span>
      <span className="text-xl font-light leading-none">
        {isOpen ? "−" : "+"}
      </span>
    </button>
    {isOpen && (
      <div className="pb-4 text-sm text-white/70 leading-relaxed">
        {children}
      </div>
    )}
  </div>
);

/* SVG ngôi sao — hỗ trợ fill lẻ (0→1) */
const StarIcon = ({ fill }: { fill: number }) => {
  const id = `star-grad-${Math.random().toString(36).slice(2)}`;
  const pct = `${Math.round(fill * 100)}%`;
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={id} x1="0" x2="1" y1="0" y2="0">
          <stop offset={pct} stopColor="#FACC15" />
          <stop offset={pct} stopColor="#4B5563" />
        </linearGradient>
      </defs>
      <polygon
        points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
        fill={`url(#${id})`}
        stroke="#FACC15"
        strokeWidth="0.5"
      />
    </svg>
  );
};

/* Rating lẻ — dùng SVG ngôi sao thật */
const StarRating = ({
  rating,
  reviews,
}: {
  rating: number;
  reviews: number;
}) => (
  <div className="flex items-center gap-[2px]">
    {[1, 2, 3, 4, 5].map((i) => (
      <StarIcon key={i} fill={Math.min(1, Math.max(0, rating - (i - 1)))} />
    ))}
    <span className="text-xs text-white/70 ml-2">( {reviews} đánh giá )</span>
  </div>
);

interface ProductInfoProps {
  product?: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    stock?: number;
    averageRating?: number;
    reviewCount?: number;
    description?: string;
    size?: string;
    material?: string;
    productPolicy?: string;
    productPreservation?: string;
    deliveryTax?: string;
  };
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product: productProp }) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [quantity, setQuantity] = useState(1);
  const addToCartRef = useRef<HTMLButtonElement>(null);
  const { flyToCart } = useCartFly();
  const { addToCart } = useCart();
  const product = productProp ?? {
    id: 1,
    name: "Men Armor Black Silver",
    price: 3850000,
    imageUrl: "/images/airmax.jpg",
  };

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const sections = [
    "Mô tả sản phẩm",
    "Kích thước",
    "Chất liệu",
    "Chính sách sản phẩm",
    "Bảo quản sản phẩm",
    "Giao hàng & Thuế",
  ];

  const rating = product.averageRating ?? 0;
  const reviews = product.reviewCount ?? 0;
  const isOutOfStock = (product.stock ?? 0) <= 0;

  const sectionContent: Record<string, React.ReactNode> = {
    "Mô tả sản phẩm": (
      <p>{product.description || "Chưa có mô tả sản phẩm."}</p>
    ),
    "Kích thước": (
      <p>{product.size || "Chưa có thông tin kích thước."}</p>
    ),
    "Chất liệu": (
      <p>{product.material || "Chưa có thông tin chất liệu."}</p>
    ),
    "Chính sách sản phẩm": (
      <p>{product.productPolicy || "Chưa có chính sách sản phẩm."}</p>
    ),
    "Bảo quản sản phẩm": (
      <p>{product.productPreservation || "Chưa có hướng dẫn bảo quản."}</p>
    ),
    "Giao hàng & Thuế": (
      <p>{product.deliveryTax || "Chưa có thông tin giao hàng & thuế."}</p>
    ),
  };

  return (
    <div className="w-full text-white font-medium">
      {/* star.png — dải trang trí ngang */}
      <img
        src="/element/star.png"
        alt=""
        className="w-full h-auto block mb-4"
      />

      {/* Product Header */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight mb-1">
        {product.name}
      </h1>

      {/* Price */}
      <div className="text-xl font-normal text-white mb-2">
        {new Intl.NumberFormat("vi-VN").format(product.price)} VND
      </div>

      {/* Rating lẻ — SVG ngôi sao */}
      <div className="mb-6">
        <StarRating rating={rating} reviews={reviews} />
      </div>

      {/* Actions */}
      <div className="flex w-full mb-3 h-[56px]">
        {/* Quantity — vuông, viền trắng */}
        <div
          className="relative flex-shrink-0 flex items-center justify-between px-4 border border-white"
          style={{ width: "40%" }}
        >
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="text-2xl font-bold text-white w-8 text-center hover:opacity-60"
          >
            −
          </button>
          <span className="text-white font-bold text-base">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="text-2xl font-bold text-white w-8 text-center hover:opacity-60"
          >
            +
          </button>
        </div>

        {/* Add to Cart — cắt góc dưới-phải, nền xám */}
        <button
          ref={addToCartRef}
          disabled={isOutOfStock}
          onClick={() => {
            if (isOutOfStock) return;
            addToCart({
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.imageUrl,
              quantity: quantity,
            });
            if (addToCartRef.current) flyToCart(addToCartRef.current);
          }}
          className="flex-1 bg-[#D9D9D9] text-black font-extrabold text-sm tracking-wide hover:bg-white transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#D9D9D9]"
          style={{ marginLeft: "3px" }}
        >
          {isOutOfStock ? "Hết hàng" : "Thêm vào giỏ"}
        </button>
      </div>

      {/* Buy Now — cắt góc trên-trái + dưới-phải (đối xứng với 2 nút trên) */}
      <button
        disabled={isOutOfStock}
        className="w-full h-[56px] mb-6 bg-[#D9D9D9] text-black font-extrabold text-base hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#D9D9D9]"
      >
        {isOutOfStock ? "Hết hàng" : "Mua ngay"}
      </button>

      {/* Accordion List */}
      <div className="flex flex-col items-stretch border-t border-white/20">
        {sections.map((section) => (
          <AccordionItem
            key={section}
            title={section}
            isOpen={openSections[section] || false}
            onToggle={() => toggleSection(section)}
          >
            {sectionContent[section]}
          </AccordionItem>
        ))}
      </div>
    </div>
  );
};

export default ProductInfo;
