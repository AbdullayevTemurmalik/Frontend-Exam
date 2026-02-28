import { TbTrash } from "react-icons/tb";
import "./Heart.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteLike } from "../../redux/likeSlice";
import { Link } from "react-router-dom";
const Heart = () => {
  const likedItems = useSelector((item) => item.like.value);

  const dispatch = useDispatch();
  if (likedItems.length == 0) {
    return (
      <div className="container middle">
        <h2>You do not have any liked produts</h2>
        <button className="red-btn">
          <Link to={"/"}>Return home</Link>
        </button>
      </div>
    );
  }
  return (
    <main className="discount-section container">
      <div className="section-title-heart">
        <h3>Wishlist({likedItems.length})</h3>
        <button>Move All To Bag</button>
      </div>
      <div className="discount-wrap">
        {likedItems.map((item) => {
          return (
            <div key={item.id} className="items-card">
              <div className="card-top">
                <img
                  className="img-card"
                  src={item.image}
                  alt={item.description}
                />
                <span className="card-main-action-wrap hearts">
                  <span
                    onClick={() => dispatch(deleteLike(item.id))}
                    className="card-icon-btn-wrap"
                  >
                    <TbTrash className="trash" />
                  </span>
                  <button>
                    <Link to={`/product/${item.id}`}>Add to a cart</Link>
                  </button>
                </span>
              </div>
              <div className="card-bottom">
                <h3>{item.name}</h3>
                <div className="item-price">
                  <p>${item.price}</p>
                  <del>${item.discountPrice}</del>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Heart;
