import React, { useState } from "react";

import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StarDivider from "@/components/ui/StarDivider";

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
  tags?: string[];
}

const allPosts: NewsItem[] = [
  {
    id: 1,
    title: "Migrating to Linear 101",
    excerpt:
      "Linear helps streamline software projects, sprints, tasks, and bug tracking. Here's how to get started.",
    image: "/images/col1.jpg",
    date: "Sunday, 1 Jan 2023",
    category: "Design",
    tags: ["Design"],
  },
  {
    id: 2,
    title: "Building your API Stack",
    excerpt:
      "The rise of RESTful APIs has been met by a new era in tooling for creating, testing, and managing...",
    image: "/images/col2.jpg",
    date: "Sunday, 1 Jan 2023",
    category: "Design",
    tags: ["Design"],
  },
  {
    id: 3,
    title: "Grid system for better Design User Interface",
    excerpt:
      "A grid system is a design tool used to arrange content on a webpage. It is a series of vertical and horizontal lines that create a matrix of intersecting points...",
    image: "/images/airmax.jpg",
    date: "Sunday, 1 Jan 2023",
    category: "Design",
    tags: ["Design"],
  },
  {
    id: 4,
    title: "UX review presentations",
    excerpt:
      "How do you create compelling presentations that wow your colleagues and impress your managers?",
    image: "/images/banner.png",
    date: "Sunday, 1 Jan 2023",
    category: "Design",
    tags: ["Design"],
  },
  {
    id: 5,
    title: "Climate Endgame: Exploring catastrophic climate change scenarios",
    excerpt:
      "Exploring worst-case climate scenarios and what they mean for the future of our planet.",
    image: "/images/col3.jpg",
    date: "Sunday, 1 Jan 2023",
    category: "Design",
    tags: ["Design"],
  },
  {
    id: 6,
    title: "Bill Walsh leadership lessons",
    excerpt:
      "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?",
    image: "/images/col1.jpg",
    date: "Sunday, 1 Jan 2023",
    category: "",
    tags: ["Leadership", "Management", "Presentation"],
  },
  {
    id: 7,
    title: "PM mental models",
    excerpt:
      "Mental models are simple expressions of complex processes or relationships.",
    image: "/images/col2.jpg",
    date: "Sunday, 1 Jan 2023",
    category: "",
    tags: ["Product", "Research", "Frameworks"],
  },
  {
    id: 8,
    title: "What is Wireframing?",
    excerpt:
      "Introduction to Wireframing and its Principles. Learn from the best in the industry.",
    image: "/images/col3.jpg",
    date: "Sunday, 1 Jan 2023",
    category: "",
    tags: ["Design", "Research", "Presentation"],
  },
  {
    id: 9,
    title: "How collaboration makes us better designers",
    excerpt:
      "Collaboration can make our teams stronger, and our individual designs better.",
    image: "/images/airmax.jpg",
    date: "Sunday, 1 Jan 2023",
    category: "",
    tags: ["Design", "Research", "Presentation"],
  },
  {
    id: 10,
    title: "Our top 10 Javascript frameworks to use",
    excerpt:
      "JavaScript frameworks make development easy with extensive features and functionalities.",
    image: "/images/airpod.jpg",
    date: "Sunday, 1 Jan 2023",
    category: "",
    tags: ["Software Development", "Tools", "SaaS"],
  },
  {
    id: 11,
    title: "Podcast: Creating a better CX Community",
    excerpt:
      "Starting a community doesn't need to be complicated, but how do you get started?",
    image: "/images/lipstick.jpg",
    date: "Sunday, 1 Jan 2023",
    category: "",
    tags: ["Podcasts", "Customer Success", "Presentation"],
  },
  {
    id: 12,
    title: "UX review presentations",
    excerpt:
      "How do you create compelling presentations that wow your colleagues and impress your managers?",
    image: "/images/iphone.jpg",
    date: "Sunday, 1 Jan 2023",
    category: "Design",
    tags: ["Design"],
  },
];

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
        {/* ── RECENT BLOG POSTS ── */}
        <h2
          className="text-white text-base font-black uppercase mb-4 tracking-wide"
          style={{ fontFamily: "'Arial Black', Impact, sans-serif" }}
        >
          Recent Blog Posts
        </h2>

        {/* ── Grid 2 cột: trái bài 1, phải bài 2+3 ── */}
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
                <div className="w-[240px] flex-shrink-0 overflow-hidden">
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

        {/* ── Bài 5: full width, ảnh trái + text phải ── */}
        <Link
          to={`/news/${wideCard.id}`}
          className="group flex gap-6 border-t border-white/20 pt-6 mt-2 mb-10"
        >
          <div className="w-[48%] flex-shrink-0 overflow-hidden">
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
