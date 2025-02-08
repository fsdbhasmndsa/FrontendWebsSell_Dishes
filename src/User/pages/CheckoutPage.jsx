import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const CheckoutPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const Token = useSelector((state) => state.auth.Token);
  const ListCard = useSelector((state) => state.cart.Cart);
  const navigate =  useNavigate()

  const totalAmount = ListCard.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  const handlePaymentSubmit = async () => {
    const address =  document.getElementById("address")?.value
    if (!paymentMethod) {
    toast.warning("Please choose the method!")
      return;
    }
    if (!address.trim() && paymentMethod!="Online Payment") {
      toast.warning(" Please enter your address!");
      return;
    }

    if (paymentMethod === "Online Payment") {
      console.log("data",ListCard)
      const url = await axios({url:`${process.env.REACT_APP_API_URL}/Order/create-checkout-session`,method:"POST",data:ListCard,
        headers:{
          "Content-Type": "application/json",
          "Authorization": `Bearer ${Token}` // Thêm Bearer Token
        }})
        window.location.href = url.data.url
    } else {
      const address =  document.getElementById("address")?.value
      const value = { items: ListCard, total: totalAmount, address:address };
      console.log("Order details:", value);

      const res = await axios({url:`${process.env.REACT_APP_API_URL}/Order/CreateOrder`,method:"POST",data:value,
        headers:{
          "Content-Type": "application/json",
          "Authorization": `Bearer ${Token}` // Thêm Bearer Token
        }
      })

      if(res.data.code == 200)
      {
        toast.success("Order Successful")
      }
      else
      {
        toast.error("Order Failed")
      }
    }
  };



  return (
    <div className="container-fluid my-5">
      <h1 className="text-center mb-4 text-primary">
        <i className="fas fa-shopping-cart me-2"></i> Checkout Page
      </h1>

      <div className="row">
        {/* Danh sách sản phẩm */}
        <div className="col-lg-8">
          <div className="card shadow-lg mb-4">
            <div className="card-header bg-primary text-white">
              <h5>
                <i className="fas fa-box-open me-2"></i> Selected Products
              </h5>
            </div>
            <div className="card-body">
              {ListCard.map((product) => (
                <div
                  key={product._id}
                  className="d-flex justify-content-between align-items-center border-bottom py-3"
                >
                  <div className="d-flex align-items-center">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="rounded me-3"
                      style={{ width: "60px", height: "60px", objectFit: "cover" }}
                    />
                    <div>
                      <h6 className="mb-0 text-dark">{product.name}</h6>
                      <small className="text-muted">
                        Quantity: {product.quantity}
                      </small>
                    </div>
                  </div>
                  <div>
                    <span className="text-primary fw-bold">
                      ${product.price * product.quantity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="card-footer text-end">
              <h5>
                <i className="fas fa-wallet me-2"></i> Total:{" "}
                <span className="text-danger fw-bold">${totalAmount}</span>
              </h5>
            </div>
          </div>
        </div>

        {/* Thanh toán */}
        <div className="col-lg-4">
          <div className="card shadow-lg">
            <div className="card-header bg-secondary text-white">
              <h5>
                <i className="fas fa-credit-card me-2"></i> Payment Method
              </h5>
            </div>
            <div className="card-body">
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="paymentMethod"
                  id="cod"
                  value="Cash on Delivery (COD)"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label className="form-check-label fs-6" htmlFor="cod">
                  <i className="fas fa-truck text-primary me-2"></i> Cash on Delivery (COD)
                </label>
              </div>
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="paymentMethod"
                  id="online"
                  value="Online Payment"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label className="form-check-label fs-6" htmlFor="online">
                  <i className="fas fa-credit-card text-warning me-2"></i> Online Payment
                </label>
              </div>

              {/* Input nhập địa chỉ */}
              <div className="mb-3">
                <label className="form-label fw-bold text-dark">
                  <i className="fas fa-map-marker-alt text-danger me-2"></i> Delivery Address
                </label>
                <input
                  type="text"
                  className="form-control p-3 rounded shadow-sm"
                  placeholder="Enter your address..."
                  id="address"
                />
              </div>

              <button
                className="btn btn-success w-100 mt-3 py-2 fw-bold shadow-sm"
                onClick={handlePaymentSubmit}
              >
                <i className="fas fa-check-circle me-2"></i> Confirm Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
