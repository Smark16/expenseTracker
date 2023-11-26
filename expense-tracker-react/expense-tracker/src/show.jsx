import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './components/home';
import Notifications from './components/notification';
import Settings from './components/settings';
import AppBar from './appbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Statistics from './components/statistics';
import Reports from './components/reports';
import Expense from './components/Expense';

// Authentication
import Signup from './authentication/signup';
import Login from './authentication/login';
import Logout from './components/logout';


function Show() {
  return (
    <Router>
      <div className='appbar'>
        <AppBar />
      </div>
      <Content />
    </Router>
  );
}

function Content() {
  const navigate = useNavigate();

  const location = window.location.pathname;

  return (
    <>
      {location !== '/login' && location !== '/signup' && location !== '/expense' && (
        <div className="container-fluid">
          <div className="row mt-4">
            <div className="bar bg-dark text-center text-white">
              <Navbar />
            </div>
            <div className="col-md-9 link mt-4">
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/notifications' element={<Notifications />} />
                <Route path='/reports' element={<Reports />} />
                <Route path='/statistics' element={<Statistics />} />
                <Route path='/logout' element={<Logout/>}/>
                <Route path='/settings' element={<Settings />} />
              </Routes>
            </div>
          </div>
        </div>
      )}

      <Routes>
        <Route path='/expense' element={<Expense/>}/>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </>
  );
}

export default Show;
