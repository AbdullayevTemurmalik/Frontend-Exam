import "./Products.css";
import products from "../../mock";
import { useState } from "react";
import { BiHeart } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { FaHeart } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { addLike } from "../../redux/likeSlice";
import { Link } from "react-router-dom";

const Products = () => {
  const [state, setState] = useState(true);
  const dispatch = useDispatch();
  const category = useSelector((state) => state.filter.value);

  const items = products.filter((item) => !item.discountPrice);
  const selectedItems = state ? items.slice(0, 4) : items;

  const allItems =
    category === "all" || !category
      ? selectedItems
      : selectedItems.filter((item) => item.category === category);

  const [likedItems, setLikedItems] = useState({});

  const toggleLike = (item) => {
    setLikedItems((prev) => ({ ...prev, [item.id]: !prev[item.id] }));
    dispatch(addLike(item));
  };

  return (
    <section className="discount-section container">
      <div className="section-title">
        <span className="red-rectangle"></span>
        <h3>Today’s</h3>
      </div>
      <div className="discount-name product">
        <h2>Flash Sales</h2>
        <button onClick={() => setState(!state)} className="red-btn">
          {state ? "View All" : "Close All"}
        </button>
      </div>

      <div className="products-wrap">
        {allItems.map((item) => (
          <div key={item.id} className="card">
            <div className="card-top">
           
              <Link to={`/product/${item.id}`}>
                <img
                  className="product-image"
                  src={item.image}
                  alt={item.name}
                />
              </Link>

              <div className="card-icon-btn-wrap">
                <span className="icon-wrap" onClick={() => toggleLike(item)}>
                  {likedItems[item.id] ? (
                    <FaHeart color="#db4444" />
                  ) : (
                    <BiHeart />
                  )}
                </span>
                <span className="icon-wrap">
                  <Link to={`/product/${item.id}`}>
                    <BsEye color="black" />
                  </Link>
                </span>
              </div>

         
              <Link to={`/product/${item.id}`} className="add-to-cart-btn">
                Add To Cart
              </Link>
            </div>

            <div className="card-bottom">
              <Link
                to={`/product/${item.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <h3>{item.name}</h3>
              </Link>
              <div className="item-price">
                <p>${item.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;
