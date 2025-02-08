import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { logout } from '../Reducer/authSlice';
import { AutoClear } from '../Reducer/CartReducer';
const Header = () => {

  const Token = useSelector((state) => state.auth.Token);
  const ListCard =  useSelector(state => state.cart.Cart);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Token", Token)
  }, [Token])

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light py-1 shadow-sm sticky-top" >
      <div className="container">
        <NavLink className="navbar-brand d-flex align-items-center" to={"/"}>
          <img
            src="https://food-order-web-xi.vercel.app/static/media/logo.0f99324454e3c3ccba98.png"
            alt="Logo"
            className=""
            style={{ width: "30px", height: "auto" }}
          />

          <span className="fw-bold ms-3">Way</span>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item ms-4">
              <NavLink className="nav-link" to={"/"}>
                Menu
              </NavLink>
            </li>
            <li className="nav-item ms-4">
              <NavLink className="nav-link"to={"/aboutus"}>
                About Us
              </NavLink>
            </li>
            <li className="nav-item ms-4">
             <NavLink className="nav-link"to={"/aboutus"}>
              Services
              </NavLink>
            </li>
            <li className="nav-item ms-5">
              <div className="nav-link position-relative">
                <NavLink
                  to={"cart"}
                  className="bi bi-basket2"
                  style={{
                    fontSize: "1.1rem", // Smaller size for the cart icon
                    color: "gray",
                  }}
                ></NavLink>
                <span
                  className="position-absolute top-28 start-90 translate-middle badge rounded-circle bg-danger"
                  style={{
                    fontSize: "0.6rem", // Smaller font size for the badge
                    padding: "0.2rem 0.4rem", // Adjust padding for smaller badge
                    transform: "translate(50%, -50%)", // Fine-tune positioning for smaller size
                  }}
                >
                  {ListCard?.length}
                </span>
              </div>


            </li>
            <li className="nav-item dropdown ms-5">
              <a
                className="nav-link dropdown-toggle"

                id="userDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  width="30"
                  height="30"
                  src="https://img.icons8.com/fluency/30/user-male-circle.png"
                  alt="user-male-circle"
                />
              </a>
              <ul className="dropdown-menu dropdown-menu-start" aria-labelledby="userDropdown">
                {Token ? <>  <li>
                  <NavLink to={"/profile"} className="dropdown-item bg-white text-dark" >Profile</NavLink>
                </li>


                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <NavLink to={"/"} onClick={()=>{
                      dispatch(logout())
                      dispatch(AutoClear())
                    }} className="dropdown-item bg-white text-dark" >Logout</NavLink>
                  </li> </> : <>


                  <li>

                    <NavLink to={"/login"} className="dropdown-item bg-white text-dark" >Login</NavLink>
                  </li>
                  <li>
                    <NavLink to={"/register"} className="dropdown-item bg-white text-dark" >Register</NavLink>
                  </li>
                </>}



              </ul>
            </li>



          </ul>

        </div>
      </div>

    </nav>
  )
}

export default Header