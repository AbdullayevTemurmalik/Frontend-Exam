import { BiTrash } from "react-icons/bi";
import "./Basket.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteItem } from "../../redux/basketSlice";
import { Link } from "react-router-dom";
const Basket = () => {
  const arr = useSelector((item) => item.basket.value);
  const dispatch = useDispatch();
  const total = arr.reduce((acc, item) => acc + item.price * item.quantity, 0);
  if (arr.length == 0) {
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
    <div className="container">
      <table className="site-table">
        <thead className="table-head">
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {arr.map((item) => {
            return (
              <tr className="basket-card" key={item.id}>
                <td className="basket-product">
                  <span onClick={() => dispatch(deleteItem(item.id))}>
                    <BiTrash />
                  </span>
                  <img
                    className="basket-img"
                    src={item.image}
                    alt={item.description}
                  />
                  <h3>{item.name}</h3>
                </td>
                <td>${item.price}</td>
                <td>{item.quantity}</td>
                <td>${item.price * item.quantity}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="return-btn">
        <button>
          <Link to={"/"}>Return to shop</Link>
        </button>
        <button onClick={() => alert("Uzur, bu yerga ulgura ololmadim :)")}>
          Update cart
        </button>
      </div>
      <div className="count-total">
        <h2>Cart Total</h2>
        <div className="subtotal">
          <span>Subtotal</span>
          <span>${total}</span>
        </div>
        <div className="subtotal">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div className="total-wrap">
          Total
          <span>${total}</span>
        </div>
      </div>
    </div>
  );
};

export default Basket;
