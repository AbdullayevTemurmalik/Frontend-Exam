import "./Hero.css";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useContext } from "react";
import { sendState } from "../../App";
import { BiArrowFromRight } from "react-icons/bi";
const Hero = () => {
  const state = useContext(sendState);
  return (
    <section className="container hero-wrap">
      <aside className={state.state ? "products-category-menu" : "disappear"}>
        <nav>
          <ul className="category-menu-list">
            <span onClick={() => state.setState(false)} className="close-menu">
              <BiArrowFromRight />
            </span>
            <li>
              <a href="#">Woman’s Fashion</a>
            </li>
            <li>
              <a href="#">Electronics</a>
            </li>
            <li>
              <a href="#">Home & Lifestyle</a>
            </li>
            <li>
              <a href="#">Medicine</a>
            </li>
            <li>
              <a href="#">Sports & Outdoor</a>
            </li>
            <li>
              <a href="#">Baby’s & Toys</a>
            </li>
            <li>
              <a href="#">Groceries & Pets</a>
            </li>
            <li>
              <a href="#">Health & Beauty</a>
            </li>
          </ul>
        </nav>
      </aside>
      <div
        className={state.state ? "swiper-wrapper-open-menu" : "swiper-wrapper"}
      >
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img
              src="https://d1csarkz8obe9u.cloudfront.net/themedlandingpages/tlp_hero_banners-4ee457a41ec5c9a3ff7d870ac465b9bf.jpg?ts%20=%201752217915"
              alt="add"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/website-design-service-banner-ad-template-032f17444861f05f33574e9a708f7766_screen.jpg?ts=1733848863"
              alt="add"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://www.socialmediaexaminer.com/wp-content/uploads/2019/03/instagram-alt-text-how-to-add-600.png"
              alt="add"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default Hero;
