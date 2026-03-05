import { useSelector, useDispatch } from "react-redux";
import {
  deleteItem,
  incrementQuantity,
  decrementQuantity,
} from "../../redux/basketSlice";
import { Link, useNavigate } from "react-router-dom";
import { X, ChevronUp, ChevronDown } from "lucide-react";
import "./Basket.css";

const Basket = () => {
  const arr = useSelector((item) => item.basket.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const total = arr.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (arr.length === 0) {
    return (
      <div className="container middle">
        <h2>You do not have any products on basket</h2>
        <button className="red-btn">
          <Link to={"/"}>Return home</Link>
        </button>
      </div>
    );
  }

  return (
    <div className="container basket-page">
      <div className="breadcrumb">
        <Link to="/">Home</Link> / <span>Cart</span>
      </div>

      <table className="site-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {arr.map((item) => (
            <tr className="basket-row" key={item.id}>
              <td className="product-info">
                <div className="img-container">
                  <div
                    className="remove-btn"
                    onClick={() => dispatch(deleteItem(item.id))}
                  >
                    <X size={12} />
                  </div>
                  <img src={item.image} alt={item.name} />
                </div>
                <h3>{item.name}</h3>
              </td>
              <td>${item.price}</td>
              <td>
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
              <td>${item.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="basket-actions">
        <Link to="/" className="outline-btn">
          Return To Shop
        </Link>
        <button className="outline-btn" onClick={() => navigate("/basket")}>
          Update Cart
        </button>
      </div>

      <div className="basket-footer">
        <div className="coupon-box">
          <input type="text" placeholder="Coupon Code" />
          <button className="red-btn">Apply Coupon</button>
        </div>

        <div className="cart-total-card">
          <h3>Cart Total</h3>
          <div className="total-row">
            <span>Subtotal:</span>
            <span>${total}</span>
          </div>
          <div className="total-row">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="total-row final">
            <span>Total:</span>
            <span>${total}</span>
          </div>
          <button
            className="red-btn checkout-btn"
            onClick={() => navigate("/checkout")}
          >
            Procees to checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Basket;
