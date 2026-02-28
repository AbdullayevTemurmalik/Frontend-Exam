import React, { useState, useEffect, useRef } from "react";
import "./Discount.css";
import products from "../../mock";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { BiHeart } from "react-icons/bi";
import { BsEye, BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { FaHeart, FaStar } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { addLike } from "../../redux/likeSlice";
import { Link } from "react-router-dom";

const Discount = () => {
  const dispatch = useDispatch();
  const [likedItems, setLikedItems] = useState({});
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const items = products.filter((item) => Boolean(item.discountPrice) === true);

  const [timeLeft, setTimeLeft] = useState({
    days: "03",
    hours: "23",
    minutes: "19",
    seconds: "56",
  });

  useEffect(() => {
    const targetTime = new Date().getTime() + 4 * 24 * 60 * 60 * 1000;
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = targetTime - now;
      if (diff <= 0) {
        clearInterval(interval);
      } else {
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft({
          days: d.toString().padStart(2, "0"),
          hours: h.toString().padStart(2, "0"),
          minutes: m.toString().padStart(2, "0"),
          seconds: s.toString().padStart(2, "0"),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="discount-section container">
      <div className="discount-top-header">
        <div className="discount-header-left">
          <div className="section-title">
            <span className="red-rectangle"></span>
            <h3>Today’s</h3>
          </div>
          <div className="flash-sales-row">
            <h2>Flash Sales</h2>
            <div className="countdown-timer">
              <div className="timer-box">
                <span>Days</span>
                <b>{timeLeft.days}</b>
              </div>
              <span className="separator">:</span>
              <div className="timer-box">
                <span>Hours</span>
                <b>{timeLeft.hours}</b>
              </div>
              <span className="separator">:</span>
              <div className="timer-box">
                <span>Minutes</span>
                <b>{timeLeft.minutes}</b>
              </div>
              <span className="separator">:</span>
              <div className="timer-box">
                <span>Seconds</span>
                <b>{timeLeft.seconds}</b>
              </div>
            </div>
          </div>
        </div>
        <div className="custom-nav-wrapper">
          <button ref={prevRef} className="custom-prev">
            <BsArrowLeft />
          </button>
          <button ref={nextRef} className="custom-next">
            <BsArrowRight />
          </button>
        </div>
      </div>

      <div className="swiper-wrap">
        <Swiper
          slidesPerView={4.5}
          spaceBetween={30}
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          modules={[Navigation]}
          breakpoints={{
            0: { slidesPerView: 1.3 },
            480: { slidesPerView: 2.3 },
            768: { slidesPerView: 3.3 },
            1024: { slidesPerView: 4.5 },
          }}
        >
          {items.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="card">
                <div className="card-top">
                  <span className="discount-tag">-{item.discountPercent}%</span>
                  <div className="card-icons">
                    <span
                      className="icon-bg"
                      onClick={() => {
                        setLikedItems((p) => ({
                          ...p,
                          [item.id]: !p[item.id],
                        }));
                        dispatch(addLike(item));
                      }}
                    >
                      {likedItems[item.id] ? (
                        <FaHeart color="#db4444" />
                      ) : (
                        <BiHeart />
                      )}
                    </span>
                    <Link to={`/product/${item.id}`} className="icon-bg">
                      <BsEye color="black" />
                    </Link>
                  </div>
                  <img src={item.image} alt={item.name} />
                  <Link to={`/product/${item.id}`} className="add-to-cart-btn">
                    Add To Cart
                  </Link>
                </div>
                <div className="card-bottom">
                  <h3>{item.name}</h3>
                  <div className="item-price">
                    <p className="new-price">${item.price}</p>
                    <del className="old-price">${item.discountPrice}</del>
                  </div>
                  <div className="rating-wrap">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        color={i < 4 ? "#FFAD33" : "#D1D1D1"}
                        size={14}
                      />
                    ))}
                    <span className="count">({item.ratingCount || 88})</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="view-all-footer">
        <button className="view-all-btn">View All Products</button>
      </div>
    </section>
  );
};

export default Discount;
