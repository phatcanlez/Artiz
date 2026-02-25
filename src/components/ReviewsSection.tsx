import React from "react";

interface ReviewProps {
  name: string;
  date: string;
  rating: number;
  comment: string;
}

const Review: React.FC<ReviewProps> = ({ name, date, comment }) => {
  return (
    <article className="mb-[25px]">
      <div className="flex w-full items-stretch gap-5 flex-wrap justify-between">
        <div className="flex gap-[26px]">
          <div className="bg-[rgba(217,217,217,1)] flex w-[88px] shrink-0 h-[88px] rounded-full" />
          <div className="flex flex-col items-stretch mt-[18px]">
            <h3 className="text-[#F3FAF4] text-xl sm:text-2xl md:text-[32px] font-semibold">{name}</h3>
            <time className="text-[#F3FAF4] text-base font-normal">{date}</time>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-[43px] max-md:mt-10">
          <img
            src="https://api.builder.io/api/v1/image/assets/7c252285b2084f26866cf7cf5b5da26b/43bc5df14a6e20815bace5f66747152a3533e6e9?placeholderIfAbsent=true"
            className="aspect-[6.25] object-contain w-[206px] shrink-0 max-w-full"
            alt="Rating stars"
          />
          <span className="text-[#F3FAF4] text-xs">(120)</span>
        </div>
      </div>
      <p className="text-[#F3FAF4] text-xl font-normal mt-[25px]">{comment}</p>
    </article>
  );
};

const ReviewsSection: React.FC = () => {
  const reviews = [
    {
      name: "Quốc Phong",
      date: "17/03/2025",
      rating: 5,
      comment:
        "Mình không nghĩ chiếc nhẫn này lại đẹp đến vậy cho đến khi nhận hàng. Thiết kế đơn giản nhưng tinh tế, đeo lên tay nhìn rất hài hòa và sang. Mình đeo suốt cả tuần, rửa tay hay làm việc cũng không bị trầy hay xỉn màu gì cả. Cảm giác chất liệu chắc, mịn và thoải mái. Nói chung là quá ưng, nhìn ngoài còn đẹp hơn ảnh nhiều luôn.",
    },
    {
      name: "Quốc Phong",
      date: "17/03/2025",
      rating: 5,
      comment:
        "Mình mua tặng bạn mà nhìn ngoài còn đẹp hơn trong ảnh. Form chắc tay, sáng nhẹ kiểu tinh tế, bạn mình thích lắm.",
    },
    {
      name: "Quốc Phong",
      date: "17/03/2025",
      rating: 5,
      comment:
        "Giao hàng nhanh, hộp đóng gói cẩn thận. Nhẫn đeo vừa tay, kiểu dáng hợp trend. Sẽ ủng hộ thêm mẫu khác.",
    },
  ];

  return (
    <section className="flex-1">
      <h2 className="text-[#F3FAF4] text-xl sm:text-2xl md:text-[32px] font-bold mb-4 sm:mb-[30px]">
        Recent Reviews
      </h2>
      {reviews.map((review, index) => (
        <Review
          key={index}
          name={review.name}
          date={review.date}
          rating={review.rating}
          comment={review.comment}
        />
      ))}
    </section>
  );
};

export default ReviewsSection;
