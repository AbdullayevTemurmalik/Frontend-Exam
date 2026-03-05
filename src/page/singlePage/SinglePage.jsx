import { useParams, Link, useNavigate } from "react-router-dom";
import "./SinglePage.css";
import products from "../../mock";
import { useState } from "react";
import { Truck, RotateCcw, Minus, Plus, Heart, Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToBasket } from "../../redux/basketSlice";
import { addLike, deleteLike } from "../../redux/likeSlice";

const SinglePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const wishlistItems = useSelector((state) => state.like.value);
  const product = products.find((item) => item.id == id);

  if (!product) return <div className="container">Product not found!</div>;

  const isLiked = wishlistItems.some((liked) => liked.id === product.id);

  const handleToggleLike = () => {
    if (isLiked) {
      dispatch(deleteLike(product.id));
    } else {
      dispatch(addLike(product));
    }
  };

  const handleAddToCart = () => {
    dispatch(addToBasket({ ...product, quantity }));
    navigate("/basket");
  };

  return (
    <div className="container single-page-container">
      <nav className="breadcrumb">
        <Link to="/account">Account</Link> / <Link to="/gaming">Gaming</Link> /{" "}
        <span>{product.name}</span>
      </nav>

      <div className="product-main">
        <div className="product-images-side">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="side-img-box">
              <img src={product.image} alt="" />
            </div>
          ))}
        </div>

        <div className="product-image-main">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-details">
          <h2>{product.name}</h2>
          <div className="product-meta">
            <div className="stars-row">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill={i < 4 ? "#FFAD33" : "none"}
                  color="#FFAD33"
                />
              ))}
              <span>(150 Reviews)</span>
            </div>
            <span className="divider">|</span>
            <span className="stock-status">In Stock</span>
          </div>

          <div className="price-tag">${product.price.toFixed(2)}</div>

          <p className="description">
            PlayStation 5 Controller Skin High quality vinyl with air channel
            adhesive for easy bubble free install & mess free removal Pressure
            sensitive.
          </p>

          <hr />

          <div className="options-section">
            <div className="colors">
              <span>Colours:</span>
              <div className="color-dots">
                <span className="dot blue active"></span>
                <span className="dot red"></span>
              </div>
            </div>

            <div className="sizes">
              <span>Size:</span>
              <div className="size-btns">
                {["XS", "S", "M", "L", "XL"].map((size) => (
                  <button key={size} className={size === "M" ? "active" : ""}>
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="purchase-actions">
            <div className="quantity-selector">
              <button onClick={() => quantity > 1 && setQuantity(quantity - 1)}>
                <Minus size={20} />
              </button>
              <div className="qty-num">{quantity}</div>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="plus"
              >
                <Plus size={20} />
              </button>
            </div>
            <button className="buy-now-btn" onClick={handleAddToCart}>
              Buy Now
            </button>
            <button
              className={`wishlist-btn ${isLiked ? "liked" : ""}`}
              onClick={handleToggleLike}
            >
              <Heart size={20} fill={isLiked ? "#db4444" : "none"} />
            </button>
          </div>

          <div className="delivery-info-box">
            <div className="info-row">
              <Truck size={32} />
              <div>
                <h4>Free Delivery</h4>
                <p>Enter your postal code for Delivery Availability</p>
              </div>
            </div>
            <div className="info-row">
              <RotateCcw size={32} />
              <div>
                <h4>Return Delivery</h4>
                <p>
                  Free 30 Days Delivery Returns. <u>Details</u>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
