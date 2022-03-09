import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './components/Login';
import Profile from './components/authenticated/Profile';
import Register from './components/authenticated/Register';
import Housing from './components/housing/EditHousing';
import AddHousing from './components/housing/AddHousing';
import HouseListing from './components/housing/ListHousing';
import AuthService from './services/auth.service';

import EventBus from './common/EventBus';

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }

    EventBus.on('logout', () => {
      logOut();
    });

    return () => {
      EventBus.remove('logout');
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };

  return (
    <div>
      <nav className='navbar navbar-expand navbar-dark bg-dark'>
        <a href='http://www.github.com/TmoodGitHub' className='navbar-brand'>
          Tamer's GitHub
        </a>
        <div className='navbar-nav mr-auto'>
          <li className='nav-item'>
            <Link to={'/housing'} className='nav-link'>
              Housing
            </Link>
          </li>
          {currentUser ? (
            <>
              <li className='nav-item'>
                <a href='/profile' className='nav-link'>
                  Profile
                </a>
              </li>
              <li className='nav-item'>
                <Link to={'/create'} className='nav-link'>
                  Add New Listing
                </Link>
              </li>
              <li className='nav-item'>
                <Link to={'/register'} className='nav-link'>
                  Add New User
                </Link>
              </li>
              <li className='nav-item'>
                <a href='/login' className='nav-link' onClick={logOut}>
                  Log Out
                </a>
              </li>
            </>
          ) : (
            <li className='nav-item'>
              <Link to={'/login'} className='nav-link'>
                Login to Add
              </Link>
            </li>
          )}
        </div>
      </nav>
      <div className='container mt-3'>
        <Routes>
          <Route exact path='/' element={<HouseListing />} />
          <Route exact path='/housing' element={<HouseListing />} />
          <Route path='/housing/:id' element={<Housing />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/create' element={<AddHousing />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/profile' element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
};
export default App;
