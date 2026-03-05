import "./Header.css";
import {
  ArrowLeft,
  ShoppingCart,
  Heart,
  Search,
  User,
  LogOut,
  ShoppingBag,
  XCircle,
  Star,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const cartItems = useSelector((state) => state.basket.value);
  const wishlistItems = useSelector((state) => state.like.value);

  const cartCount = cartItems.length;
  const wishlistCount = wishlistItems.length;

  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("English");

  useEffect(() => {
    const userStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(userStatus);
    setIsSideMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userData");
    setIsLoggedIn(false);
    setIsUserMenuOpen(false);
    navigate("/register");
  };

  const languages = ["English", "Oʻzbekcha", "Русский"];

  return (
    <header className="site-header">
      <div className="top-bar">
        <div className="container top-bar-content">
          <div className="promo-section">
            <p>
              Summer Sale For All Swim Suits And Free Express Delivery - OFF
              50%!
              <Link to="/shop" className="shop-now">
                ShopNow
              </Link>
            </p>
          </div>
          <div
            className="lang-dropdown"
            onClick={() => setIsLangOpen(!isLangOpen)}
          >
            <div className="selected-lang">
              {currentLang} <ChevronDown size={16} />
            </div>
            {isLangOpen && (
              <ul className="lang-list">
                {languages.map((lang) => (
                  <li
                    key={lang}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentLang(lang);
                      setIsLangOpen(false);
                    }}
                  >
                    {lang}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className="container">
        <div className="header-wrap">
          <div className="logo-wrap">
            <span
              className="mobile-menu-trigger"
              onClick={() => setIsSideMenuOpen(true)}
            >
              <Menu size={28} />
            </span>
            <h1 onClick={() => navigate("/")} className="logo">
              Exclusive
            </h1>
          </div>

          <nav className="header-navigation">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              {!isLoggedIn && (
                <li>
                  <Link to="/register">Sign Up</Link>
                </li>
              )}
            </ul>
          </nav>

          <div className={`side-menu ${isSideMenuOpen ? "open" : ""}`}>
            <div className="side-menu-header">
              <span onClick={() => setIsSideMenuOpen(false)}>
                <X size={28} />
              </span>
            </div>
            <ul className="side-menu-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              {!isLoggedIn && (
                <li>
                  <Link to="/register">Sign Up</Link>
                </li>
              )}
            </ul>
          </div>
          {isSideMenuOpen && (
            <div
              className="menu-overlay"
              onClick={() => setIsSideMenuOpen(false)}
            ></div>
          )}

          <div className="header-action-wrap">
            <div className="search-wrap">
              <input type="text" placeholder="What are you looking for?" />
              <Search size={20} />
            </div>

            <div className="product-action">
              <Link to="/like" className="icon-badge-wrapper">
                <Heart size={24} />
                {wishlistCount > 0 && (
                  <span className="badge">{wishlistCount}</span>
                )}
              </Link>

              <Link to="/basket" className="icon-badge-wrapper">
                <ShoppingCart size={24} />
                {cartCount > 0 && <span className="badge">{cartCount}</span>}
              </Link>

              {isLoggedIn && (
                <div className="user-dropdown-container">
                  <span
                    className="user-btn"
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    style={{
                      backgroundColor: isUserMenuOpen
                        ? "#db4444"
                        : "transparent",
                      color: isUserMenuOpen ? "white" : "black",
                    }}
                  >
                    <User size={24} />
                  </span>
                  {isUserMenuOpen && (
                    <div className="user-dropdown-menu">
                      <Link
                        to="/account"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <User size={20} /> Manage Account
                      </Link>
                      <Link
                        to="/orders"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <ShoppingBag size={20} /> My Order
                      </Link>
                      <Link
                        to="/cancellations"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <XCircle size={20} /> Cancellations
                      </Link>
                      <Link
                        to="/reviews"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Star size={20} /> My Reviews
                      </Link>
                      <button onClick={handleLogout} className="logout-btn">
                        <LogOut size={20} /> Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
