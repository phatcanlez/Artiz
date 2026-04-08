import React, { useMemo, useState } from "react";

import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StarDivider from "@/components/ui/StarDivider";
import { useQuery } from "@tanstack/react-query";
import { apiClient, type BlogPostDto } from "@/lib/api";

type NewsItem = {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category?: string;
  tags?: string[];
};

const POSTS_PER_PAGE = 6;
const TAG_COLOR = "bg-[#ECFDF3] text-[#027A48]";

const TagBadge = ({ tag }: { tag: string }) => (
  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${TAG_COLOR}`}>
    {tag}
  </span>
);

const ArrowIcon = () => (
  <img
    src="/element/Icon nhỏ.png"
    alt="arrow"
    className="w-3.5 h-3.5 flex-shrink-0 object-contain"
  />
);

const News: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery<BlogPostDto[]>({
    queryKey: ["blog-public"],
    queryFn: () => apiClient.getBlogPosts(),
  });

  const allPosts: NewsItem[] = useMemo(() => {
    const list = data ?? [];
    return list.map((p) => ({
      id: p.id,
      title: p.title,
      excerpt: p.summary,
      image: p.thumbnailUrl ?? "/images/banner.png",
      date: new Date(p.createdAt).toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      }),
      category: "Blog",
      tags: undefined,
    }));
  }, [data]);

  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);

  const recentPosts = allPosts.slice(0, 5);
  const featured = recentPosts[0]; // cột trái: bài 1
  const sideCards = recentPosts.slice(1, 4); // cột phải: bài 2, 3, 4
  const wideCard = recentPosts[4]; // full width dưới: bài 5

  const pagedPosts = allPosts.slice(
    (page - 1) * POSTS_PER_PAGE,
    page * POSTS_PER_PAGE,
  );

  const pageNumbers = (): (number | "...")[] => {
    if (totalPages <= 7)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | "...")[] = [1, 2, 3];
    if (page > 5) pages.push("...");
    if (page > 3 && page < totalPages - 2) pages.push(page);
    pages.push("...", totalPages - 1, totalPages);
    return [...new Set(pages)];
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header />

      {/* ── THE BLOG Hero — bố cục giống HeroProductList ── */}
      <section className="relative w-full bg-black flex flex-col items-center justify-center pt-10 sm:pt-14 pb-0 px-4">
        <h1
          className="text-white text-center uppercase leading-none w-full"
          style={{
            fontFamily: "'SVN-Redzone', 'Arial Black', 'Impact', sans-serif",
            fontSize: "clamp(60px, 14vw, 160px)",
            letterSpacing: "-0.02em",
          }}
        >
          THE BLOG
        </h1>
        <StarDivider />
      </section>

      <main className="flex-1 px-4 sm:px-6 md:px-8 lg:px-10 py-6 w-full">
        {isLoading && (
          <p className="text-white/60 text-sm">Đang tải bài viết...</p>
        )}
        {!isLoading && allPosts.length === 0 && (
          <p className="text-white/60 text-sm">Chưa có bài viết nào.</p>
        )}
        {/* ── RECENT BLOG POSTS ── */}
        <h2
          className="text-white text-base font-black uppercase mb-4 tracking-wide"
          style={{ fontFamily: "'Arial Black', Impact, sans-serif" }}
        >
          Recent Blog Posts
        </h2>

        {/* ── Grid 2 cột: trái bài 1, phải bài 2+3 ── */}
        {featured && wideCard && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Cột trái: featured lớn */}
          <Link to={`/news/${featured.id}`} className="group flex flex-col">
            <div className="overflow-hidden">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="pt-4 flex flex-col">
              <p className="text-white/50 text-xs mb-2">{featured.date}</p>
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-white font-bold text-2xl leading-snug group-hover:opacity-80">
                  {featured.title}
                </h3>
                <ArrowIcon />
              </div>
              <p className="text-white/60 text-sm line-clamp-3">
                {featured.excerpt}
              </p>
              {featured.tags && (
                <div className="flex gap-2 mt-3 flex-wrap">
                  {featured.tags.map((t) => (
                    <TagBadge key={t} tag={t} />
                  ))}
                </div>
              )}
            </div>
          </Link>

          {/* Cột phải: bài 2 + bài 3, mỗi bài ảnh trái + text phải */}
          <div className="flex flex-col divide-y divide-white/20">
            {sideCards.map((post) => (
              <Link
                key={post.id}
                to={`/news/${post.id}`}
                className="group flex gap-4 py-4 first:pt-0 last:pb-0"
              >
                <div className="w-[120px] sm:w-[180px] md:w-[240px] flex-shrink-0 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex flex-col justify-start min-w-0 pt-1">
                  <p className="text-white/50 text-xs mb-1.5">{post.date}</p>
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h3 className="text-white font-bold text-base leading-snug line-clamp-2 group-hover:opacity-80">
                      {post.title}
                    </h3>
                    <ArrowIcon />
                  </div>
                  <p className="text-white/60 text-sm line-clamp-3">
                    {post.excerpt}
                  </p>
                  {post.tags && (
                    <div className="flex gap-1.5 mt-2 flex-wrap">
                      {post.tags.map((t) => (
                        <TagBadge key={t} tag={t} />
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
        )}

        {/* ── Bài 5: full width, ảnh trái + text phải ── */}
        {wideCard && (
          <Link
          to={`/news/${wideCard.id}`}
          className="group flex flex-col sm:flex-row gap-6 border-t border-white/20 pt-6 mt-2 mb-10"
        >
          <div className="w-full sm:w-[48%] flex-shrink-0 overflow-hidden">
            <img
              src={wideCard.image}
              alt={wideCard.title}
              className="w-full aspect-[21/9] object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="flex flex-col justify-center flex-1 min-w-0">
            <p className="text-white/50 text-xs mb-2">{wideCard.date}</p>
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="text-white font-bold text-2xl leading-snug group-hover:opacity-80">
                {wideCard.title}
              </h3>
              <ArrowIcon />
            </div>
            <p className="text-white/60 text-sm line-clamp-4">
              {wideCard.excerpt}
            </p>
            {wideCard.tags && (
              <div className="flex gap-2 mt-3 flex-wrap">
                {wideCard.tags.map((t) => (
                  <TagBadge key={t} tag={t} />
                ))}
              </div>
            )}
          </div>
        </Link>
        )}

        {/* ── StarDivider ── */}
        <StarDivider />

        {/* ── ALL BLOG POSTS ── */}
        <h2
          className="text-white text-xl font-black uppercase mb-8 mt-8 tracking-wide"
          style={{ fontFamily: "'Arial Black', Impact, sans-serif" }}
        >
          All Blog Posts
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {pagedPosts.map((post) => (
            <Link
              key={post.id}
              to={`/news/${post.id}`}
              className="group flex flex-col"
            >
              <div className="overflow-hidden mb-4">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <p className="text-white/50 text-xs mb-2">{post.date}</p>
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-white font-bold text-base leading-snug group-hover:opacity-80">
                  {post.title}
                </h3>
                <ArrowIcon />
              </div>
              <p className="text-white/60 text-sm mb-4 line-clamp-2 flex-1">
                {post.excerpt}
              </p>
              {post.tags && (
                <div className="flex gap-2 flex-wrap">
                  {post.tags.map((t) => (
                    <TagBadge key={t} tag={t} />
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>

        {/* ── Pagination ── */}
        <div className="flex items-center justify-between border-t border-white/20 pt-6">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex items-center gap-2 text-white/70 hover:text-white disabled:opacity-30 transition-colors text-sm font-medium"
          >
            ← Previous
          </button>

          <div className="flex items-center gap-1">
            {pageNumbers().map((p, i) =>
              p === "..." ? (
                <span key={`ellipsis-${i}`} className="px-2 text-white/40">
                  ...
                </span>
              ) : (
                <button
                  key={p}
                  onClick={() => setPage(p as number)}
                  className={`w-9 h-9 rounded-md text-sm font-medium transition-colors ${
                    page === p
                      ? "bg-[#44FF00] text-black"
                      : "text-white/70 hover:bg-white/10"
                  }`}
                >
                  {p}
                </button>
              ),
            )}
          </div>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="flex items-center gap-2 text-white/70 hover:text-white disabled:opacity-30 transition-colors text-sm font-medium"
          >
            Next →
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default News;
