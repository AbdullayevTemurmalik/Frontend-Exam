import React, { useState, useEffect, useRef } from "react";
import "./Discount.css";
import products from "../../mock";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Heart, Eye, ArrowLeft, ArrowRight, Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { addLike, deleteLike } from "../../redux/likeSlice";
import { addToBasket } from "../../redux/basketSlice";
import { Link } from "react-router-dom";

const Discount = () => {
  const { t } = useTranslation();
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
      if (diff <= 0) clearInterval(interval);
      else {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24))
            .toString()
            .padStart(2, "0"),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
            .toString()
            .padStart(2, "0"),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
            .toString()
            .padStart(2, "0"),
          seconds: Math.floor((diff % (1000 * 60)) / 1000)
            .toString()
            .padStart(2, "0"),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleLike = (item) => {
    const isExist = wishlistItems.some((liked) => liked.id === item.id);
    if (isExist) dispatch(deleteLike(item.id));
    else dispatch(addLike(item));
  };

  return (
    <section className="discount-section container">
      <div className="discount-top-header">
        <div className="discount-header-left">
          <div className="section-title">
            <span className="red-rectangle"></span>
            <h3>{t("todays")}</h3>
          </div>
          <div className="flash-sales-row">
            <h2>{t("flash_sales")}</h2>
            <div className="countdown-timer">
              <div className="timer-box">
                <span>{t("days")}</span>
                <b>{timeLeft.days}</b>
              </div>
              <span className="separator">:</span>
              <div className="timer-box">
                <span>{t("hours")}</span>
                <b>{timeLeft.hours}</b>
              </div>
              <span className="separator">:</span>
              <div className="timer-box">
                <span>{t("minutes")}</span>
                <b>{timeLeft.minutes}</b>
              </div>
              <span className="separator">:</span>
              <div className="timer-box">
                <span>{t("seconds")}</span>
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
          onInit={(s) => {
            s.params.navigation.prevEl = prevRef.current;
            s.params.navigation.nextEl = nextRef.current;
            s.navigation.init();
            s.navigation.update();
          }}
          modules={[Navigation, Autoplay]}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
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
          {items.map((item, idx) => {
            const isLiked = wishlistItems.some((liked) => liked.id === item.id);
            return (
              <SwiperSlide key={`${item.id}-${idx}`}>
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
                          color={isLiked ? "#db4444" : "currentColor"}
                        />
                      </span>
                      <Link to={`/product/${item.id}`} className="icon-bg">
                        <Eye size={20} color="currentColor" />
                      </Link>
                    </div>
                    <img src={item.image} alt={t(item.nameKey)} />
                    <button
                      className="add-to-cart-btn"
                      onClick={() =>
                        dispatch(addToBasket({ ...item, quantity: 1 }))
                      }
                    >
                      {t("add_to_cart")}
                    </button>
                  </div>
                  <div className="card-bottom">
                    <h3>{t(item.nameKey)}</h3>
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
        <button className="view-all-btn">{t("view_all")}</button>
      </div>
    </section>
  );
};

export default Discount;
