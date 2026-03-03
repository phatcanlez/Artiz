import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StarDivider from "@/components/ui/StarDivider";
import { SparkleIcon } from "@/components/ui/SparkleIcon";
import { RightSparkleIcon } from "@/components/ui/RightSparkleIcon";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
  tags?: string[];
  author?: string;
  readingTime?: string;
  likes?: string;
  comments?: string;
  shares?: string;
  content?: Section[];
}

interface Section {
  heading: string;
  body: string;
}

const allPosts: BlogPost[] = [
  {
    id: 1,
    title: "How We Create 3D Printed",
    excerpt:
      "Artificial Intelligence (AI) has emerged as a transformative force in the healthcare industry, reshaping patient care, diagnostics, and research.",
    image: "/images/col1.jpg",
    date: "October 15, 2023",
    category: "Healthcare",
    tags: ["Design"],
    author: "Dr. Emily Walker",
    readingTime: "19 Min",
    likes: "24.5k",
    comments: "12k",
    shares: "20k",
    content: [
      {
        heading: "Introduction",
        body: "Artificial Intelligence (AI) has emerged as a transformative force in the healthcare industry, reshaping patient care, diagnostics, and research. In this blog post, we explore the profound impact of AI in healthcare, from revolutionizing diagnostic accuracy to enhancing patient outcomes.",
      },
      {
        heading: "Artificial Intelligence (AI)",
        body: "Artificial Intelligence (AI) has permeated virtually every aspect of our lives, and healthcare is no exception. The integration of AI in healthcare is ushering in a new era of medical practice, where machines complement the capabilities of healthcare professionals, ultimately improving patient outcomes and the efficiency of the healthcare system.\n\nArtificial Intelligence (AI) has permeated virtually every aspect of our lives, and healthcare is no exception. The integration of AI in healthcare is ushering in a new era of medical practice, where machines complement the capabilities of healthcare.",
      },
      {
        heading: "Predictive Analytics and Disease Prevention",
        body: "One of the most prominent applications of AI in healthcare is in diagnostic imaging. AI algorithms have demonstrated remarkable proficiency in interpreting medical images, such as X-rays, MRIs, and CT scans.",
      },
      {
        heading: "Drug Discovery and Research",
        body: "The process of drug discovery is notoriously lengthy, costly, and fraught with uncertainty. AI is revolutionizing this process by enabling researchers to sift through vast datasets.",
      },
      {
        heading: "AI in Telemedicine",
        body: "Telemedicine has gained significant traction, especially in the wake of global health challenges. AI enhances telemedicine by providing decision support tools for remote diagnosis.",
      },
      {
        heading: "Ethical Considerations",
        body: "As AI becomes more deeply embedded in healthcare, a host of ethical considerations come to the forefront. Issues such as patient privacy, data security, and algorithmic bias must be addressed.",
      },
      {
        heading: "The Future of AI in Healthcare",
        body: "The trajectory of AI in healthcare points to a future where intelligent systems play an even more central role in patient care, administrative functions, and medical research.",
      },
      {
        heading: "Conclusion",
        body: "The integration of AI in healthcare represents a paradigm shift, offering unprecedented opportunities to improve patient outcomes, streamline operations, and advance medical knowledge.",
      },
    ],
  },
  {
    id: 2,
    title: "Building your API Stack",
    excerpt:
      "The rise of RESTful APIs has been met by a new era in tooling for creating, testing, and managing.",
    image: "/images/col2.jpg",
    date: "October 20, 2023",
    category: "Technology",
    tags: ["Design"],
    author: "John Smith",
    readingTime: "12 Min",
    likes: "18k",
    comments: "8k",
    shares: "15k",
    content: [
      {
        heading: "Introduction",
        body: "The rise of RESTful APIs has been met by a new era in tooling for creating, testing, and managing APIs efficiently at scale.",
      },
    ],
  },
  {
    id: 3,
    title: "Grid system for better Design User Interface",
    excerpt:
      "A grid system is a design tool used to arrange content on a webpage.",
    image: "/images/airmax.jpg",
    date: "October 25, 2023",
    category: "Design",
    tags: ["Design"],
    author: "Anna Lee",
    readingTime: "8 Min",
    likes: "10k",
    comments: "5k",
    shares: "9k",
    content: [
      {
        heading: "Introduction",
        body: "A grid system is a design tool used to arrange content on a webpage. It is a series of vertical and horizontal lines that create a matrix of intersecting points.",
      },
    ],
  },
  {
    id: 4,
    title: "UX review presentations",
    excerpt:
      "How do you create compelling presentations that wow your colleagues and impress your managers?",
    image: "/images/banner.png",
    date: "November 1, 2023",
    category: "Design",
    tags: ["Design"],
    author: "Mike Chen",
    readingTime: "10 Min",
    likes: "22k",
    comments: "9k",
    shares: "17k",
    content: [
      {
        heading: "Introduction",
        body: "How do you create compelling presentations that wow your colleagues and impress your managers? In this guide we look at the key elements of a great UX review presentation.",
      },
    ],
  },
  {
    id: 5,
    title: "Climate Endgame: Exploring catastrophic climate change scenarios",
    excerpt:
      "Exploring worst-case climate scenarios and what they mean for the future of our planet.",
    image: "/images/col3.jpg",
    date: "November 5, 2023",
    category: "Environment",
    tags: ["Design"],
    author: "Sarah Green",
    readingTime: "15 Min",
    likes: "30k",
    comments: "14k",
    shares: "25k",
    content: [
      {
        heading: "Introduction",
        body: "Exploring worst-case climate scenarios and what they mean for the future of our planet requires examining complex systems and interdependencies.",
      },
    ],
  },
  {
    id: 6,
    title: "Bill Walsh leadership lessons",
    excerpt:
      "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?",
    image: "/images/col1.jpg",
    date: "November 10, 2023",
    category: "Leadership",
    tags: ["Leadership", "Management", "Presentation"],
    author: "Tom Brady",
    readingTime: "11 Min",
    likes: "15k",
    comments: "7k",
    shares: "13k",
    content: [
      {
        heading: "Introduction",
        body: "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty? Bill Walsh's leadership lessons remain incredibly relevant today.",
      },
    ],
  },
  {
    id: 7,
    title: "PM mental models",
    excerpt:
      "Mental models are simple expressions of complex processes or relationships.",
    image: "/images/col2.jpg",
    date: "November 15, 2023",
    category: "Product",
    tags: ["Product", "Research", "Frameworks"],
    author: "Lisa Park",
    readingTime: "9 Min",
    likes: "11k",
    comments: "4k",
    shares: "8k",
    content: [
      {
        heading: "Introduction",
        body: "Mental models are simple expressions of complex processes or relationships. For product managers, having a strong set of mental models is essential.",
      },
    ],
  },
  {
    id: 8,
    title: "What is Wireframing?",
    excerpt:
      "Introduction to Wireframing and its Principles. Learn from the best in the industry.",
    image: "/images/col3.jpg",
    date: "November 20, 2023",
    category: "Design",
    tags: ["Design", "Research", "Presentation"],
    author: "Chris Design",
    readingTime: "7 Min",
    likes: "9k",
    comments: "3k",
    shares: "6k",
    content: [
      {
        heading: "Introduction",
        body: "Introduction to Wireframing and its Principles. A wireframe is a visual guide that represents the skeletal framework of a website.",
      },
    ],
  },
  {
    id: 9,
    title: "How collaboration makes us better designers",
    excerpt:
      "Collaboration can make our teams stronger, and our individual designs better.",
    image: "/images/airmax.jpg",
    date: "November 25, 2023",
    category: "Design",
    tags: ["Design", "Research", "Presentation"],
    author: "Emma Wilson",
    readingTime: "6 Min",
    likes: "13k",
    comments: "6k",
    shares: "10k",
    content: [
      {
        heading: "Introduction",
        body: "Collaboration can make our teams stronger, and our individual designs better. When designers work together, the sum is greater than its parts.",
      },
    ],
  },
  {
    id: 10,
    title: "Our top 10 Javascript frameworks to use",
    excerpt:
      "JavaScript frameworks make development easy with extensive features and functionalities.",
    image: "/images/airpod.jpg",
    date: "December 1, 2023",
    category: "Software Development",
    tags: ["Software Development", "Tools", "SaaS"],
    author: "Dev Master",
    readingTime: "13 Min",
    likes: "20k",
    comments: "11k",
    shares: "18k",
    content: [
      {
        heading: "Introduction",
        body: "JavaScript frameworks make development easy with extensive features and functionalities, allowing you to build complex applications faster.",
      },
    ],
  },
  {
    id: 11,
    title: "Podcast: Creating a better CX Community",
    excerpt:
      "Starting a community doesn't need to be complicated, but how do you get started?",
    image: "/images/lipstick.jpg",
    date: "December 5, 2023",
    category: "Customer Success",
    tags: ["Podcasts", "Customer Success", "Presentation"],
    author: "Alex Rivera",
    readingTime: "14 Min",
    likes: "17k",
    comments: "8k",
    shares: "14k",
    content: [
      {
        heading: "Introduction",
        body: "Starting a community doesn't need to be complicated, but how do you get started? In this podcast recap, we cover the key steps.",
      },
    ],
  },
  {
    id: 12,
    title: "UX review presentations",
    excerpt:
      "How do you create compelling presentations that wow your colleagues and impress your managers?",
    image: "/images/iphone.jpg",
    date: "December 10, 2023",
    category: "Design",
    tags: ["Design"],
    author: "Mike Chen",
    readingTime: "10 Min",
    likes: "22k",
    comments: "9k",
    shares: "17k",
    content: [
      {
        heading: "Introduction",
        body: "How do you create compelling presentations that wow your colleagues and impress your managers?",
      },
    ],
  },
];

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
  const postId = parseInt(id || "1");
  const post = allPosts.find((p) => p.id === postId) || allPosts[0];
  const similarPosts = allPosts.filter((p) => p.id !== postId).slice(0, 3);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const intro = post.content?.[0];
  const restContent = post.content?.slice(1) || [];
  const tableOfContents = post.content?.map((s) => s.heading) || [];

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header />

      {/* ── BANNER ── */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: "380px" }}
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
              fontFamily: "'SVN-Redzone', 'Arial Black', 'Impact', sans-serif",
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
          {/* ═══ LEFT COLUMN (60%) ═══ */}
          <div
            className="relative flex-1 min-w-0 flex flex-col border-r border-white/25 overflow-visible"
            style={{ flex: "0 0 60%" }}
          >
            {/* ★ T-top: border-r gặp cạnh trên */}
            <S
              style={{ top: 0, right: 0, transform: "translate(50%, -50%)" }}
            />
            {/* ★ T-bottom: border-r gặp cạnh dưới */}
            <S
              style={{ bottom: 0, right: 0, transform: "translate(50%, 50%)" }}
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
                    style={{ fontFamily: "'Arial Black', Impact, sans-serif" }}
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

          {/* ═══ RIGHT COLUMN (40%) ═══ */}
          <div
            className="flex-shrink-0 flex flex-col overflow-visible"
            style={{ flex: "0 0 40%" }}
          >
            {/* Zone 2: Stats */}
            <div className="relative p-6 lg:p-8 flex items-center justify-start border-b border-white/25 overflow-visible">
              <div className="flex items-center gap-1 border border-white/25 px-5 py-2.5 rounded-full">
                <button
                  onClick={() => setLiked((v) => !v)}
                  className="flex items-center gap-1.5 text-sm hover:opacity-80 transition-opacity cursor-pointer"
                >
                  <span className={liked ? "text-red-500" : "text-red-400/50"}>{liked ? "❤" : "♡"}</span>
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
                  <span className={copied ? "text-green-400" : "text-white/70"}>{copied ? "✓" : "↑"}</span>
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
                  <p className="text-white/40 text-sm mb-1">Publication Date</p>
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
                  style={{ fontFamily: "'Arial Black', Impact, sans-serif" }}
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
            style={{ fontFamily: "'SVN-Redzone', 'Arial Black', 'Impact', sans-serif" }}
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
    </div>
  );
};

export default NewsDetail;
