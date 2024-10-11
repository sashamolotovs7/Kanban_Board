// src/components/Navbar.tsx
import { Link } from 'react-router-dom';
import auth from '../utils/auth';
import { useState, useEffect } from 'react';
import TimerComponent from './TimerComponent'; // Import TimerComponent

const Navbar = () => {
  const [loginCheck, setLoginCheck] = useState(false);

  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    } else {
      setLoginCheck(false);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <div className='nav'>
      <div className='nav-title'>
        <Link to='/'>Krazy Kanban Board</Link>
      </div>
      <ul>
        {!loginCheck ? (
          <>
            <li className='nav-item'>
              <button type='button'>
                <Link to='/login'>Login</Link>
              </button>
            </li>
            <li className='nav-item'>
              <button type='button'>
                <Link to='/signup'>Sign Up</Link>
              </button>
            </li>
          </>
        ) : (
          <li className='nav-item'>
            <div className="logout-timer-container"> {/* Wrapper for positioning */}
              <button type='button' onClick={() => auth.logout()}>
                Logout
              </button>
              <TimerComponent /> {/* Display TimerComponent next to Logout */}
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
