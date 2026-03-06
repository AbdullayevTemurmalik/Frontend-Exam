import React, { useState, useEffect, useRef } from "react";
import "./Discount.css";
import products from "../../mock";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Heart, Eye, ArrowLeft, ArrowRight, Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addLike, deleteLike } from "../../redux/likeSlice";
import { addToBasket } from "../../redux/basketSlice";
import { Link } from "react-router-dom";

const Discount = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.like.value);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const baseItems = products.filter((item) => item.id >= 1 && item.id <= 4);
  const items = [...baseItems, ...baseItems];

  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
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

  const handleToggleLike = (item) => {
    const isExist = wishlistItems.some((liked) => liked.id === item.id);
    if (isExist) {
      dispatch(deleteLike(item.id));
    } else {
      dispatch(addLike(item));
    }
  };

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
            <ArrowLeft size={20} />
          </button>
          <button ref={nextRef} className="custom-next">
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      <div className="swiper-wrap">
        <Swiper
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          modules={[Navigation]}
          slidesPerView={4}
          spaceBetween={30}
          loop={true}
          breakpoints={{
            0: { slidesPerView: 1.3, spaceBetween: 15 },
            480: { slidesPerView: 2.2, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 25 },
            1024: { slidesPerView: 4, spaceBetween: 30 },
          }}
        >
          {items.map((item, index) => {
            const isLiked = wishlistItems.some((liked) => liked.id === item.id);
            return (
              <SwiperSlide key={`${item.id}-${index}`}>
                <div className="card">
                  <div className="card-top">
                    {item.discountPercent && (
                      <span className="discount-tag">
                        -{item.discountPercent}%
                      </span>
                    )}
                    <div className="card-icons">
                      <span
                        className="icon-bg"
                        onClick={() => handleToggleLike(item)}
                      >
                        <Heart
                          size={20}
                          fill={isLiked ? "#db4444" : "none"}
                          color={isLiked ? "#db4444" : "black"}
                        />
                      </span>
                      <Link to={`/product/${item.id}`} className="icon-bg">
                        <Eye size={20} color="black" />
                      </Link>
                    </div>
                    <img src={item.image} alt={item.name} />
                    <button
                      className="add-to-cart-btn"
                      onClick={() =>
                        dispatch(addToBasket({ ...item, quantity: 1 }))
                      }
                    >
                      Add To Cart
                    </button>
                  </div>
                  <div className="card-bottom">
                    <h3>{item.name}</h3>
                    <div className="item-price">
                      <p className="new-price">${item.price}</p>
                      {item.discountPrice && (
                        <del className="old-price">${item.discountPrice}</del>
                      )}
                    </div>
                    <div className="rating-wrap">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          fill={i < 4 ? "#FFAD33" : "none"}
                          color={i < 4 ? "#FFAD33" : "#D1D1D1"}
                          size={14}
                        />
                      ))}
                      <span className="count">({item.ratingCount || 88})</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div className="view-all-footer">
        <button className="view-all-btn">View All Products</button>
      </div>
    </section>
  );
};

export default Discount;
