import { useSelector, useDispatch } from "react-redux";
import {
  deleteItem,
  incrementQuantity,
  decrementQuantity,
} from "../../redux/basketSlice";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { X, ChevronUp, ChevronDown, ShoppingBag } from "lucide-react";
import "./Basket.css";

const Basket = () => {
  const { t } = useTranslation();
  const arr = useSelector((item) => item.basket.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const total = arr.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (arr.length === 0) {
    return (
      <div className="container empty-basket-wrap">
        <div className="empty-content">
          <div className="empty-icon-circle">
            <ShoppingBag size={80} strokeWidth={1} />
          </div>
          <h2>{t("cart_empty")}</h2>
          <p>{t("cart_empty_desc")}</p>
          <Link to="/" className="red-btn return-home-btn">
            {t("go_shopping")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container basket-page">
      <title>{t("basket_page_title")}</title>

      <div className="breadcrumb">
        <Link to="/">{t("home")}</Link> / <span>{t("cart")}</span>
      </div>

      <table className="site-table">
        <thead>
          <tr>
            <th>{t("product")}</th>
            <th>{t("price")}</th>
            <th>{t("quantity")}</th>
            <th>{t("subtotal")}</th>
          </tr>
        </thead>
        <tbody>
          {arr.map((item) => (
            <tr className="basket-row" key={item.id}>
              <td data-label={t("product")} className="product-info">
                <div className="img-container">
                  <div
                    className="remove-btn"
                    onClick={() => dispatch(deleteItem(item.id))}
                  >
                    <X size={12} />
                  </div>
                  <img src={item.image} alt={t(item.nameKey)} />
                </div>
                <h3>{t(item.nameKey)}</h3>
              </td>
              <td data-label={t("price")}>${item.price}</td>
              <td data-label={t("quantity")}>
                <div className="quantity-control">
                  <span className="qty-num">
                    {item.quantity.toString().padStart(2, "0")}
                  </span>
                  <div className="qty-arrows">
                    <ChevronUp
                      size={16}
                      className="qty-arrow"
                      onClick={() => dispatch(incrementQuantity(item.id))}
                    />
                    <ChevronDown
                      size={16}
                      className="qty-arrow"
                      onClick={() => dispatch(decrementQuantity(item.id))}
                    />
                  </div>
                </div>
              </td>
              <td data-label={t("subtotal")}>${item.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="basket-actions">
        <Link to="/" className="outline-btn">
          {t("return_to_shop")}
        </Link>
        <button className="outline-btn" onClick={() => navigate("/basket")}>
          {t("update_cart")}
        </button>
      </div>

      <div className="basket-footer">
        <div className="coupon-box">
          <input
            className="inputid"
            type="text"
            placeholder={t("coupon_code")}
          />
          <button className="red-btn">{t("apply_coupon")}</button>
        </div>

        <div className="cart-total-card">
          <h3>{t("cart_total")}</h3>
          <div className="total-row">
            <span>{t("subtotal")}:</span>
            <span>${total}</span>
          </div>
          <div className="total-row">
            <span>{t("shipping")}:</span>
            <span>{t("free")}</span>
          </div>
          <div className="total-row final">
            <span>{t("total")}:</span>
            <span>${total}</span>
          </div>
          <button
            className="red-btn checkout-btn"
            onClick={() => navigate("/checkout")}
          >
            {t("checkout_btn")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Basket;
