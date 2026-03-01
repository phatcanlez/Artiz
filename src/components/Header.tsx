import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
    <header className="w-full bg-white border-b border-black">
      <div className="w-full px-6 md:px-10 lg:px-16 py-4 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        {/* LEFT: Nav */}
        <nav className="flex items-center gap-5 lg:gap-8 text-base lg:text-lg font-medium text-black">
          <Link
            to="/about"
            className="hover:opacity-60 transition-opacity whitespace-nowrap"
          >
            About Us
          </Link>
          <Link
            to="/scan-ai"
            className="hover:opacity-60 transition-opacity whitespace-nowrap"
          >
            Scan Ai
          </Link>
          <a
            href="/products"
            className="hover:opacity-60 transition-opacity whitespace-nowrap"
          >
            Shop
          </a>
          <Link
            to="/news"
            className="hover:opacity-60 transition-opacity whitespace-nowrap"
          >
            News
          </Link>
          <Link
            to="/contact"
            className="hover:opacity-60 transition-opacity whitespace-nowrap"
          >
            Contact
          </Link>
        </nav>

        {/* CENTER: Logo */}
        <Link to="/" className="flex justify-center">
          <img
            src="/images/logo.png"
            className="h-[90px] w-auto object-contain hover:opacity-80 transition-opacity"
            alt="Company logo"
          />
        </Link>

        {/* RIGHT: Search + Icons */}
        <div className="flex items-center justify-end gap-3 lg:gap-4">
          {/* Search bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="bg-black flex items-center gap-2 text-[#CFCDCD] font-normal px-5 py-3 rounded-full"
          >
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm"
              className="bg-transparent outline-none placeholder-[#CFCDCD] w-28 lg:w-36 text-sm"
              aria-label="Search products"
            />
            {/* Search icon */}
            <button
              type="submit"
              className="shrink-0 hover:opacity-70 transition-opacity"
              aria-label="Submit search"
            >
              <img
                src="/icon/Duyệt mẫu.svg"
                className="w-5 h-5 object-contain invert"
                alt="Search"
              />
            </button>
          </form>

          {/* Account icon (Avatar.svg) */}
          <button
            onClick={handleAccountClick}
            className="hover:opacity-60 transition-opacity touch-manipulation"
            aria-label="User account"
          >
            <img
              src="/icon/Avatar.svg"
              className="w-9 h-9 object-contain"
              alt="Account"
            />
          </button>

          {/* Cart icon (Shoping.svg) */}
          <Link
            to="/cart"
            className="hover:opacity-60 transition-opacity"
            aria-label="Shopping cart"
          >
            <img
              src="/icon/Shoping.svg"
              className="w-9 h-9 object-contain"
              alt="Cart"
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
