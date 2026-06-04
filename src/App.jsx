import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./page/home/Home";
import Registration from "./page/registration/Registration";
import NotFound from "./page/notFound/NotFound";
import About from "./page/about/About";
import Heart from "./page/heart/Heart";
import SinglePage from "./page/singlePage/SinglePage";
import Basket from "./page/basket/Basket";
import Contact from "./page/contact/Contact";
import Checkout from "./components/checkout/Checkout";
import { HelmetProvider } from "react-helmet-async";
import MyAccount from "./page/account/MyAccount";

export const sendState = createContext();
export const ThemeContext = createContext();

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [state, setState] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  const data = useSelector((item) => item.info.value);

  const toggleTheme = () => {
    setIsDarkTheme((prev) => {
      const newTheme = !prev;
      localStorage.setItem("theme", newTheme ? "dark" : "light");
      return newTheme;
    });
  };

  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkTheme]);

  useEffect(() => {
    const showRegistration = () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      if (!isLoggedIn && data.length < 1 && location.pathname !== "/register") {
        navigate("/register");
      }
    };

    const timer = setTimeout(() => {
      window.addEventListener("mousemove", showRegistration, { once: true });
    }, 4000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", showRegistration);
    };
  }, [data, location.pathname, navigate]);

  return (
    <>
      <HelmetProvider>
        <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
          <sendState.Provider value={{ state, setState }}>
            <div className="main-wrapper">
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Registration />} />
                <Route path="/about" element={<About />} />
                <Route path="/like" element={<Heart />} />
                <Route path="/product/:id" element={<SinglePage />} />
                <Route path="/basket" element={<Basket />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/account" element={<MyAccount />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Footer />
            </div>
          </sendState.Provider>
        </ThemeContext.Provider>
      </HelmetProvider>
    </>
  );
}

export default App;
