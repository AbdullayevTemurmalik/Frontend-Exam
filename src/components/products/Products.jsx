import "./Products.css";
import products from "../../mock";
import { useState } from "react";
import { Heart, Eye, ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { addLike, deleteLike } from "../../redux/likeSlice";
import { addToBasket } from "../../redux/basketSlice";
import { Link } from "react-router-dom";

const Products = () => {
  const { t } = useTranslation();
  const [state, setState] = useState(true);
  const dispatch = useDispatch();
  const category = useSelector((state) => state.filter.value);
  const wishlistItems = useSelector((state) => state.like.value);

  const items = products.slice(4, 8);
  const selectedItems = state ? items : products;

  const allItems =
    category === "all" || !category
      ? selectedItems
      : selectedItems.filter((item) => item.category === category);

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
      <div className="section-title">
        <span className="red-rectangle"></span>
        <h3>{t("our_products")}</h3>
      </div>
      <div className="discount-name product">
        <h2>{t("explore_products")}</h2>
        <button onClick={() => setState(!state)} className="red-btn">
          {state ? t("view_all_btn") : t("close_all_btn")}
        </button>
      </div>

      <div className="products-wrap">
        {allItems.map((item) => {
          const isLiked = wishlistItems.some((liked) => liked.id === item.id);
          return (
            <div key={item.id} className="card">
              <div className="card-top">
                <Link to={`/product/${item.id}`}>
                  <img
                    className="product-image"
                    src={item.image}
                    alt={t(item.nameKey)}
                  />
                </Link>
                <div className="card-icon-btn-wrap">
                  <span
                    className="icon-wrap"
                    onClick={() => handleToggleLike(item)}
                  >
                    <Heart
                      size={20}
                      fill={isLiked ? "#db4444" : "none"}
                      color={isLiked ? "#db4444" : "currentColor"}
                    />
                  </span>
                  <Link to={`/product/${item.id}`} className="icon-wrap">
                    <Eye size={20} color="currentColor" />
                  </Link>
                </div>
                <button
                  className="add-to-cart-btn"
                  onClick={() =>
                    dispatch(addToBasket({ ...item, quantity: 1 }))
                  }
                >
                  <ShoppingCart size={18} style={{ marginRight: "8px" }} />
                  {t("add_to_cart")}
                </button>
              </div>
              <div className="card-bottom">
                <Link
                  to={`/product/${item.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <h3>{t(item.nameKey)}</h3>
                </Link>
                <div className="item-price">
                  <p>${item.price}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Products;
