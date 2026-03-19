import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";

const navLinks = [
  { to: "/about", label: "Về chúng tôi" },
  { to: "/products", label: "Cửa hàng" },
  { to: "/news", label: "Tin tức" },
  { to: "/contact", label: "Liên hệ" },
];

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, isAdmin } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  // Đồng bộ ô tìm kiếm với query khi vào /products?search=...
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("search");
    if (location.pathname === "/products" && q != null) {
      setSearchQuery(q);
    }
  }, [location.pathname, location.search]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    navigate(q ? `/products?search=${encodeURIComponent(q)}` : "/products");
    setMenuOpen(false);
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
    <header className="w-full bg-white border-b border-black relative z-50">
      <div className="w-full px-6 md:px-10 lg:px-16 py-4 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        {/* LEFT: Nav (desktop) / Hamburger (mobile) */}
        <div className="flex items-center">
          {/* Hamburger — mobile only */}
          <button
            className="flex flex-col gap-[5px] md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-[2px] bg-black transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`}
            />
            <span
              className={`block w-6 h-[2px] bg-black transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-6 h-[2px] bg-black transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
            />
          </button>

          {/* Nav links — desktop only */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-8 text-base lg:text-lg font-medium text-black">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="hover:opacity-60 transition-opacity whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
            {isAdmin && (
              <Link
                to="/admin"
                className="hover:opacity-60 transition-opacity whitespace-nowrap text-black font-medium"
              >
                Quản trị
              </Link>
            )}
          </nav>
        </div>

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
          {/* Search bar — hidden on mobile */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden sm:flex bg-black items-center gap-2 text-[#CFCDCD] font-normal px-5 py-3 rounded-full"
          >
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm"
              className="bg-transparent outline-none placeholder-[#CFCDCD] w-28 lg:w-36 text-sm"
              aria-label="Search products"
            />
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

          {/* Account icon */}
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

          {/* Cart icon */}
          <Link
            to="/cart"
            id="cart-icon"
            className="hover:opacity-60 transition-opacity inline-block relative"
            aria-label="Shopping cart"
          >
            <img
              src="/icon/Shoping.svg"
              className="w-9 h-9 object-contain"
              alt="Cart"
            />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-black text-white text-xs font-bold px-1">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile dropdown nav */}
      {menuOpen && (
        <nav className="md:hidden bg-white border-t border-black flex flex-col">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className="px-6 py-4 text-black font-medium text-base border-b border-black/10 hover:bg-black/5 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          {isAdmin && (
            <Link
              to="/admin"
              onClick={() => setMenuOpen(false)}
              className="px-6 py-4 text-black font-medium text-base border-b border-black/10 hover:bg-black/5 transition-colors"
            >
              Quản trị
            </Link>
          )}
          {/* Search on mobile */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center gap-2 px-6 py-4"
          >
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm..."
              className="flex-1 bg-black/5 rounded-full px-4 py-2 text-sm outline-none"
            />
            <button type="submit" aria-label="Search">
              <img
                src="/icon/Duyệt mẫu.svg"
                className="w-5 h-5 object-contain"
                alt="Search"
              />
            </button>
          </form>
        </nav>
      )}
    </header>
  );
};

export default Header;
