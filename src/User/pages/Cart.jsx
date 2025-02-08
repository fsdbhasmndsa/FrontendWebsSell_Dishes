import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decreaseAmoutAction, decreaseQuantity, deleteItemAction, fetchCartFromServer, increaseAmoutAction, increaseQuantity, removeFromCart } from "../Reducer/CartReducer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Cart = () => {
  const API = process.env.REACT_APP_API_URL
  
  const dishPatch = useDispatch();
  const Token = useSelector((state) => state.auth.Token);
  const ListCard = useSelector(state => state.cart.Cart);
  const navigate = useNavigate()
  console.log("ListCard", ListCard)

  const Sum = ListCard == null ? 0 : ListCard.reduce((total, index) => { return total + index.price * index.quantity }, 0)

  const CallAPICart = async () => {

    if (Token) {
      dishPatch(fetchCartFromServer(Token))

    }
    else {

    }
  }

  useEffect(() => {
    CallAPICart()
  }, [])


  return (
    <div className="container py-5">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="display-5 fw-bold text-primary">Your Shopping Cart</h1>
        <p className="text-muted">Review your products and proceed to checkout.</p>
      </div>

      {/* Main Content */}
      <div className="row">
        {/* Cart Items */}
        {ListCard?.length == 0 ? <div className="col-md-8 mb-4" ><div className="card shadow-sm border-0 mb-4 d-flex justify-content-center align-items-center " style={{ minHeight: 280 }}>
          <h5 className="text-muted">Chưa có sản phẩm!</h5>
          <img src="https://www.lottemart.vn/asset/images/icon-cart-empty.svg" className="img-fluid mt-3 w-25" alt="" />
        </div></div>
          :
          <div className="col-md-8 mb-4">
            {ListCard?.map((item, index) => (
              <div className="card shadow-sm border-0 mb-4" key={index}>
                <div className="row g-0">
                  {/* Product Image */}
                  <div className="col-4 col-md-3">
                    <img
                      src={`${item.imageUrl}`}
                      className="img-fluid rounded-start"
                      alt="Product"
                    />
                  </div>
                  {/* Product Details */}
                  <div className="col-8 col-md-6">
                    <div className="card-body">
                      <h5 className="card-title fw-bold text-primary">
                        {item.name}
                      </h5>
                      <p className="text-muted small mb-1">
                        A short description goes here.
                      </p>
                      {/* Rating */}
                      <div className="d-flex align-items-center">
                        <span className="text-warning me-2">
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star"></i>
                        </span>
                        <small className="text-muted">(120 reviews)</small>
                      </div>
                      <p className="text-primary fw-bold mt-2">${item.price * item.quantity}</p>
                    </div>
                  </div>
                  {/* Quantity & Actions */}
                  <div className="col-md-3 d-flex flex-column justify-content-center align-items-center">
                    <div className="d-flex align-items-center mb-2">
                      <button className="btn btn-outline-secondary btn-sm" onClick={() => {
                        if(Token)
                        {
                          dishPatch(decreaseQuantity({productId:item,token:Token}))
                        }
                        else{
                          dishPatch(decreaseAmoutAction(item))
                        }
                       
                      }}>
                        <i className="bi bi-dash"></i>
                      </button>
                      <span className="mx-3">{item.quantity}</span>
                      <button className="btn btn-outline-secondary btn-sm" onClick={() => {
                         if(Token)
                          {
                            dishPatch(increaseQuantity({productId:item,token:Token}))
                          }
                          else{
                            dishPatch(increaseAmoutAction(item))
                          }
                      
                      }}>
                        <i className="bi bi-plus"></i>
                      </button>
                    </div>
                    <button className="btn btn-outline-danger btn-sm" onClick={() => {
                      if (Token) {
                        dishPatch(removeFromCart({productId:item,token:Token}))
                      }
                      else {
                        dishPatch(deleteItemAction(item))
                      }

                    }}>
                      <i className="bi bi-trash"></i> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        }


        {/* Order Summary */}
        <div className="col-md-4">
          <div
            className="card shadow-sm border-0 position-sticky"
            style={{ top: "3.5rem" }}
          >
            <div className="card-body">
              <h5 className="card-title text-center fw-bold">Order Summary</h5>
              <div className="d-flex justify-content-between py-2">
                <span>Subtotal:</span>
                <span className="fw-bold">${Sum}</span>
              </div>
              <div className="d-flex justify-content-between py-2">
                <span>Shipping:</span>
                <span className="fw-bold">$5.00</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fs-5 fw-bold">
                <span>Total:</span>
                <span className="text-success">${Sum + 5}</span>
              </div>
              <button className="btn btn-primary btn-lg w-100 mt-4"
                onClick={() => {
                  if (Token) {
                    navigate("/checkout")
                  }
                  else {
                    toast.warning("Please Login to checkout")
                    navigate("/login")
                  }


                }}>
                <i className="bi bi-bag-check"></i> Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
