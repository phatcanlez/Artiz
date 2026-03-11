import React from "react";
import { useQuery } from "@tanstack/react-query";
import { apiClient, type ReviewDto } from "@/lib/api";
import { Spinner } from "@/components/ui/Spinner";

interface ReviewProps {
  name: string;
  date: string;
  rating: number;
  comment: string;
}

const Stars: React.FC<{ rating: number }> = ({ rating }) => {
  const r = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < r ? "text-[#facc15]" : "text-white/30"}>
          ★
        </span>
      ))}
    </div>
  );
};

const Review: React.FC<ReviewProps> = ({ name, date, rating, comment }) => {
  return (
    <article className="mb-[25px]">
      <div className="flex w-full items-stretch gap-5 flex-wrap justify-between">
        <div className="flex gap-[26px]">
          <div className="bg-[rgba(217,217,217,1)] flex w-[88px] shrink-0 h-[88px] rounded-full" />
          <div className="flex flex-col items-stretch mt-[18px]">
            <h3 className="text-[#F3FAF4] text-xl sm:text-2xl md:text-[32px] font-semibold">
              {name}
            </h3>
            <time className="text-[#F3FAF4] text-base font-normal">{date}</time>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-[43px] max-md:mt-10">
          <Stars rating={rating} />
        </div>
      </div>
      <p className="text-[#F3FAF4] text-xl font-normal mt-[25px]">{comment}</p>
    </article>
  );
};

const formatDate = (s: string) => {
  try {
    return new Date(s).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return s;
  }
};

const ReviewsSection: React.FC<{ productId?: number }> = ({ productId }) => {
  const { data, isLoading, error } = useQuery<ReviewDto[]>({
    queryKey: ["reviews", productId],
    enabled: typeof productId === "number",
    queryFn: () => apiClient.getReviewsByProduct(productId as number),
  });

  return (
    <section className="flex-1">
      <h2 className="text-[#F3FAF4] text-xl sm:text-2xl md:text-[32px] font-bold mb-4 sm:mb-[30px]">
        Recent Reviews
      </h2>
      {!productId ? (
        <p className="text-white/60">Đang tải sản phẩm...</p>
      ) : isLoading ? (
        <div className="text-white/70 py-8 flex items-center gap-2">
          <Spinner sizeClassName="h-5 w-5" />
          <span>Đang tải đánh giá...</span>
        </div>
      ) : error ? (
        <p className="text-red-400 py-4">
          Không thể tải đánh giá. {(error as Error).message}
        </p>
      ) : !data || data.length === 0 ? (
        <p className="text-white/60">Chưa có đánh giá nào.</p>
      ) : (
        data.map((r) => (
          <Review
            key={r.id}
            name={r.reviewerName}
            date={formatDate(r.createdAt)}
            rating={r.rating}
            comment={r.comment}
          />
        ))
      )}
    </section>
  );
};

export default ReviewsSection;
