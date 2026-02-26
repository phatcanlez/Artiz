import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search query:", searchQuery);
  };

  const handleAccountClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isAuthenticated) {
      navigate("/account");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      {/* Green announcement bar */}
      <div className="w-full bg-[#44FF00] py-2 sm:py-3 flex items-center justify-center gap-2 sm:gap-4 text-white px-2">
        <button
          type="button"
          className="p-1 hover:opacity-80 transition-opacity touch-manipulation"
          aria-label="Previous message"
        >
          <ChevronLeft size={20} className="sm:w-6 sm:h-6" strokeWidth={2.5} />
        </button>
        <span className="text-xs sm:text-sm md:text-base font-medium tracking-wide uppercase truncate max-w-[70vw] sm:max-w-none">
          FREE SHIP NATIONWIDE
        </span>
        <button
          type="button"
          className="p-1 hover:opacity-80 transition-opacity touch-manipulation"
          aria-label="Next message"
        >
          <ChevronRight size={20} className="sm:w-6 sm:h-6" strokeWidth={2.5} />
        </button>
      </div>
      <header className="w-full bg-white">
        <div className="max-w-[1240px] mx-auto px-3 sm:px-6 md:px-14 lg:px-20 pt-2 pb-3 sm:pb-[21px] flex flex-col gap-2 md:grid md:grid-cols-[1fr_auto_1fr] md:items-center">
          {/* Logo center on mobile, middle on desktop */}
          <Link
            to="/"
            className="flex justify-center md:justify-center order-1 md:order-2"
          >
            <img
              src="/images/logo.png"
              className="aspect-[1.78] object-contain w-[120px] sm:w-[150px] md:w-[180px] shrink-0 max-w-full hover:opacity-80 transition-opacity cursor-pointer"
              alt="Company logo"
            />
          </Link>

          {/* Nav */}
          <nav className="relative flex items-center justify-center md:justify-start gap-3 sm:gap-4 md:gap-[33px] text-sm sm:text-base md:text-xl text-black font-medium order-2 md:order-1 flex-wrap">
            <Link
              to="/about"
              className="hover:opacity-80 transition-opacity whitespace-nowrap"
            >
              About Us
            </Link>
            <a
              href="/products"
              className="hover:opacity-80 transition-opacity whitespace-nowrap"
            >
              Shop
            </a>
            <Link
              to="/news"
              className="hover:opacity-80 transition-opacity whitespace-nowrap"
            >
              News
            </Link>
            <Link
              to="/contact"
              className="hover:opacity-80 transition-opacity whitespace-nowrap"
            >
              Contact
            </Link>
          </nav>

          {/* Search + actions */}
          <div className="relative flex items-center justify-center md:justify-end gap-2 sm:gap-3 md:gap-4 order-3">
            <form
              onSubmit={handleSearchSubmit}
              className="bg-[rgba(89,89,89,1)] flex text-sm sm:text-base text-[rgba(207,205,205,1)] font-normal px-3 sm:px-5 md:px-6 py-2 sm:py-[10px] md:py-[18px] rounded-[33px] min-w-[140px]"
            >
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm"
                className="bg-transparent outline-none placeholder-[rgba(207,205,205,1)] w-24 sm:w-28 md:w-32 min-w-0"
                aria-label="Search products"
              />
            </form>
            <Link
              to="/cart"
              className="hover:opacity-80 transition-opacity relative touch-manipulation inline-flex"
              aria-label="Shopping cart"
            >
              <svg
                width="28"
                height="28"
                className="sm:w-9 sm:h-9 text-black"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V17C17 18.1 17.9 19 19 19C20.1 19 21 18.1 21 17V13M9 19.5C9.8 19.5 10.5 20.2 10.5 21C10.5 21.8 9.8 22.5 9 22.5C8.2 22.5 7.5 21.8 7.5 21C7.5 20.2 8.2 19.5 9 19.5ZM20 19.5C20.8 19.5 21.5 20.2 21.5 21C21.5 21.8 20.8 22.5 20 22.5C19.2 22.5 18.5 21.8 18.5 21C18.5 20.2 19.2 19.5 20 19.5Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <button
              onClick={handleAccountClick}
              className="hover:opacity-80 transition-opacity touch-manipulation p-1"
              aria-label="User account"
            >
              <img
                src="https://api.builder.io/api/v1/image/assets/7c252285b2084f26866cf7cf5b5da26b/803e0dc27e3fd13db1c7a0ee9b3c237a628cd5c7?placeholderIfAbsent=true"
                className="aspect-[1] object-contain w-8 h-8 sm:w-9 sm:h-9"
                alt="User account icon"
              />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
