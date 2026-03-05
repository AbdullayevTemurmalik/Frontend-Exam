import "./Hero.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { ChevronRight, ArrowRight, Apple } from "lucide-react";
import HeroBanner from "../../assets/Heroimg.png";

const Hero = () => {
  const categories = [
    { name: "Woman’s Fashion", hasSub: true },
    { name: "Men’s Fashion", hasSub: true },
    { name: "Electronics", hasSub: false },
    { name: "Home & Lifestyle", hasSub: false },
    { name: "Medicine", hasSub: false },
    { name: "Sports & Outdoor", hasSub: false },
    { name: "Baby’s & Toys", hasSub: false },
    { name: "Groceries & Pets", hasSub: false },
    { name: "Health & Beauty", hasSub: false },
  ];

  const slideContent = (
    <div className="slide-inner">
      <div className="slide-text-content">
        <div className="apple-brand">
          <Apple size={40} fill="white" />
          <span>iPhone 14 Series</span>
        </div>
        <h2>
          Up to 10% <br /> off Voucher
        </h2>
        <a href="#" className="shop-now-link">
          <span>Shop Now</span>
          <ArrowRight size={20} />
        </a>
      </div>
      <div className="slide-image-content">
        <img src={HeroBanner} alt="iPhone 14" />
      </div>
    </div>
  );

  return (
    <section className="container hero-wrap">
      <aside className="products-category-menu">
        <nav>
          <ul className="category-menu-list">
            {categories.map((item, index) => (
              <li key={index}>
                <a href="#">
                  {item.name}
                  {item.hasSub && <ChevronRight size={16} />}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <div className="swiper-wrapper-open-menu">
        <Swiper
          spaceBetween={0}
          centeredSlides={true}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
          className="mySwiper"
        >
          {[...Array(5)].map((_, i) => (
            <SwiperSlide key={i}>{slideContent}</SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Hero;
