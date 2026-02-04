import React, { useState } from "react";

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
    <aside className="flex flex-col text-[#F3FAF4] w-full max-w-full">
      <h2 className="text-[32px] font-bold mb-4">Your review</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-xl mb-2">Add your review *</label>
          <div className="flex gap-1 text-3xl">
            <span
              className="text-transparent stroke-white stroke-1 hover:text-yellow-500 cursor-pointer"
              style={{ WebkitTextStroke: "1px white" }}
            >
              ☆
            </span>
            <span
              className="text-transparent stroke-white stroke-1 hover:text-yellow-500 cursor-pointer"
              style={{ WebkitTextStroke: "1px white" }}
            >
              ☆
            </span>
            <span
              className="text-transparent stroke-white stroke-1 hover:text-yellow-500 cursor-pointer"
              style={{ WebkitTextStroke: "1px white" }}
            >
              ☆
            </span>
            <span
              className="text-transparent stroke-white stroke-1 hover:text-yellow-500 cursor-pointer"
              style={{ WebkitTextStroke: "1px white" }}
            >
              ☆
            </span>
            <span
              className="text-transparent stroke-white stroke-1 hover:text-yellow-500 cursor-pointer"
              style={{ WebkitTextStroke: "1px white" }}
            >
              ☆
            </span>
          </div>
        </div>

        <div>
          <label
            htmlFor="reviewer-name"
            className="block mb-2 text-sm font-bold"
          >
            Name*
          </label>
          <input
            type="text"
            id="reviewer-name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full bg-white text-black px-4 py-3 rounded-md outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        <div>
          <label
            htmlFor="reviewer-email"
            className="block mb-2 text-sm font-bold"
          >
            Email *
          </label>
          <input
            type="email"
            id="reviewer-email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full bg-white text-black px-4 py-3 rounded-md outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        <div>
          <label htmlFor="review-text" className="block mb-2 text-sm font-bold">
            Rate us *
          </label>
          <textarea
            id="review-text"
            name="review"
            value={formData.review}
            onChange={handleInputChange}
            placeholder="Write here"
            required
            rows={5}
            className="w-full bg-white text-black px-4 py-3 rounded-md outline-none resize-none focus:ring-2 focus:ring-gray-400 placeholder:text-gray-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#D9D9D9] text-black font-bold text-center mt-2 px-10 py-4 rounded-md hover:bg-white transition-colors text-xl"
        >
          Submit a review
        </button>
      </form>
    </aside>
  );
};

export default ReviewForm;
