import React, { useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Nav = () => {
  const state = useSelector(state => state.handleCart);
  const email = sessionStorage.getItem('email');
  const navigate = useNavigate();

  useEffect(() => {

  }, []);

  

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/">
          YourFavYTber's merch
        </NavLink>
        <button
          className="navbar-toggler mx-2"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/product">
                Products
              </NavLink>
            </li>
          </ul>

          <div className="buttons text-center">
            {email ? (
              <>
                <p className="m-2">Hello {email}</p>
                <NavLink to="/cart" className="btn btn-outline-dark m-2">
                  <i className="bi bi-cart3 mr-1"></i> Cart ({state.length})
                </NavLink>
                <button onClick={handleLogout} className="btn btn-outline-dark m-2">
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className="btn btn-outline-dark m-2">
                  <i className="bi bi-person-fill-up mr-1"></i> Login
                </NavLink>
                <NavLink to="/register" className="btn btn-outline-dark m-2">
                  <i className="bi bi-person-plus-fill mr-1"></i> Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
