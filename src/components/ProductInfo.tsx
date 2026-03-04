import React, { useState, useRef } from "react";
import { useCartFly } from "@/hooks/useCartFly";

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
      aria-expanded={isOpen}
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
    <span className="text-xs text-white/70 ml-2">( {reviews} reviews )</span>
  </div>
);

const ProductInfo: React.FC = () => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [quantity, setQuantity] = useState(1);
  const addToCartRef = useRef<HTMLButtonElement>(null);
  const { flyToCart } = useCartFly();

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const sections = [
    "Product Description",
    "Size",
    "Material",
    "Product policy",
    "Product Preservation",
    "Delivery & TAX",
  ];

  const rating = 4.3;
  const reviews = 2;

  const sectionContent: Record<string, React.ReactNode> = {
    "Product Description": (
      <p>
        Men Armor Black Silver là sản phẩm case bảo vệ cao cấp được thiết kế
        theo phong cách Armor — kết hợp giữa tính năng bảo vệ tối ưu và thẩm mỹ
        độc đáo. Phù hợp cho những ai yêu thích phong cách cá tính, mạnh mẽ.
      </p>
    ),
    Size: (
      <ul className="space-y-1">
        <li>• Phù hợp: AirPods Pro 1 &amp; 2</li>
        <li>• Kích thước: 60 × 45 × 25 mm</li>
        <li>• Trọng lượng: ~18g</li>
      </ul>
    ),
    Material: (
      <ul className="space-y-1">
        <li>• Chất liệu chính: TPU cao cấp kết hợp PC cứng</li>
        <li>• Lớp phủ: Sơn mờ chống vân tay</li>
        <li>• Màu sắc: Đen & Bạc (Black Silver)</li>
      </ul>
    ),
    "Product policy": (
      <ul className="space-y-1">
        <li>• Bảo hành: 6 tháng lỗi nhà sản xuất</li>
        <li>• Đổi trả: Trong vòng 7 ngày nếu có lỗi</li>
        <li>• Không áp dụng đổi trả do thay đổi ý kiến sau khi nhận hàng</li>
      </ul>
    ),
    "Product Preservation": (
      <ul className="space-y-1">
        <li>• Tránh tiếp xúc trực tiếp với hóa chất, dung môi</li>
        <li>• Lau chùi bằng khăn mềm khô hoặc hơi ẩm</li>
        <li>• Bảo quản nơi khô ráo, thoáng mát</li>
      </ul>
    ),
    "Delivery & TAX": (
      <ul className="space-y-1">
        <li>• Giao hàng toàn quốc: 2–4 ngày làm việc</li>
        <li>• Giao hàng nhanh (HCM / HN): 1–2 ngày</li>
        <li>• Phí vận chuyển: Miễn phí cho đơn từ 500.000đ</li>
        <li>• Thuế VAT đã bao gồm trong giá niêm yết</li>
      </ul>
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
        Men Armor Black Silver
      </h1>

      {/* Price */}
      <div className="text-xl font-normal text-white mb-2">3.850.000 VND</div>

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
          onClick={() =>
            addToCartRef.current && flyToCart(addToCartRef.current)
          }
          className="flex-1 bg-[#D9D9D9] text-black font-extrabold text-sm tracking-wide hover:bg-white transition-colors flex items-center justify-center"
          style={{ marginLeft: "3px" }}
        >
          Add to Cart
        </button>
      </div>

      {/* Buy Now — cắt góc trên-trái + dưới-phải (đối xứng với 2 nút trên) */}
      <button className="w-full h-[56px] mb-6 bg-[#D9D9D9] text-black font-extrabold text-base hover:bg-white transition-colors">
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
          >
            {sectionContent[section]}
          </AccordionItem>
        ))}
      </div>
    </div>
  );
};

export default ProductInfo;
