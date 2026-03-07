import "./Registration.css";
import phone from "../../assets/Side.png";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addInfo } from "../../redux/infoSlice";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { Chrome } from "lucide-react";

const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn && !isModalOpen) {
      navigate("/");
    }
  }, [navigate, isModalOpen]);

  const handleSuccess = (userData) => {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userData", JSON.stringify(userData));
    dispatch(addInfo(userData));

    setIsModalOpen(true);
    setTimeout(() => {
      setIsModalOpen(false);
      navigate("/");
    }, 2000);
  };

  const saveData = (e) => {
    e.preventDefault();
    handleSuccess({ email, password });
  };

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      handleSuccess({
        email: user.email,
        name: user.displayName,
        photo: user.photoURL,
      });
    } catch (error) {
      console.error("Google login error:", error.message);
    }
  };

  return (
    <div className="registration">
      <helmet>
        <title>Sign Up</title>
      </helmet>
      <div className="registration-wrap">
        <div className="registration-left">
          <img src={phone} alt="side" />
        </div>
        <div className="registration-right">
          <h2>Create an account</h2>
          <p className="subtitle">Enter your details below</p>
          <form onSubmit={saveData} className="registration-form">
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email"
              required
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              required
            />
            <button type="submit" className="red-btn">
              Create Account
            </button>

            <button
              type="button"
              onClick={loginWithGoogle}
              className="google-btn"
            >
              <Chrome size={20} />
              <span>Sign up with Google</span>
            </button>

            <p className="login-text">
              Already have account? <Link to="/login">Log in</Link>
            </p>
          </form>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="success-icon">✓</div>
            <h3>Successfully!</h3>
            <p>You have signed in successfully.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Registration;
