import { Trash2, ShoppingCart } from "lucide-react";
import "./Heart.css";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { deleteLike } from "../../redux/likeSlice";
import { addToBasket } from "../../redux/basketSlice";
import { Link } from "react-router-dom";

const Heart = () => {
  const { t } = useTranslation();
  const likedItems = useSelector((item) => item.like.value);
  const dispatch = useDispatch();

  if (likedItems.length === 0) {
    return (
      <div className="container empty-wishlist-container">
        <div className="empty-wishlist-content">
          <div className="icon-box">
            <Trash2 size={80} strokeWidth={1} />
          </div>
          <h2>{t("wishlist_empty")}</h2>
          <p>{t("wishlist_desc")}</p>
          <Link to="/" className="red-btn shop-now-btn">
            {t("start_shopping")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="wishlist-page container">
      <title>{t("like_page_title")}</title>

      <div className="wishlist-header">
        <h3>{t("wishlist_count", { count: likedItems.length })}</h3>
        <button
          className="outline-btn"
          onClick={() =>
            likedItems.forEach((item) =>
              dispatch(addToBasket({ ...item, quantity: 1 })),
            )
          }
        >
          {t("move_all_to_bag")}
        </button>
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
                <ShoppingCart size={18} /> {t("add_to_cart")}
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
    </main>
  );
};

export default Heart;
