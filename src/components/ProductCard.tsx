import React, { useState } from "react";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id: number;
  image: string;
  title: string;
  price: string;
  rating: number;
  reviews: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  title,
  price,
  rating,
  reviews,
}) => {
  const [isLiked, setIsLiked] = useState(false);

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        width="13"
        height="13"
        viewBox="0 0 13 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.5 10.4479L10.517 13L9.451 8.19L13 4.95368L8.3265 4.52947L6.5 0L4.6735 4.52947L0 4.95368L3.5425 8.19L2.483 13L6.5 10.4479Z"
          fill={index < rating ? "#FFC400" : "#4A4A4A"}
        />
      </svg>
    ));
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <Link
      to={`/detail/${id}`}
      className="block text-white no-underline hover:text-white"
      style={{ color: "inherit" }}
    >
      <article className="group relative">
        {/* Product Image — xẻo góc trên phải */}
        <div
          className="w-full aspect-[295/357] relative overflow-hidden bg-gray-800"
          style={{
            clipPath:
              "polygon(0 0, calc(100% - 48px) 0, 100% 48px, 100% 100%, 0 100%)",
          }}
        >
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Product Info — title + like ngang hàng */}
        <div className="flex items-start justify-between mt-3">
          <h3 className="text-white text-lg font-bold leading-tight">
            {title}
          </h3>
          <button
            onClick={handleLikeClick}
            className="flex-shrink-0 -mr-0 hover:scale-110 transition-transform"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z"
                fill={isLiked ? "#ff4757" : "white"}
              />
            </svg>
          </button>
        </div>

        {/* Price */}
        <p className="text-white text-sm mt-1">{price}</p>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          {renderStars()}
          <span className="text-white text-xs ml-2">( {reviews} reviews )</span>
        </div>

        {/* Quick View Button — dùng quick view button.png có sẵn chữ */}
        <button className="relative w-full mt-3 block">
          <img
            src="/element/quick view button.png"
            alt="Quick View"
            className="w-full h-auto block"
          />
        </button>
      </article>
    </Link>
  );
};

export default ProductCard;
