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
      <div className="w-full bg-[#44FF00] py-3 flex items-center justify-center gap-4 text-white">
        <button
          type="button"
          className="p-1 hover:opacity-80 transition-opacity"
          aria-label="Previous message"
        >
          <ChevronLeft size={24} strokeWidth={2.5} />
        </button>
        <span className="text-sm md:text-base font-medium tracking-wide uppercase">
          FREE SHIP NATIONWIDE
        </span>
        <button
          type="button"
          className="p-1 hover:opacity-80 transition-opacity"
          aria-label="Next message"
        >
          <ChevronRight size={24} strokeWidth={2.5} />
        </button>
      </div>
      <header className="relative w-full min-h-[145px] grid grid-cols-[1fr_auto_1fr] items-center gap-5 pt-2 pb-[21px] px-20 max-md:flex max-md:flex-col max-md:px-5 bg-white">
      <nav className="relative flex items-center gap-[33px] text-xl text-black font-medium justify-self-start max-md:w-full max-md:justify-center max-md:flex-wrap">
        <Link to="/about" className="hover:opacity-80 transition-opacity">
          About Us
        </Link>
        <a href="/products" className="hover:opacity-80 transition-opacity">
          Shop
        </a>
        <Link to="/news" className="hover:opacity-80 transition-opacity">
          News
        </Link>
        <Link to="/contact" className="hover:opacity-80 transition-opacity">
          Contact
        </Link>
      </nav>
      <Link to="/" className="relative justify-self-center">
        <img
          src="/images/logo.png"
          className="aspect-[1.78] object-contain w-[180px] shrink-0 max-w-full hover:opacity-80 transition-opacity cursor-pointer"
          alt="Company logo"
        />
      </Link>
      <div className="relative flex items-center gap-4 justify-self-end max-md:justify-center">
        <form
          onSubmit={handleSearchSubmit}
          className="bg-[rgba(89,89,89,1)] flex text-base text-[rgba(207,205,205,1)] font-normal px-6 py-[18px] rounded-[33px] max-md:px-5"
        >
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm"
            className="bg-transparent outline-none placeholder-[rgba(207,205,205,1)] w-24"
            aria-label="Search products"
          />
        </form>
        <Link
          to="/cart"
          className="hover:opacity-80 transition-opacity relative"
          aria-label="Shopping cart"
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-black"
          >
            <path
              d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V17C17 18.1 17.9 19 19 19C20.1 19 21 18.1 21 17V13M9 19.5C9.8 19.5 10.5 20.2 10.5 21C10.5 21.8 9.8 22.5 9 22.5C8.2 22.5 7.5 21.8 7.5 21C7.5 20.2 8.2 19.5 9 19.5ZM20 19.5C20.8 19.5 21.5 20.2 21.5 21C21.5 21.8 20.8 22.5 20 22.5C19.2 22.5 18.5 21.8 18.5 21C18.5 20.2 19.2 19.5 20 19.5Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {/* Cart badge - optional, show when items > 0 */}
          {/* Uncomment and add logic to show badge when cart has items */}
          {/* <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
            0
          </span> */}
        </Link>
        <button
          onClick={handleAccountClick}
          className="hover:opacity-80 transition-opacity"
          aria-label="User account"
        >
          <img
            src="https://api.builder.io/api/v1/image/assets/7c252285b2084f26866cf7cf5b5da26b/803e0dc27e3fd13db1c7a0ee9b3c237a628cd5c7?placeholderIfAbsent=true"
            className="aspect-[1] object-contain w-9"
            alt="User account icon"
          />
        </button>
      </div>
    </header>
    </>
  );
};

export default Header;
