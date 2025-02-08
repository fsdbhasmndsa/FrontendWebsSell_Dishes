import axios from 'axios';
import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import * as Yup from "yup";
const Register = () => {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      phonenumber: "",
      fullname: ""
    },
    validationSchema: Yup.object({
      phonenumber: Yup.string().required("Phone number is required"),
      fullname: Yup.string().required("FullName is required"),
      username: Yup.string().required("Username number is required"),
      password: Yup.string().required("Password number is required"),

    }),
    onSubmit: async (values) => {
      console.log("values", values)
      const res = await axios({
        url: `${process.env.REACT_APP_API_URL}/User/register`, method: "POST", data: values, headers: {
          "Content-Type": "application/json"
        }
      })

      if (res.data.code == 200) {
        toast.success("Register successful")

        navigate("/login")
      }
      else {
        toast.error("Username exitst")

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

        {/* Register Form Section */}
        <div className="col-md-5 mt-2">
          <div
            className="p-4"
            style={{
              background: "linear-gradient(135deg, #ffb347, #ffcc99)",
              borderRadius: "20px",
              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
            }}
          >
            <h4 className="text-center fw-bold mb-4" style={{ color: "#3a3d3d" }}>
              Create Your Account
            </h4>
            <form onSubmit={formik.handleSubmit}>
              {/* Fullname Field */}
              <div className="mb-3">
                <label
                  htmlFor="fullname"

                  className="form-label fw-bold"
                  style={{ color: "#3a3d3d" }}
                >
                  Full Name
                </label>
                <input
                  onChange={formik.handleChange}
                  type="text"
                  className="form-control"
                  id="fullname"
                  name='fullname'
                  placeholder="Enter your full name"
                  style={{
                    borderRadius: "10px",
                    border: "none",
                    backgroundColor: "#e8f7e4",
                  }}
                />
                {formik.errors.fullname && <i className='text-danger'>{formik.errors.fullname}</i>}
              </div>

              {/* Email Field */}
              <div className="mb-3">
                <label
                  htmlFor="email"
                  className="form-label fw-bold"
                  style={{ color: "#3a3d3d" }}
                >
                  Phone number
                </label>
                <input
                  onChange={formik.handleChange}
                  type="number"
                  className="form-control"
                  id="number"
                  name='phonenumber'
                  placeholder="Enter your phone number"
                  style={{
                    borderRadius: "10px",
                    border: "none",
                    backgroundColor: "#e8f7e4",
                  }}
                />

                {formik.errors.phonenumber && <i className='text-danger'>{formik.errors.phonenumber}</i>}
              </div>

              {/* Email Field */}
              <div className="mb-3">
                <label
                  htmlFor="email"
                  className="form-label fw-bold"
                  style={{ color: "#3a3d3d" }}
                >
                  Username
                </label>
                <input
                  onChange={formik.handleChange}
                  type="text"
                  className="form-control"
                  id="username"
                  name='username'
                  placeholder="Enter your username"
                  style={{
                    borderRadius: "10px",
                    border: "none",
                    backgroundColor: "#e8f7e4",
                  }}
                />

                {formik.errors.username && <i className='text-danger'>{formik.errors.username}</i>}
              </div>

              {/* Password Field */}
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="form-label fw-bold"
                  style={{ color: "#3a3d3d" }}
                >
                  Password
                </label>
                <input
                  onChange={formik.handleChange}
                  type="password"
                  className="form-control"
                  id="password"
                  name='password'
                  placeholder="Enter your password"
                  style={{
                    borderRadius: "10px",
                    border: "none",
                    backgroundColor: "#e8f7e4",
                  }}
                />

                {formik.errors.password && <i className='text-danger'>{formik.errors.password}</i>}
              </div>

              {/* Submit Button */}
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
                Sign Up
              </button>

              <p className="text-center mt-4 mb-0" style={{ fontSize: "0.9rem", color: "#6c757d" }}>
                Already have an account?{" "}
                <a href="#" className="text-success fw-bold">
                  Login
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register;
