import { Trash2, ShoppingCart, Eye } from "lucide-react";
import "./Heart.css";
import { useSelector, useDispatch } from "react-redux";
import { deleteLike } from "../../redux/likeSlice";
import { addToBasket } from "../../redux/basketSlice";
import { Link } from "react-router-dom";
import products from "../../mock";

const Heart = () => {
  const likedItems = useSelector((item) => item.like.value);
  const dispatch = useDispatch();

  const justForYouItems = products.slice(0, 4);

  if (likedItems.length === 0) {
    return (
      <div className="container middle">
        <h2>You do not have any liked products</h2>
        <button className="red-btn">
          <Link to={"/"}>Return home</Link>
        </button>
      </div>
    );
  }

  return (
    <main className="wishlist-page container">
      <div className="wishlist-header">
        <h3>Wishlist ({likedItems.length})</h3>
        <button className="outline-btn">Move All To Bag</button>
      </div>

      <div className="products-grid">
        {likedItems.map((item) => (
          <div key={item.id} className="product-card">
            <div className="card-top">
              {item.discountPercent && (
                <span className="discount-badge">-{item.discountPercent}%</span>
              )}
              <div className="card-actions">
                <button
                  className="icon-btn"
                  onClick={() => dispatch(deleteLike(item.id))}
                >
                  <Trash2 size={20} />
                </button>
              </div>
              <img src={item.image} alt={item.name} />
              <button
                className="add-to-cart-bar"
                onClick={() => dispatch(addToBasket({ ...item, quantity: 1 }))}
              >
                <ShoppingCart size={18} /> Add To Cart
              </button>
            </div>
            <div className="card-bottom">
              <h3>{item.name}</h3>
              <div className="price-row">
                <span className="current-price">${item.price}</span>
                {item.discountPrice && (
                  <del className="old-price">${item.discountPrice}</del>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="just-for-you-section">
        <div className="wishlist-header">
          <div className="section-tag">
            <span className="red-line"></span>
            <h3>Just For You</h3>
          </div>
          <button className="outline-btn">See All</button>
        </div>
        <div className="products-grid">
          {justForYouItems.map((item) => (
            <div key={item.id} className="product-card">
              <div className="card-top">
                {item.isNew && <span className="new-badge">NEW</span>}
                <div className="card-actions">
                  <button className="icon-btn">
                    <Eye size={20} />
                  </button>
                </div>
                <img src={item.image} alt={item.name} />
                <button
                  className="add-to-cart-bar"
                  onClick={() =>
                    dispatch(addToBasket({ ...item, quantity: 1 }))
                  }
                >
                  <ShoppingCart size={18} /> Add To Cart
                </button>
              </div>
              <div className="card-bottom">
                <h3>{item.name}</h3>
                <div className="price-row">
                  <span className="current-price">${item.price}</span>
                  {item.discountPrice && (
                    <del className="old-price">${item.discountPrice}</del>
                  )}
                </div>
                <div className="rating">
                  <span className="stars">★★★★★</span>
                  <span className="count">({item.ratingCount || 65})</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Heart;
