import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import Home from "./page/home/Home";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { createContext, useEffect, useState } from "react";
import Registration from "./page/registration/Registration";
import NotFound from "./page/notFound/NotFound";
import About from "./page/about/About";
import Footer from "./components/footer/Footer";
import Heart from "./page/heart/Heart";
import SinglePage from "./page/singlePage/SinglePage";
import Basket from "./page/basket/Basket";
import Contact from "./page/contact/Contact";
export const sendState = createContext();
function App() {
  const navigate = useNavigate();
  const [state, setState] = useState(false);
  const data = useSelector((item) => item.info.value);

  const showRegistration = () => {
    if (data.length < 1) {
      navigate("/register");
    } else {
      return;
    }
  };
  useEffect(() => {
    setTimeout(() => {
      window.addEventListener("mousemove", showRegistration, { once: true });
    }, 4000);
  }, []);
  return (
    <>
      <sendState.Provider value={{ state, setState }}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="register" element={<Registration />} />
          <Route path="about" element={<About />} />
          <Route path="like" element={<Heart />} />
          <Route path="product/:id" element={<SinglePage />} />
          <Route path="basket" element={<Basket />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </sendState.Provider>
      <Footer />
    </>
  );
}

export default App;
