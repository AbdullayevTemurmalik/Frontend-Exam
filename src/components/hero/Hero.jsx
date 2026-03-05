import "./Hero.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { ChevronRight } from "lucide-react";
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
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img src={HeroBanner} alt="banner" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={HeroBanner} alt="banner" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={HeroBanner} alt="banner" />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default Hero;
