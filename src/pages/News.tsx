import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: "blog" | "promotion";
  author?: string;
}

const News: React.FC = () => {
  const newsItems: NewsItem[] = [
    {
      id: 1,
      title: "Công nghệ in 3D mới nhất năm 2025",
      excerpt:
        "Khám phá những công nghệ in 3D tiên tiến nhất đang được áp dụng trong ngành công nghiệp và thời trang...",
      image: "/images/airmax.jpg",
      date: "15/03/2025",
      category: "blog",
      author: "Artiz Studio",
    },
    {
      id: 2,
      title: "Ưu đãi đặc biệt - Giảm 30% cho đơn hàng đầu tiên",
      excerpt:
        "Nhận ngay ưu đãi giảm 30% cho đơn hàng đầu tiên của bạn. Áp dụng cho tất cả sản phẩm trong bộ sưu tập mới...",
      image: "/images/airpod.jpg",
      date: "20/03/2025",
      category: "promotion",
      author: "Artiz Studio",
    },
    {
      id: 3,
      title: "Hướng dẫn chọn màu sắc phù hợp cho phụ kiện 3D",
      excerpt:
        "Làm thế nào để chọn màu sắc phù hợp cho phụ kiện in 3D của bạn? Hãy cùng tìm hiểu những mẹo hay...",
      image: "/images/iphone.jpg",
      date: "10/03/2025",
      category: "blog",
      author: "Artiz Studio",
    },
    {
      id: 4,
      title: "Sắp ra mắt: Bộ sưu tập mùa hè 2025",
      excerpt:
        "Chúng tôi sắp ra mắt bộ sưu tập mùa hè với những thiết kế độc đáo và màu sắc tươi mới. Đăng ký nhận thông báo ngay...",
      image: "/images/lipstick.jpg",
      date: "25/03/2025",
      category: "promotion",
      author: "Artiz Studio",
    },
    {
      id: 5,
      title: "5 lý do nên chọn in 3D cho phụ kiện cá nhân",
      excerpt:
        "In 3D mang lại nhiều lợi ích vượt trội so với phương pháp sản xuất truyền thống. Hãy khám phá 5 lý do hàng đầu...",
      image: "/images/airmax.jpg",
      date: "05/03/2025",
      category: "blog",
      author: "Artiz Studio",
    },
    {
      id: 6,
      title: "Flash Sale - Chỉ trong 24 giờ!",
      excerpt:
        "Cơ hội mua sắm với giá cực kỳ ưu đãi chỉ trong 24 giờ. Nhanh tay đặt hàng để không bỏ lỡ...",
      image: "/images/airpod.jpg",
      date: "22/03/2025",
      category: "promotion",
      author: "Artiz Studio",
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState<
    "all" | "blog" | "promotion"
  >("all");

  const filteredNews =
    selectedCategory === "all"
      ? newsItems
      : newsItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="flex flex-col overflow-hidden items-stretch bg-[#000311] min-h-screen">
      <Header />

      <main className="flex flex-col items-center flex-1 py-16 px-5">
        <div className="w-full max-w-[1240px]">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <h1 className="text-[#F3FAF4] text-2xl sm:text-4xl md:text-[48px] font-bold">
                News & Updates
              </h1>
            </div>
            <p className="text-[#F3FAF4]/70 text-lg">
              Cập nhật tin tức mới nhất về sản phẩm, blog và ưu đãi đặc biệt
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-8 py-4 font-bold text-sm transition-all rounded-lg ${
                selectedCategory === "all"
                  ? "bg-[#D9D7D7] text-black"
                  : "bg-[#D9D7D7]/70 text-black/70 hover:bg-[#D9D7D7]"
              }`}
            >
              ALL
            </button>
            <button
              onClick={() => setSelectedCategory("blog")}
              className={`px-8 py-4 font-bold text-sm transition-all rounded-lg ${
                selectedCategory === "blog"
                  ? "bg-[#D9D7D7] text-black"
                  : "bg-[#D9D7D7]/70 text-black/70 hover:bg-[#D9D7D7]"
              }`}
            >
              BLOG
            </button>
            <button
              onClick={() => setSelectedCategory("promotion")}
              className={`px-8 py-4 font-bold text-sm transition-all rounded-lg ${
                selectedCategory === "promotion"
                  ? "bg-[#D9D7D7] text-black"
                  : "bg-[#D9D7D7]/70 text-black/70 hover:bg-[#D9D7D7]"
              }`}
            >
              PROMOTIONS
            </button>
          </div>

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((item) => (
              <article
                key={item.id}
                className="bg-white/5 border border-white/10 rounded-lg overflow-hidden hover:bg-white/10 transition-colors"
              >
                {/* Image */}
                <div className="w-full aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Category Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        item.category === "promotion"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-blue-500/20 text-blue-400"
                      }`}
                    >
                      {item.category === "promotion" ? "PROMOTION" : "BLOG"}
                    </span>
                    <span className="text-[#F3FAF4]/50 text-sm">
                      {item.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-[#F3FAF4] text-xl font-bold mb-3 line-clamp-2">
                    {item.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-[#F3FAF4]/70 text-sm mb-4 line-clamp-3">
                    {item.excerpt}
                  </p>

                  {/* Author & Read More */}
                  <div className="flex items-center justify-between">
                    {item.author && (
                      <span className="text-[#F3FAF4]/50 text-xs">
                        By {item.author}
                      </span>
                    )}
                    <Link
                      to={`/news/${item.id}`}
                      className="text-[#F3FAF4] text-sm font-semibold hover:opacity-80 transition-opacity"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Empty State */}
          {filteredNews.length === 0 && (
            <div className="text-center py-20">
              <p className="text-[#F3FAF4]/70 text-lg">
                Không có bài viết nào trong danh mục này.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default News;
