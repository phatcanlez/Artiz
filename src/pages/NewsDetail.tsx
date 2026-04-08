import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StarDivider from "@/components/ui/StarDivider";
import { SparkleIcon } from "@/components/ui/SparkleIcon";
import { RightSparkleIcon } from "@/components/ui/RightSparkleIcon";
import { apiClient, type BlogPostDto } from "@/lib/api";

interface Section {
  heading: string;
  body: string;
}

function parseMarkdownSections(markdown: string): Section[] {
  const text = markdown ?? "";
  const parts = text.split(/\n##\s+/g);
  const normalized = parts[0].startsWith("## ")
    ? [parts[0].replace(/^##\s+/, ""), ...parts.slice(1)]
    : parts;

  const sections: Section[] = [];
  for (const part of normalized) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    const [firstLine, ...rest] = trimmed.split("\n");
    const heading = firstLine.trim();
    const body = rest.join("\n").trim();
    sections.push({
      heading: heading || "Nội dung",
      body: body || "",
    });
  }
  return sections.length > 0 ? sections : [{ heading: "Nội dung", body: text }];
}

const TAG_COLOR = "bg-[#ECFDF3] text-[#027A48]";

const TagBadge = ({ tag }: { tag: string }) => (
  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${TAG_COLOR}`}>
    {tag}
  </span>
);

const S = ({ style }: { style?: React.CSSProperties }) => (
  <img
    src="/element/image 58.png"
    alt=""
    className="hidden lg:block absolute w-5 h-5 object-contain pointer-events-none select-none z-20"
    style={{ transform: "translate(-50%, -50%)", ...style }}
  />
);

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const postId = parseInt(id || "1", 10);

  const { data: allPosts } = useQuery<BlogPostDto[]>({
    queryKey: ["blog-public"],
    queryFn: () => apiClient.getBlogPosts(),
  });

  const { data: postDetail } = useQuery<BlogPostDto>({
    queryKey: ["blog-public", postId],
    queryFn: () => apiClient.getBlogPost(postId),
    enabled: Number.isFinite(postId),
  });

  const post = useMemo(() => {
    const p =
      postDetail ?? allPosts?.find((x) => x.id === postId) ?? allPosts?.[0];
    if (!p) return undefined;
    const sections = parseMarkdownSections(p.content);
    return {
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
      tags: ["Blog"],
      author: "ARTIZ",
      readingTime: "—",
      likes: "—",
      comments: "—",
      shares: "—",
      content: sections,
    };
  }, [allPosts, postDetail, postId]);

  const similarPosts = useMemo(() => {
    const list = allPosts ?? [];
    return list
      .filter((p) => p.id !== postId)
      .slice(0, 3)
      .map((p) => ({
        id: p.id,
        title: p.title,
        excerpt: p.summary,
        image: p.thumbnailUrl ?? "/images/banner.png",
        date: new Date(p.createdAt).toLocaleDateString("vi-VN"),
        category: "Blog",
        tags: ["Blog"],
        likes: "—",
        shares: "—",
      }));
  }, [allPosts, postId]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const intro = post?.content?.[0];
  const restContent = post?.content?.slice(1) || [];
  const tableOfContents = post?.content?.map((s) => s.heading) || [];

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header />

      {!post && (
        <main className="flex-1 px-6 py-10 text-white/60 text-sm">
          Không tìm thấy bài viết.
        </main>
      )}
      {post && (
        <>
          {/* ── BANNER ── */}
          <div
            className="relative w-full overflow-hidden"
            style={{ height: "clamp(180px, 35vw, 380px)" }}
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          </div>

          {/* ── TITLE ── */}
          <div className="bg-black pt-6 pb-10 px-6 flex flex-col items-center">
            <div className="relative w-full flex flex-col items-center py-6 sm:py-8">
              <div className="absolute top-0 left-6 sm:left-10 md:left-16 pointer-events-none">
                <SparkleIcon className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24" />
              </div>
              <div className="absolute top-0 right-6 sm:right-10 md:right-16 pointer-events-none">
                <RightSparkleIcon className="h-14 sm:h-18 md:h-22 w-auto" />
              </div>
              <h1
                className="text-white text-center uppercase leading-none w-full px-20 sm:px-28 md:px-36"
                style={{
                  fontFamily:
                    "'SVN-Redzone', 'Arial Black', 'Impact', sans-serif",
                  fontSize: "clamp(24px, 3.5vw, 44px)",
                  letterSpacing: "-0.02em",
                }}
              >
                {post.title}
              </h1>
            </div>
          </div>

          {/* ── 4 ZONES bên trong 1 border grid + stars ── */}
          <main className="flex-1 w-full pb-12">
            {/* Wrapper: border ngoài + relative để đặt ngôi sao 4 góc */}
            <div className="relative border border-white/25 flex flex-col lg:flex-row w-full overflow-visible">
              {/* ═══ LEFT COLUMN (60% on lg) ═══ */}
              <div
                className="relative w-full min-w-0 flex flex-col border-b lg:border-b-0 border-r-0 lg:border-r border-white/25 overflow-visible"
                style={{ flex: "1 1 60%" }}
              >
                {/* ★ T-top: border-r gặp cạnh trên */}
                <S
                  style={{
                    top: 0,
                    right: 0,
                    transform: "translate(50%, -50%)",
                  }}
                />
                {/* ★ T-bottom: border-r gặp cạnh dưới */}
                <S
                  style={{
                    bottom: 0,
                    right: 0,
                    transform: "translate(50%, 50%)",
                  }}
                />

                {/* Zone 1: Introduction */}
                <div className="relative p-8 lg:px-14 lg:py-10 border-b border-white/25 overflow-visible">
                  {/* ★ Intersection: border-r gặp border-b */}
                  <S
                    style={{
                      bottom: 0,
                      right: 0,
                      transform: "translate(50%, 50%)",
                    }}
                  />
                  {intro && (
                    <>
                      <h2
                        className="text-white font-black text-base uppercase mb-3 tracking-wide"
                        style={{
                          fontFamily: "'Arial Black', Impact, sans-serif",
                        }}
                      >
                        {intro.heading}
                      </h2>
                      {intro.body.split("\n\n").map((para, pIdx) => (
                        <p
                          key={pIdx}
                          className="text-white/60 text-sm leading-relaxed mb-3"
                        >
                          {para}
                        </p>
                      ))}
                    </>
                  )}
                </div>

                {/* Zone 3: Nội dung chính (truncated + Bottom Sheet) */}
                <div className="flex-1 p-8 lg:px-14 lg:py-10 flex flex-col">
                  <div
                    className="overflow-hidden relative"
                    style={{ maxHeight: "340px" }}
                  >
                    {restContent.map((section, idx) => (
                      <div key={idx} className="mb-7">
                        <h2
                          className="text-white font-black text-base uppercase mb-3 tracking-wide"
                          style={{
                            fontFamily: "'Arial Black', Impact, sans-serif",
                          }}
                        >
                          {section.heading}
                        </h2>
                        {section.body.split("\n\n").map((para, pIdx) => (
                          <p
                            key={pIdx}
                            className="text-white/70 text-base leading-loose mb-4"
                          >
                            {para}
                          </p>
                        ))}
                      </div>
                    ))}
                    {/* fade bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent pointer-events-none" />
                  </div>
                  <button
                    onClick={() => setIsSheetOpen(true)}
                    className="mt-6 flex items-center gap-2 border border-white/30 text-white text-xs font-semibold px-5 py-2.5 hover:bg-white/10 transition-colors w-fit"
                  >
                    Read Full Blog
                    <img
                      src="/element/Icon nhỏ.png"
                      alt=""
                      className="w-3 h-3 object-contain"
                    />
                  </button>
                </div>
              </div>
              {/* end LEFT */}

              {/* ═══ RIGHT COLUMN (40% on lg) ═══ */}
              <div
                className="w-full flex-shrink-0 flex flex-col overflow-visible"
                style={{ flex: "1 1 40%" }}
              >
                {/* Zone 2: Stats */}
                <div className="relative p-6 lg:p-8 flex items-center justify-start border-b border-white/25 overflow-visible">
                  <div className="flex items-center gap-1 border border-white/25 px-5 py-2.5 rounded-full">
                    <button
                      onClick={() => setLiked((v) => !v)}
                      className="flex items-center gap-1.5 text-sm hover:opacity-80 transition-opacity cursor-pointer"
                    >
                      <span
                        className={liked ? "text-red-500" : "text-red-400/50"}
                      >
                        {liked ? "❤" : "♡"}
                      </span>
                      <span className="font-semibold text-white text-xs">
                        {post.likes}
                      </span>
                    </button>
                    <div className="w-px h-3 bg-white/25 mx-2" />
                    <button className="flex items-center gap-1.5 text-sm hover:opacity-80 transition-opacity cursor-pointer">
                      <span className="text-white/70">👁</span>
                      <span className="font-semibold text-white text-xs">
                        {post.comments}
                      </span>
                    </button>
                    <div className="w-px h-3 bg-white/25 mx-2" />
                    <button
                      onClick={handleShare}
                      className="flex items-center gap-1.5 text-sm hover:opacity-80 transition-opacity cursor-pointer"
                      title={copied ? "Copied!" : "Copy link"}
                    >
                      <span
                        className={copied ? "text-green-400" : "text-white/70"}
                      >
                        {copied ? "✓" : "↑"}
                      </span>
                      <span className="font-semibold text-white text-xs">
                        {post.shares}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Zone 4: Meta + TOC + Tags */}
                <div className="flex-1 p-6 lg:p-8 flex flex-col gap-6">
                  {/* Meta grid */}
                  <div className="grid grid-cols-2 gap-x-8 gap-y-6 border-b border-white/10 pb-6">
                    <div>
                      <p className="text-white/40 text-sm mb-1">
                        Publication Date
                      </p>
                      <p className="text-white text-base font-semibold">
                        {post.date}
                      </p>
                    </div>
                    <div>
                      <p className="text-white/40 text-sm mb-1">Category</p>
                      <p className="text-white text-base font-semibold">
                        {post.category}
                      </p>
                    </div>
                    <div>
                      <p className="text-white/40 text-sm mb-1">Reading Time</p>
                      <p className="text-white text-base font-semibold">
                        {post.readingTime}
                      </p>
                    </div>
                    <div>
                      <p className="text-white/40 text-sm mb-1">Author Name</p>
                      <p className="text-white text-base font-semibold">
                        {post.author}
                      </p>
                    </div>
                  </div>

                  {/* Table of Contents */}
                  <div className="bg-white/5 border border-white/10 p-4 w-fit">
                    <p
                      className="text-white font-bold text-sm mb-3"
                      style={{
                        fontFamily: "'Arial Black', Impact, sans-serif",
                      }}
                    >
                      Table of Contents
                    </p>
                    <ul className="space-y-2.5">
                      {tableOfContents.map((item, idx) => (
                        <li key={idx}>
                          <button
                            onClick={() => setIsSheetOpen(true)}
                            className="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors text-left"
                          >
                            <span className="text-white/30">•</span>
                            {item}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tags */}
                  {post.tags && (
                    <div className="flex gap-2 flex-wrap">
                      {post.tags.map((t) => (
                        <TagBadge key={t} tag={t} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {/* end RIGHT */}
            </div>
            {/* end border grid */}
          </main>

          {/* ── SIMILAR NEWS ── */}
          <section className="px-6 lg:px-16 pb-16 w-full">
            <StarDivider />
            <div className="flex items-center justify-between mt-6 mb-6">
              <h2
                className="text-white uppercase text-2xl sm:text-3xl md:text-4xl leading-none"
                style={{
                  fontFamily:
                    "'SVN-Redzone', 'Arial Black', 'Impact', sans-serif",
                }}
              >
                Similar News
              </h2>
              <Link
                to="/news"
                className="flex items-center gap-1.5 text-white/60 hover:text-white text-xs font-semibold transition-colors border border-white/20 px-3 py-1.5"
              >
                View All News
                <img
                  src="/element/Icon nhỏ.png"
                  alt=""
                  className="w-3 h-3 object-contain"
                />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {similarPosts.map((p) => (
                <Link
                  key={p.id}
                  to={`/news/${p.id}`}
                  className="group flex flex-col"
                >
                  <div className="relative overflow-hidden mb-3">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="flex items-center gap-1 text-white/50 text-xs">
                      <span className="text-red-400">❤</span> {p.likes}
                    </span>
                    <span className="flex items-center gap-1 text-white/50 text-xs">
                      <span>↑</span> {p.shares}
                    </span>
                  </div>
                  <p className="text-white/40 text-[10px] mb-1 uppercase tracking-wide">
                    {p.category}
                  </p>
                  <h3 className="text-white font-bold text-sm leading-snug line-clamp-2 mb-3 group-hover:opacity-80">
                    {p.title}
                  </h3>
                  <span className="flex items-center gap-1.5 text-white text-xs font-semibold border border-white/20 px-3 py-1.5 w-fit hover:bg-white/10 transition-colors">
                    Read More
                    <img
                      src="/element/Icon nhỏ.png"
                      alt=""
                      className="w-3 h-3 object-contain"
                    />
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <Footer />

          {/* ── BOTTOM SHEET: Full content ── */}
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/70 z-50 transition-opacity duration-300"
            style={{
              opacity: isSheetOpen ? 1 : 0,
              pointerEvents: isSheetOpen ? "auto" : "none",
            }}
            onClick={() => setIsSheetOpen(false)}
          />

          {/* Sheet panel */}
          <div
            className="fixed bottom-0 left-0 right-0 z-50 flex flex-col"
            style={{
              height: "78vh",
              background: "#0d0d0d",
              borderTop: "1px solid rgba(255,255,255,0.15)",
              transform: isSheetOpen ? "translateY(0)" : "translateY(100%)",
              transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            {/* Handle bar + header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 flex-shrink-0">
              <div className="flex flex-col">
                <div className="w-10 h-1 bg-white/20 rounded-full mb-3 mx-auto" />
                <h3
                  className="text-white font-black text-xs uppercase tracking-widest"
                  style={{ fontFamily: "'Arial Black', Impact, sans-serif" }}
                >
                  {post.title}
                </h3>
              </div>
              <button
                onClick={() => setIsSheetOpen(false)}
                className="text-white/50 hover:text-white transition-colors text-xl leading-none ml-4"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-6 py-6 lg:px-10">
              {post.content?.map((section, idx) => (
                <div key={idx} id={`sheet-section-${idx}`} className="mb-8">
                  <h2
                    className="text-white font-black text-base uppercase mb-3 tracking-wide"
                    style={{ fontFamily: "'Arial Black', Impact, sans-serif" }}
                  >
                    {section.heading}
                  </h2>
                  {section.body.split("\n\n").map((para, pIdx) => (
                    <p
                      key={pIdx}
                      className="text-white/70 text-base leading-loose mb-4"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NewsDetail;
