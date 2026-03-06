import React, { useState } from "react";
import "./Speaker.css";
import products from "../../mock";
import { Heart, Eye, Star, ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addLike, deleteLike } from "../../redux/likeSlice";
import { addToBasket } from "../../redux/basketSlice";
import { Link } from "react-router-dom";

const Speaker = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.like.value);
  const cartItems = useSelector((state) => state.basket.value);

  const exploreItems = products.slice(8, 16);

  const images = {
    main: "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=2070",
    ps5: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=2070",
    woman:
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=1924",
    speakers:
      "https://images.unsplash.com/photo-1589121817094-998411c9bc4b?q=80&w=2070",
    perfume:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1964",
  };

  const handleToggleLike = (item) => {
    const isExist = wishlistItems.some((liked) => liked.id === item.id);
    if (isExist) {
      dispatch(deleteLike(item.id));
    } else {
      dispatch(addLike(item));
    }
  };

  const handleAddToCart = (item) => {
    const isExist = cartItems.some((cartItem) => cartItem.id === item.id);
    if (!isExist) {
      dispatch(addToBasket({ ...item, quantity: 1 }));
    }
  };

  return (
    <main className="main-content">
      <section className="container speaker-wrap">
        <div className="speaker-left">
          <h4>Categories</h4>
          <h2>
            Enhance Your <br /> Music Experience
          </h2>
          <div className="time-wrap">
            <div className="time">
              23<span>Hours</span>
            </div>
            <div className="time">
              05<span>Days</span>
            </div>
            <div className="time">
              59<span>Minutes</span>
            </div>
            <div className="time">
              35<span>Seconds</span>
            </div>
          </div>
          <button className="speaker-buy-btn">Buy Now!</button>
        </div>
        <div className="speaker-right">
          <img src={images.main} alt="Speaker" />
        </div>
      </section>

      <section className="explore-section container">
        <div className="section-title">
          <span className="red-rectangle"></span>
          <h4 className="sub-title">Our Products</h4>
        </div>
        <div className="explore-header">
          <h2>Explore Our Products</h2>
        </div>
        <div className="explore-grid">
          {exploreItems.map((item) => {
            const isLiked = wishlistItems.some((liked) => liked.id === item.id);
            return (
              <div key={item.id} className="card">
                <div className="card-top">
                  {item.isNew && <span className="new-badge">NEW</span>}
                  <Link to={`/product/${item.id}`}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="product-image"
                    />
                  </Link>
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
                  <button
                    className="add-to-cart-bar"
                    onClick={() => handleAddToCart(item)}
                  >
                    <ShoppingCart size={18} /> Add To Cart
                  </button>
                </div>
                <div className="card-bottom">
                  <h3>{item.name}</h3>
                  <div className="price-row">
                    <span className="current-price">${item.price}</span>
                    <div className="rating-wrap">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          fill={i < 4 ? "#FFAD33" : "none"}
                          color={i < 4 ? "#FFAD33" : "#D1D1D1"}
                        />
                      ))}
                      <span className="count">({item.ratingCount || 65})</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="view-all-footer">
          <button className="red-btn">View All Products</button>
        </div>
      </section>

      <section className="featured-section container">
        <div className="section-title">
          <span className="red-rectangle"></span>
          <h4 className="sub-title">Featured</h4>
        </div>
        <div className="explore-header">
          <h2>New Arrival</h2>
        </div>
        <div className="new-arrival-grid">
          <div className="grid-item ps5-item">
            <img src={images.ps5} alt="PS5" />
            <div className="grid-content">
              <h3>PlayStation 5</h3>
              <p>Black and White version of the PS5 coming out on sale.</p>
              <Link to="/shop">Shop Now</Link>
            </div>
          </div>
          <div className="grid-item woman-item">
            <img src={images.woman} alt="Woman" />
            <div className="grid-content">
              <h3>Women's Collections</h3>
              <p>Featured woman collections that give you another vibe.</p>
              <Link to="/shop">Shop Now</Link>
            </div>
          </div>
          <div className="grid-item speakers-item">
            <img src={images.speakers} alt="Speakers" />
            <div className="grid-content">
              <h3>Speakers</h3>
              <Link to="/shop">Shop Now</Link>
            </div>
          </div>
          <div className="grid-item perfume-item">
            <img src={images.perfume} alt="Perfume" />
            <div className="grid-content">
              <h3>Perfume</h3>
              <Link to="/shop">Shop Now</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Speaker;
