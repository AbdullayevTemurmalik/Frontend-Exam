import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
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
import products from "../../mock";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems = useSelector((state) => state.basket.value);
  const wishlistItems = useSelector((state) => state.like.value);

  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("English");

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const userStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(userStatus);
    setIsSideMenuOpen(false);
    setIsUserMenuOpen(false);
    setSearchTerm("");
  }, [location]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProducts([]);
    } else {
      const results = products.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredProducts(results);
    }
  }, [searchTerm]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userData");
    setIsLoggedIn(false);
    navigate("/register");
  };

  return (
    <header className="site-header">
      <div className="top-bar">
        <div className="container top-bar-content">
          <div className="promo-section">
            <p>
              Summer Sale - OFF 50%!{" "}
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
                {["English", "Oʻzbekcha", "Русский"].map((lang) => (
                  <li
                    key={lang}
                    onClick={() => {
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

          <div className="header-action-wrap">
            <div className="search-wrap">
              <input
                type="text"
                placeholder="What are you looking for?"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search size={20} />

              {filteredProducts.length > 0 && (
                <div className="search-results-dropdown">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="search-item"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      <img src={product.image} alt={product.name} />
                      <div className="search-item-info">
                        <span className="search-item-name">{product.name}</span>
                        <span className="search-item-price">
                          ${product.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="product-action">
              <Link to="/like" className="icon-badge-wrapper">
                <Heart size={24} />
                {wishlistItems.length > 0 && (
                  <span className="badge">{wishlistItems.length}</span>
                )}
              </Link>
              <Link to="/basket" className="icon-badge-wrapper">
                <ShoppingCart size={24} />
                {cartItems.length > 0 && (
                  <span className="badge">{cartItems.length}</span>
                )}
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
                      <button
                        className="close-user-menu"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <X size={20} /> Close Menu
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
