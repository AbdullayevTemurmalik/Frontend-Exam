import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../App';
import { LogOut, HelpCircle, User, Shield } from 'lucide-react';
import './MyAccount.css';

const MyAccount = () => {
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/register');
    } else {
      const data = localStorage.getItem('userData');
      if (data) {
        setUserData(JSON.parse(data));
      } else {
        setUserData({ name: 'Guest User', email: 'guest@example.com' });
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userData');
    navigate('/register');
  };

  return (
    <div className="account-page">
      <div className="container">
        <div className="account-container">
          <h2 className="account-title">My Account</h2>
          
          <div className="account-card">
            <div className="account-header">
              <div className="user-avatar">
                {userData?.photo ? (
                  <img src={userData.photo} alt={userData.name} />
                ) : (
                  <User size={40} />
                )}
              </div>
              <div className="user-details">
                <h3>{userData?.name || 'User Name'}</h3>
                <p>{userData?.email || 'user@example.com'}</p>
                <div className="user-role">
                  <Shield size={16} />
                  <span>Role: User</span>
                </div>
              </div>
            </div>

            <div className="account-actions">
              <div className="action-item">
                <div className="action-info">
                  <h4>Dark Mode</h4>
                  <p>Toggle beautiful dark theme</p>
                </div>
                <label className="switch">
                  <input type="checkbox" checked={isDarkTheme} onChange={toggleTheme} />
                  <span className="slider round"></span>
                </label>
              </div>

              <div className="action-item">
                <div className="action-info">
                  <h4>Support</h4>
                  <p>Get help from our team via Telegram</p>
                </div>
                <a href="https://t.me/TM_Backdev" target="_blank" rel="noopener noreferrer" className="support-btn">
                  <HelpCircle size={20} />
                  Contact Support
                </a>
              </div>
            </div>

            <button onClick={handleLogout} className="logout-button-large">
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
