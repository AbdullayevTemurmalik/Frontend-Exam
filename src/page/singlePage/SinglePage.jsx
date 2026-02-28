import { useParams, Link, useNavigate } from "react-router-dom";
import "./SinglePage.css";
import products from "../../mock";
import { BiExit, BiMinus, BiPlus } from "react-icons/bi";
import { useState } from "react";
import { FaTruckFast } from "react-icons/fa6";
import { MdOutlineRecycling } from "react-icons/md";
import { useDispatch } from "react-redux";
import { addToBasket } from "../../redux/basketSlice";

const SinglePage = () => {
  const navigate = useNavigate();
  const param = useParams();
  const [quantity, setQuantity] = useState(1);
  const [state, setState] = useState(true);
  const dispatch = useDispatch();

  const product = products.find((item) => item.id == param.id);

  if (!product) {
    return <div className="container">Product not found!</div>;
  }

  function sendInfo(item) {
    dispatch(
      addToBasket({
        ...item,
        quantity: quantity,
      }),
    );
    navigate("/basket");
  }

  return (
    <div className="container single-wrap">
      <span className="single-exit">
        <Link to={"/"}>
          <BiExit />
        </Link>
      </span>
      <div className="single-left">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="single-right">
        <h2>{product.name}</h2>
        <div className="single-price">
          <h3>${product.price}</h3>
          {product.discountPrice && <del>${product.discountPrice}</del>}
        </div>
        <p className="single-description">{product.description}</p>

        <div className="counter">
          <span
            onClick={() => {
              setState(true);
              if (quantity > 1) setQuantity(quantity - 1);
            }}
            className={state ? "active-btn-left" : "non-active-btn-left"}
          >
            <BiMinus />
          </span>
          <span>{quantity}</span>
          <span
            onClick={() => {
              setState(false);
              setQuantity(quantity + 1);
            }}
            className={state ? "non-active-btn-right" : "active-btn-right"}
          >
            <BiPlus />
          </span>
        </div>

        <button onClick={() => sendInfo(product)} className="btn-add">
          Add To Cart
        </button>

        <div className="priorities">
          <div className="priority-item">
            <span>
              <FaTruckFast />
            </span>
            <div>
              <h4>Free Delivery</h4>
              <a href="#">Enter your postal code for Delivery Availability</a>
            </div>
          </div>
          <div className="priority-item">
            <span>
              <MdOutlineRecycling />
            </span>
            <div>
              <h4>Return Delivery</h4>
              <a href="#">Free 30 Days Delivery Returns. Details</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
