import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { AddItemAction, addToCart } from '../Reducer/CartReducer';

const ListFood = () => {
  const [Listfruits, setListfruits] = useState([])
  const Token = useSelector((state) => state.auth.Token);
  const dispatch = useDispatch();
  const dishPatch = useDispatch();
  const callAPIGetFruit = async () => {
    const res = await axios({ url: `${process.env.REACT_APP_API_URL}/Product/getALL`, method: "GET" })
    setListfruits(res.data.items);
  }

  useEffect(() => {
    callAPIGetFruit()
  }, [])

  const handleAddToCart = (event, fruit) => {
    event.stopPropagation(); // Ngăn NavLink kích hoạt
    event.preventDefault(); // Ngăn điều hướng khi bấm vào nút
    console.log("Thêm vào giỏ hàng:", fruit);
  };

  return (
    <div className="container-fluid py-5">
      {/* Fresh & Healthy Fruits Section */}
      <div className="mb-5">


        <div className="row g-3">
          {Listfruits.map((fruit) => (
            <NavLink
              to={`productDetail/${fruit._id}`}
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
                      if(Token)
                      {
                        dishPatch(addToCart({productId:fruit,quantity:1,token:Token}))
                      }
                      else{
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

      {/* Hot Dishes Section */}
      <div>



      </div>
    </div>
  );
};

export default ListFood