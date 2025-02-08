import axios from 'axios';
import { useFormik } from 'formik'
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from "yup";
import { loginSuccess } from '../Reducer/authSlice';
import { useDispatch } from 'react-redux';
import GoogleLoginButton from './GoogleLoginButton';
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    validationSchema: Yup.object({

      username: Yup.string().required("Bắt buộc nhập email"),
      password: Yup.string().required("Bắt buộc nhập mật khẩu"),

    }),
    onSubmit: async (values) => {
      console.log("values", values)
      const res = await axios({
        url: `${process.env.REACT_APP_API_URL}/User/Login`, method: "POST", data: values, headers: {
          "Content-Type": "application/json"
        }
      })

      if (res.data.code == 200) {
        toast.success("Login successful")
        dispatch(loginSuccess(res.data.Token))
        localStorage.setItem("IDCART",res.data.IDCART)
        navigate("/")
        if (localStorage.getItem("ListCart").length > 0) {
          const items = localStorage.getItem("ListCart")
          
          await axios({
            url: `${process.env.REACT_APP_API_URL}/Cart/addalot/${res.data.IDCART}`, method: "POST", data:items , headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${res.data.Token}`
            }
          })
          localStorage.setItem("ListCart",[])
        }
      }
      else {
        toast.error("Login failed")
        navigate("/login")
      }
    }
  })


  return (
    <div
      className="container-fluid d-flex align-items-center justify-content-center pb-5"
      style={{
        backgroundColor: "#f8f9fa", minHeight: 600
      }}
    >
      <div className="row align-items-center justify-content-between w-100">
        {/* Hero Section - 70% */}
        <div className="col-md-7 mt-2">
          <div className="text-center text-md-start">
            {/* Badge */}
            <div
              className="badge bg-warning text-dark px-3 py-2 mb-3 d-inline-flex align-items-center"
              style={{
                borderRadius: "20px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                fontSize: "0.9rem",
              }}
            >
              <img
                src="https://via.placeholder.com/20"
                alt="Delivery Icon"
                className="me-2"
                style={{ width: "20px", height: "20px" }}
              />
              Bike Delivery
            </div>

            {/* Title */}
            <h1 className="fw-bold" style={{ fontSize: "3rem", lineHeight: "1.2" }}>
              The Fastest Delivery in{" "}
              <span style={{ color: "#FF5722" }}>Your City</span>
            </h1>

            {/* Description */}
            <p className="text-muted mt-3" style={{ fontSize: "1.1rem" }}>
              We see incredible opportunity to reach more customers through our seamless ecosystem and expanding
              Delivery platform. Our shared-value strategy will bring affordable fresh, planet-forward options to
              even more homes, giving customers easy ways to live a healthier and more sustainable lifestyle—no
              matter where they live.
            </p>

            {/* Button */}
            <button
              className="btn btn-lg"
              style={{
                backgroundColor: "#FF5722",
                color: "white",
                borderRadius: "30px",
                padding: "10px 30px",
                fontWeight: "bold",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                border: "none",
              }}
            >
              Order Now
            </button>
          </div>
        </div>

        {/* Login Form Section */}
        <div className="col-md-5 mt-2">
          <div
            className="p-4"
            style={{
              background: "linear-gradient(135deg, #a8df65, #f6ffed)",
              borderRadius: "20px",
              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
            }}
          >
            <h4 className="text-center fw-bold mb-4" style={{ color: "#3a3d3d" }}>
              Welcome Back!
            </h4>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="form-label fw-bold"
                  style={{ color: "#3a3d3d" }}
                >
                  Username
                </label>
                <div className="input-group">
                  <span
                    className="input-group-text"
                    style={{
                      backgroundColor: "#e8f7e4",
                      border: "none",
                      borderRadius: "10px 0 0 10px",
                    }}
                  >
                    <i className="bi bi-person" style={{ color: "#6c757d" }}></i>
                  </span>
                  <input
                    type="text"
                    onChange={formik.handleChange}
                    className="form-control"
                    id="username"
                    name='username'
                    placeholder="Enter your username"
                    style={{
                      borderRadius: "0 10px 10px 0",
                      border: "none",
                      backgroundColor: "#e8f7e4",
                    }}
                  />

                </div>
                {formik.errors.username && <i className='text-danger'>{formik.errors.username}</i>}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="form-label fw-bold"
                  style={{ color: "#3a3d3d" }}
                >
                  Password
                </label>
                <div className="input-group">
                  <span
                    className="input-group-text"
                    style={{
                      backgroundColor: "#e8f7e4",
                      border: "none",
                      borderRadius: "10px 0 0 10px",
                    }}
                  >
                    <i className="bi bi-lock" style={{ color: "#6c757d" }}></i>
                  </span>
                  <input
                    onChange={formik.handleChange}
                    type="password"
                    className="form-control"
                    id="password"
                    name='password'
                    placeholder="Enter your password"
                    style={{
                      borderRadius: "0 10px 10px 0",
                      border: "none",
                      backgroundColor: "#e8f7e4",
                    }}
                  />
                </div>
                {formik.errors.password && <i className='text-danger'>{formik.errors.password}</i>}
              </div>

              <div className="text-end mb-3">
                <NavLink to={"/forgotpassword"} className="text-success fw-bold" style={{ fontSize: "0.9rem" }}>
                  Forgot Password?
                </NavLink>
              </div>
              <button
                type="submit"
                className="btn btn-success w-100 py-2"
                style={{
                  borderRadius: "12px",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                }}
              >
                Login
              </button>

              {/* Login with Google Button */}
              <GoogleLoginButton></GoogleLoginButton>
              {/* <button
                type="button"
                className="btn btn-outline-secondary w-100 py-2 mt-3"
                style={{
                  borderRadius: "12px",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                  alt="Google Logo"
                  style={{ width: "20px", height: "20px", marginRight: "10px" }}
                />
                Login with Google
              </button> */}

              <p className="text-center mt-4 mb-0" style={{ fontSize: "0.9rem", color: "#6c757d" }}>
                Don't have an account?{" "}
                <NavLink  to={"/register"} className="text-success fw-bold">
                  Sign Up
                </NavLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
