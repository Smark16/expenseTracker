import React, { useEffect, useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom'; 
import { userContext } from '../context';
import '../App.css';

function Navbar() {
  const {checkUser} = useContext(userContext)
  const [toggle, setToggle] = useState(false);
  const location = useLocation(); 
  

  const toggleButton = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    const body = document.body;

    if (toggle) {
      body.style.backgroundColor = 'black';
      body.style.color = 'white';
    } else {
      body.style.backgroundColor = 'white';
      body.style.color = 'black';
    }
  }, [toggle]);

  const data = useContext(userContext)

  return (
    <>
      <div className='linkContainer'>
        <ul className='links'>
          <li className={location.pathname === '/' ? 'activeLink' : ''}>
            <Link to='/'>
              <i className="bi bi-house-door-fill"></i> <span>Home</span>
            </Link>
          </li>

          <li className={location.pathname === '/notifications' ? 'activeLink' : ''}>
            <Link to='/notifications'>
              <i className="bi bi-bell-fill"></i> <span>Notifications</span>
            </Link>
          </li>

          <li className={location.pathname === '/reports' ? 'activeLink' : ''}>
            <Link to='/reports'>
              <i className="bi bi-flag"></i> <span>Reports</span>
            </Link>
          </li>

          <li className={location.pathname === '/statistics' ? 'activeLink' : ''}>
            <Link to='/statistics'>
              <i className="bi bi-bar-chart-line"></i> <span>Statistics</span>
            </Link>
          </li>

          <li>
            <input type='checkbox' className='check' onClick={toggleButton} />
          </li>

          <li className='set'>
            <Link to='/settings'>
              <i className="bi bi-gear-fill"></i> <span>Settings</span>
            </Link>
          </li>

          <li className='logout'>
            <Link to='/logout'><span>Logout</span></Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
