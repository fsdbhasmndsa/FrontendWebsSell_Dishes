import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { AddItemAction, addToCart } from "../Reducer/CartReducer";
import { NavLink } from "react-router-dom";
const AccountManagement = () => {
  const API = process.env.REACT_APP_API_URL
  const dishPatch = useDispatch()
  const [activeTab, setActiveTab] = useState("profile");
  const [ListOrder, SetListOrder] = useState([])
  const [ListWish, SetListwish] = useState([])
  const Token = useSelector((state) => state.auth.Token);
  const [Save, SetSave] = useState(true)
  const [User, SetUser] = useState({})
  const CallAPIListWish = async () => {
    const res = await axios({
      url: `${API}/Wishlist/viewWishlist`, method: "GET", headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Token}` // Thêm Bearer Token
      }
    })
    SetListwish(res.data.items)
  }
  const CallAPIUser = async () => {
    const res = await axios({
      url: `${API}/User/viewUser`, method: "GET", headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Token}` // Thêm Bearer Token
      }
    })
    SetUser(res.data.User)
  }
  const CallAPIGetOrders = async () => {
    const res = await axios({
      url: `${API}/Order/ViewOrder`, method: "GET", headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Token}` // Thêm Bearer Token
      }
    })
    SetListOrder(res.data.ListOrder)
  }
  // Formik setup for editing profile info
  const formik = useFormik({
    initialValues: {
      fullname: "",
      address: "",
      phonenumber: "",
    },
    validationSchema: Yup.object({
      phonenumber: Yup.string().required("Phone number is required"),
      fullname: Yup.string().required("FullName is required"),
    }),
    onSubmit: async (values) => {
      const res = await axios({
        url: `${API}/User/UpdateUser`, method: "PUT", data: values, headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${Token}` // Thêm Bearer Token
        }
      })
      if (res.data.code == 200) {
        toast.success("Update successful");
        CallAPIUser()
        SetSave(true)
      }
      else {
        toast.error("Update failed");
      }
    },
  });

  useEffect(() => {
    CallAPIUser()
    CallAPIGetOrders()
    CallAPIListWish()
  }, [])

  // Render nội dung dựa trên tab hiện tại
  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="card shadow-sm border-0 rounded" style={{ minHeight: 530 }}>
            <div className="card-header bg-primary text-light">
              <h5>
                <i className="bi bi-person-circle me-2"></i> My account
              </h5>
            </div>
            <div className="card-body">
              {Save ? <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "400px" }}>
                <div className="p-4 border rounded shadow-sm bg-white text-center" style={{ maxWidth: "500px", width: "100%" }}>
                  <h5 className="mb-4">User Information</h5>
                  <div className="mb-3 text-start">
                    <p className="mb-2">
                      <strong>Name:</strong> <span className="text-muted fw-bold">{User.fullname}</span>
                    </p>

                    <p className="mb-2">
                      <strong>Phone:</strong> <span className="text-muted fw-bold">{User.phonenumber}</span>
                    </p>
                    <p className="mb-2">
                      <strong>Address:</strong> <span className="text-muted">{User.address == "" ? "Chưa có" : User.address}</span>
                    </p>
                  </div>
                  <button
                    className="btn btn-primary mt-3 px-4 py-2 shadow-sm"
                    onClick={() => {
                      SetSave(false)
                      formik.setFieldValue("fullname", User.fullname)
                      formik.setFieldValue("address", User.address)
                      formik.setFieldValue("phonenumber", User.phonenumber)
                    }}
                  >
                    Edit Information
                  </button>
                </div>
              </div>

                :
                <form onSubmit={formik.handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input
                      id="name"
                      name="fullname"
                      type="text"
                      className="form-control"
                      onChange={formik.handleChange}
                      value={formik.values.fullname}
                    />
                    {formik.errors.fullname && <i className="text-danger">{formik.errors.fullname}</i>}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input
                      id="phone"
                      name="phonenumber"
                      type="text"
                      className="form-control"
                      onChange={formik.handleChange}
                      value={formik.values.phonenumber}
                    />
                    {formik.errors.phonenumber && <i className="text-danger">{formik.errors.phonenumber}</i>}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Address</label>
                    <textarea
                      id="email"
                      name="address"
                      type="text"
                      className="form-control"
                      onChange={formik.handleChange}
                      value={formik.values.address}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">Save Changes</button>
                  <p className="btn btn-danger ms-2 mt-3" onClick={() => {
                    SetSave(true)
                  }}>Canel</p>
                </form>}
            </div>
          </div>
        );
      case "orders":
        return (
          <div className="card shadow-sm border-0 rounded" style={{ minHeight: 530 }}>
            <div className="card-header bg-gradient bg-danger text-light">
              <h5>
                <i className="bi bi-heart-fill me-2"></i> Order
              </h5>
            </div>
            <div className="card-body">
              {ListOrder.length == 0 && <div className="card shadow-sm border-0 mb-4 d-flex justify-content-center align-items-center " style={{ minHeight: 280 }}>
                <h5 className="text-muted">Chưa có đơn hàng!</h5>
                <img src="https://www.lottemart.vn/asset/images/icon-cart-empty.svg" className="img-fluid mt-3 w-25" alt="" />
              </div>}
              {ListOrder.map((order, index) => {

                return <div key={index}>

                  <div className="row align-items-center mb-4 py-3 border-bottom">
                    <div className="col-md-2">
                      <img width="80" height="80" src="https://img.icons8.com/pastel-glyph/80/box--v1.png" alt="box--v1" />
                    </div>
                    <div className="col-md-7">
                      <h6 className="fw-bold text-dark mb-1">

                        {ListOrder?.length > 0
                          ? ListOrder.reduce((total, item) => total + " " + item.name, "Order include:")
                          : "Order include: (empty)"
                        }

                      </h6>
                      <p className="text-muted">{new Date(order.createdAt).toLocaleString()}</p>

                      {/* Multi-step Progress Bar */}
                      <div className="progress" style={{ height: "8px" }}>
                        <div
                          className="progress-bar bg-success"
                          role="progressbar"
                          style={{ width: order.status === "Pending" ? "33%" : order.status === "Prepare" ? "66%" : order.status === "done" ? "100%" : "0%" }}
                          aria-valuenow="33"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <div className="d-flex justify-content-between mt-1">
                        <small className="text-success">Đã đặt hàng</small>
                        <small className="text-muted">Chuẩn bị giao hàng</small>
                        <small className="text-muted">Đã giao</small>
                      </div>
                    </div>
                    <div className="col-md-3 text-end">
                      <p className="text-danger fw-bold">${order.totalAmount}</p>
                      <button
                        className="btn btn-outline-primary btn-sm mt-2"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#orderDetails-${order._id}`}
                        aria-expanded="false"
                        aria-controls={`orderDetails-${order._id}`}
                      >
                        View Details
                      </button>
                    </div>
                  </div>

                  {/* Order Details Collapse */}
                  <div className="collapse" id={`orderDetails-${order._id}`}>
                    <div className="row align-items-center mb-4 py-3 border-bottom">
                      <div className="mb-3">
                        <p className="mb-2">
                          <strong>Order ID:</strong> {order._id}
                        </p>
                        <p className="mb-2">
                          <strong>Shipping Address:</strong> {order.address}
                        </p>


                      </div>
                      {order.items.map((items, index) => {
                        return <div className="row align-items-center mb-4 py-3 border-bottom" key={index}>
                          <div className="col-md-2">
                            <img
                              src={items.imageUrl}
                              className="img-fluid rounded border shadow-sm"
                              alt="Product"
                            />
                          </div>
                          <div className="col-md-7">
                            <h6 className="fw-bold text-dark mb-1">
                              {items.name}
                            </h6>
                            <p className="text-muted">x{items.quantity}</p>




                          </div>
                          <div className="col-md-3 text-end">
                            <p className="text-danger fw-bold">$ {items.price * items.quantity}</p>
                          </div>
                        </div>
                      })}

                    </div>

                  </div>

                </div>
              })}

            </div>
          </div>


        );
      case "voucher":
        return (
          <div className="card shadow-sm border-0 rounded" style={{ minHeight: 530 }}>
            <div className="card-header bg-success text-light">
              <h5>
                <i className="bi bi-gift-fill me-2"></i> Voucher
              </h5>
            </div>
            <div className="card-body">
              <div className="card shadow-sm border-0 mb-4 d-flex justify-content-center align-items-center " style={{ minHeight: 280 }}>
                <h5 className="text-muted">Chưa có Voucher!</h5>
                <img src="https://www.lottemart.vn/asset/images/icon-cart-empty.svg" className="img-fluid mt-3 w-25" alt="" />
              </div>
            </div>
          </div>
        );
      case "shopee-xu":
        return (
          <div className="card shadow-sm border-0 rounded" style={{ minHeight: 530 }}>
            <div className="card-header bg-warning text-dark">
              <h5>
                <i className="bi bi-coin me-2"></i> Wishlist
              </h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                {ListWish.map((fruit) => (
                  <NavLink
                    to={`/productDetail/${fruit._id}`}
                    style={{ textDecoration: "none" }}
                    key={fruit._id}
                    className="col-12 col-md-4 col-lg-3 d-flex align-items-stretch"
                  >
                    <div
                      className="card flex-row w-100"
                      style={{
                        borderRadius: "20px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        backgroundColor: "#fff",
                        border: "none",
                      }}
                    >
                      <img
                        src={fruit.imageUrl}
                        alt={fruit.name}
                        className="img-fluid"
                        style={{
                          width: "140px",
                          height: "120px",
                          objectFit: "cover",
                          borderTopLeftRadius: "20px",
                          borderBottomLeftRadius: "20px",
                        }}
                      />
                      <div className="card-body d-flex flex-column justify-content-between">
                        <div>
                          <h5 className="fw-bold" style={{ fontSize: "1rem" }}>{fruit.name}</h5>
                          <p className="text-muted" style={{ fontSize: "0.9rem" }}>120 Calories</p>
                          <h6 className="text-danger fw-bold" style={{ fontSize: "1.1rem" }}>${fruit.price}</h6>
                        </div>
                        <button
                          className="btn btn-outline-danger btn-sm rounded-circle"
                          style={{
                            border: "none",
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                            alignSelf: "center",
                          }}
                          onClick={(event) => {
                            event.stopPropagation(); // Ngăn NavLink kích hoạt
                            event.preventDefault(); // Ngăn điều hướng khi bấm vào nút
                            if (Token) {
                              dishPatch(addToCart({ productId: fruit, quantity: 1, token: Token }))
                            }
                            else {
                              dishPatch(AddItemAction(fruit))
                            }

                          }}
                        >
                          <i className="bi bi-cart"></i>
                        </button>
                      </div>
                    </div>
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="row">
        {/* Sidebar Menu */}
        <div className="col-md-3">
          <div className="list-group shadow-sm rounded ">
            <button
              onClick={() => setActiveTab("profile")}
              className={`list-group-item list-group-item-action py-3 d-flex align-items-center ${activeTab === "profile" ? "active bg-primary text-light" : ""
                }`}
            >
              <i className="bi bi-person-circle me-3 fs-4"></i>
              <span className="fw-bold">My account</span>
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`list-group-item list-group-item-action py-3 d-flex align-items-center ${activeTab === "orders" ? "active bg-danger text-light" : ""
                }`}
            >
              <i className="bi bi-box-seam me-3 fs-4"></i>
              <span className="fw-bold">Order</span>
            </button>
            <button
              onClick={() => setActiveTab("voucher")}
              className={`list-group-item list-group-item-action py-3 d-flex align-items-center ${activeTab === "voucher" ? "active bg-success text-light" : ""
                }`}
            >
              <i className="bi bi-gift-fill me-3 fs-4"></i>
              <span className="fw-bold">Voucher</span>
            </button>
            <button
              onClick={() => setActiveTab("shopee-xu")}
              className={`list-group-item list-group-item-action py-3 d-flex align-items-center ${activeTab === "shopee-xu" ? "active bg-warning text-light" : ""
                }`}
            >
              <i className="bi bi-coin me-3 fs-4"></i>
              <span className="fw-bold">Wishlist</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-md-9">{renderContent()}</div>
      </div>
    </div>
  );
};

export default AccountManagement;
