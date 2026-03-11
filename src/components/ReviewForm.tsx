import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { Spinner } from "@/components/ui/Spinner";

const ReviewForm: React.FC<{ productId?: number; onCreated?: () => void }> = ({
  productId,
  onCreated,
}) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 5,
    review: "",
  });

  useEffect(() => {
    if (!user) return;
    setFormData((p) => ({
      ...p,
      name: p.name || user.name || "",
      email: p.email || user.email || "",
    }));
  }, [user]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const createMutation = useMutation({
    mutationFn: () => {
      if (!productId) throw new Error("Thiếu sản phẩm");
      return apiClient.createReview({
        productId,
        reviewerName: formData.name.trim(),
        reviewerEmail: formData.email.trim(),
        rating: formData.rating,
        comment: formData.review.trim(),
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["reviews", productId] });
      setFormData((p) => ({ ...p, rating: 5, review: "" }));
      onCreated?.();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate();
  };

  const StarPicker = () => (
    <div className="flex gap-1 text-3xl">
      {Array.from({ length: 5 }).map((_, i) => {
        const value = i + 1;
        const active = value <= formData.rating;
        return (
          <button
            key={value}
            type="button"
            onClick={() => setFormData((p) => ({ ...p, rating: value }))}
            className={
              active ? "text-[#facc15]" : "text-white/30 hover:text-white/60"
            }
            aria-label={`Rate ${value} stars`}
            title={`${value} sao`}
          >
            ★
          </button>
        );
      })}
    </div>
  );

  return (
    <aside className="flex flex-col text-[#F3FAF4] w-full max-w-full">
      <h2 className="text-xl sm:text-2xl md:text-[32px] font-bold mb-4">
        Your review
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {createMutation.error && (
          <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/30 px-3 py-2">
            {(createMutation.error as Error).message}
          </p>
        )}
        <div>
          <label className="block text-xl mb-2">Add your review *</label>
          <StarPicker />
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
          disabled={createMutation.isPending || !productId}
          className="w-full bg-[#D9D9D9] text-black font-bold text-center mt-2 px-10 py-4 rounded-md hover:bg-white transition-colors text-xl"
        >
          {createMutation.isPending && (
            <Spinner sizeClassName="h-4 w-4 inline-block mr-2" />
          )}
          Submit a review
        </button>
      </form>
    </aside>
  );
};

export default ReviewForm;
