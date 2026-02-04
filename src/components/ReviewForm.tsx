import React, { useState } from "react";
import { SparkleIcon } from "./ui/SparkleIcon";
import { RightSparkleIcon } from "./ui/RightSparkleIcon";

const ReviewForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "Quốc Phong",
    email: "quocphong12@gmail.com",
    rating: 5,
    review: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Review submitted:", formData);
  };

  return (
    <aside className="flex flex-col text-xl text-[#F3FAF4] font-normal w-[401px] max-w-full">
      <div className="flex items-center gap-4 mb-4">
        <SparkleIcon className="w-8 h-8 shrink-0" />
        <h2 className="text-[#F3FAF4] text-[32px] font-bold">Your review</h2>
        <RightSparkleIcon className="h-8 w-auto shrink-0" />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col">
        <label
          htmlFor="review-rating"
          className="text-[#F3FAF4] text-2xl mt-[33px]"
        >
          Add your review *
        </label>
        <img
          src="https://api.builder.io/api/v1/image/assets/7c252285b2084f26866cf7cf5b5da26b/33fd9c9f0dfbbd1325c6070975bb38d5830c2d5a?placeholderIfAbsent=true"
          className="aspect-[6.25] object-contain w-[206px] max-w-full mt-[19px]"
          alt="Rating stars selector"
          role="button"
          tabIndex={0}
        />

        <label htmlFor="reviewer-name" className="text-[#F3FAF4] mt-[23px]">
          Name*
        </label>
        <input
          type="text"
          id="reviewer-name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="bg-white border-neutral-400 border text-base text-[rgba(152,152,152,1)] mt-[11px] p-[11px] rounded-md border-solid"
        />

        <label htmlFor="reviewer-email" className="text-[#F3FAF4] mt-[27px]">
          Email *
        </label>
        <input
          type="email"
          id="reviewer-email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="bg-white border-neutral-400 border text-base text-[rgba(152,152,152,1)] whitespace-nowrap mt-[11px] px-3 py-[11px] rounded-md border-solid"
        />

        <label htmlFor="review-text" className="text-[#F3FAF4] mt-[34px]">
          Rate us *
        </label>
        <textarea
          id="review-text"
          name="review"
          value={formData.review}
          onChange={handleInputChange}
          placeholder="Write here"
          required
          rows={8}
          className="bg-white border-neutral-400 border text-base text-[rgba(152,152,152,1)] mt-[11px] pt-[13px] pb-[100px] px-3 rounded-md border-solid resize-none"
        />

        <button
          type="submit"
          className="flex flex-col relative aspect-[6.746] w-full items-center text-2xl text-[#102314] font-bold justify-center mt-[21px] px-10 py-4 rounded-md hover:opacity-90 transition-opacity"
        >
          <img
            src="https://api.builder.io/api/v1/image/assets/7c252285b2084f26866cf7cf5b5da26b/9b53520bce9de0cf2078b44d4a428d007d603d90?placeholderIfAbsent=true"
            className="absolute h-full w-full object-cover inset-0 rounded-md"
            alt=""
          />
          <span className="relative">Submit a review</span>
        </button>
      </form>
    </aside>
  );
};

export default ReviewForm;
