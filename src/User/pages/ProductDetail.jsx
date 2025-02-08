import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AddMoreItemAction, addToCart } from "../Reducer/CartReducer";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const ProductDetail = () => {

  const [Product, SetProduct] = useState({})
  const param = useParams();
  const navigate = useNavigate()
  const [wish, SetTruewish] = useState()
  const dishPatch = useDispatch();
  const Token = useSelector((state) => state.auth.Token);
  const [quantity, Setquantity] = useState(1)
  const callAPIProductDetail = async () => {
    const res = await axios({ url: `${process.env.REACT_APP_API_URL}/Product/getDetailProduct/${param.id}`, method: "GET" });
    SetProduct(res.data.items)
  }
  const callAPIWishList = async () => {
    const res = await axios({
      url: `${process.env.REACT_APP_API_URL}/Wishlist/CheckWishList/${param.id}`, method: "GET", headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Token}`
      }
    });
    console.log("res.data.True", res.data)
    SetTruewish(res.data.status)
  }

  useEffect(() => {
    callAPIWishList()
    callAPIProductDetail()
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [])


  return (
    <div className="container-fluid py-5">
      {/* Product Section */}
      <div className="row">
        {/* Product Image */}
        <div className="col-md-6 text-center">
          <img
            src={`${Product.imageUrl}`}
            className="img-fluid rounded shadow-lg border border-3 w-75 border-primary"
            alt="Product"
          />
        </div>

        {/* Product Info */}
        <div className="col-md-6">
          <h1 className="product-title text-gradient">{Product.name}</h1>
          <p className="text-muted">
            Category: <span className="fw-bold text-success">{Product?.category?.name}</span>
          </p>

          {/* Rating */}
          <div className="d-flex align-items-center mb-3">
            <div className="rating me-2">
              <i className="bi bi-star-fill text-warning"></i>
              <i className="bi bi-star-fill text-warning"></i>
              <i className="bi bi-star-fill text-warning"></i>
              <i className="bi bi-star-fill text-warning"></i>
              <i className="bi bi-star-half text-warning"></i>
            </div>
            <span className="text-muted">(250 reviews)</span>
          </div>

          {/* Price */}
          <p className="product-price text-danger">${Product.price}</p>

          {/* Quantity and Add to Cart */}
          <div className="d-flex align-items-center mb-4">
            <button className="btn btn-outline-danger quantity-btn" disabled={quantity == 0} onClick={() => {
              if (quantity != 1) {
                Setquantity(parseInt(quantity) - 1)
              }
            }}>
              <i className="bi bi-dash"></i>
            </button>
            <input
              type="number"
              className="form-control text-center mx-2 border-danger"
              style={{ width: "90px" }}

              value={quantity}
              min={quantity}
              max={50}
              onChange={(e) => {
                if (e.target.value > 50) {
                  Setquantity(50)
                }
                else {
                  Setquantity(e.target.value)
                }

              }}
            />
            <button className="btn btn-outline-danger quantity-btn" onClick={() => {
              console.log("quantity", quantity)
              if (quantity < 50) {
                Setquantity(parseInt(quantity) + 1)
              }


            }}>
              <i className="bi bi-plus"></i>
            </button>
          </div>
          {/* Buttons */}
          <div className="d-flex gap-3">
            <button onClick={() => {
              if (Token) {
                dishPatch(addToCart({ productId: Product, quantity: quantity, token: Token }))
                
              }
              else {
                dishPatch(AddMoreItemAction({ item: Product, quantity: quantity }))
              }
            }} className="btn btn-add-to-cart btn-lg w-100 text-primary bg-gradient border-primary shadow">
              <i className="bi bi-cart"></i> Add to Cart
            </button>
            {Token ? <> {wish ? <button onClick={async () => {
              const res = await axios({
                url: `${process.env.REACT_APP_API_URL}/Wishlist/deleteWishlist/${param.id}`, method: "DELETE", headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${Token}`
                }
              })
              if (res.data.code == 200) {
                SetTruewish(false)
                toast.success("Add Successful")
              }
            }} className="btn btn-wishlist btn-lg w-100 text-danger border-danger bg-white shadow">
              <i className="bi bi-heart-fill"></i> Add to Wishlist
            </button> : <button onClick={async () => {
              const res = await axios({
                url: `${process.env.REACT_APP_API_URL}/Wishlist/addWishlist`, method: "POST", data: Product, headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${Token}`
                }
              })
              if (res.data.code == 200) {
                SetTruewish(true)
                toast.success("UnAdd Successful")
              }
            }} className="btn btn-wishlist btn-lg w-100 text-danger border-danger bg-white shadow">
              <i className="bi bi-heart"></i> Add to Wishlist
            </button>}

            </>
              : <button onClick={() => {
                toast.warning("Please Login!")
                navigate("/login")
              }} className="btn btn-wishlist btn-lg w-100 text-danger border-danger bg-white shadow">
                <i className="bi bi-heart"></i> Add to Wishlist
              </button>}
          </div>


          {/* Product Description */}
          <div className="mt-5">
            <h2 className="description-title text-primary">Product Description</h2>
            <p>
              {Product.description}
            </p>
          </div>
        </div>
      </div>



      <div className="container">
        {/* Reviews */}
        <div className="mt-5">
          <h2 className="description-title text-success">Customer Reviews</h2>
          {/* Review Card */}
          <div className="card review-card mb-4 p-3 bg-light border-success">
            <div className="d-flex align-items-center mb-2">
              <h5 className="me-3 mb-0 text-primary">John Doe</h5>
              <div className="rating">
                <i className="bi bi-star-fill text-warning"></i>
                <i className="bi bi-star-fill text-warning"></i>
                <i className="bi bi-star-fill text-warning"></i>
                <i className="bi bi-star-fill text-warning"></i>
                <i className="bi bi-star text-warning"></i>
              </div>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              euismod ut enim nec hendrerit.
            </p>
          </div>

          {/* Another Review */}
          <div className="card review-card mb-4 p-3 bg-light border-warning">
            <div className="d-flex align-items-center mb-2">
              <h5 className="me-3 mb-0 text-danger">Jane Smith</h5>
              <div className="rating">
                <i className="bi bi-star-fill text-warning"></i>
                <i className="bi bi-star-fill text-warning"></i>
                <i className="bi bi-star-fill text-warning"></i>
                <i className="bi bi-star text-warning"></i>
                <i className="bi bi-star text-warning"></i>
              </div>
            </div>
            <p>
              Proin eget velit ut arcu luctus placerat. Curabitur nec metus sed
              sapien tincidunt accumsan non in nisi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
