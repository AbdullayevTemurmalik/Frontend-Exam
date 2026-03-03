import "./Header.css";
import {
  BiArrowToLeft,
  BiBasket,
  BiHeart,
  BiSearch,
  BiUser,
  BiLogOut,
  BiShoppingBag,
  BiXCircle,
  BiStar,
} from "react-icons/bi";
import { MdMenu, MdLocationOn } from "react-icons/md";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Header = ({ cartCount = 0, wishlistCount = 0 }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(userStatus);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userData");
    setIsLoggedIn(false);
    setIsUserMenuOpen(false);
    navigate("/register");
  };

  return (
    <header className="site-header">
      <div className="top-bar">
        <nav className="section_1">
          <div className="others">
            <div className="lang-switcher">
              <div className="lan">
                <img src="https://flagcdn.com/w20/uz.png" alt="uzb" />
                <p>Oʻzbekcha</p>
              </div>
              <div className="lan language">
                <img src="https://flagcdn.com/w20/ru.png" alt="rus" />
                <p>Русский</p>
              </div>
              <div className="lan language">
                <img src="https://flagcdn.com/w20/gb.png" alt="eng" />
                <p>English</p>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <div className="container">
        <div className="header-wrap">
          <div className="logo-wrap">
            <h1
              onClick={() => navigate("/")}
              className="logo"
              style={{ cursor: "pointer" }}
            >
              Exclusive
            </h1>
            <span
              onClick={() => setIsSideMenuOpen(true)}
              className={!isSideMenuOpen ? "menu" : "disappear"}
            >
              <MdMenu />
            </span>
          </div>

          <nav className={!isSideMenuOpen ? "header-navigation" : "side-menu"}>
            <span
              onClick={() => setIsSideMenuOpen(false)}
              className={isSideMenuOpen ? "exit" : "disappear"}
            >
              <BiArrowToLeft />
            </span>
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
              <input type="text" placeholder="What are you looking for?" />
              <span>
                <BiSearch />
              </span>
            </div>

            <div className="product-action">
              <Link to="/like" className="icon-badge-wrapper">
                <span className="heart">
                  <BiHeart />
                </span>
                {wishlistCount > 0 && (
                  <span className="badge">{wishlistCount}</span>
                )}
              </Link>

              <Link to="/basket" className="icon-badge-wrapper">
                <span className="basket">
                  <BiBasket />
                </span>
                {cartCount > 0 && <span className="badge">{cartCount}</span>}
              </Link>

              {isLoggedIn && (
                <div className="user-dropdown-container">
                  <span
                    className="user"
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    style={{
                      backgroundColor: isUserMenuOpen
                        ? "#db4444"
                        : "transparent",
                      color: isUserMenuOpen ? "white" : "black",
                    }}
                  >
                    <BiUser />
                  </span>

                  {isUserMenuOpen && (
                    <div className="user-dropdown-menu">
                      <Link
                        to="/account"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <BiUser /> Manage My Account
                      </Link>
                      <Link
                        to="/orders"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <BiShoppingBag /> My Order
                      </Link>
                      <Link
                        to="/cancellations"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <BiXCircle /> My Cancellations
                      </Link>
                      <Link
                        to="/reviews"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <BiStar /> My Reviews
                      </Link>
                      <button onClick={handleLogout} className="logout-btn">
                        <BiLogOut /> Logout
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
