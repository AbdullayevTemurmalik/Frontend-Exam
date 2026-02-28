import "./NotFound.css";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className="container not-found-wrap">
      <h1>404 Not Found</h1>
      <p>Your visited page not found. You may go home page.</p>
      <button className="red-btn">
        <Link to={"/"}>Back to home page</Link>
      </button>
    </div>
  );
};

export default NotFound;
