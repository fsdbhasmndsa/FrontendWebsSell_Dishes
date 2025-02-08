import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { AddItemAction, addToCart } from "../Reducer/CartReducer";
import { useDispatch, useSelector } from "react-redux";

const ListCategory = () => {
  const [listFruits, setListFruits] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [active, setActive] = useState("");
  const Token = useSelector((state) => state.auth.Token);
  const dispatch = useDispatch();
  const dishPatch = useDispatch();

  const fetchCategoriesAndDishes = useCallback(async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/Category/getALL`);
      if (res.data.items.length > 0) {
        setDishes(res.data.items);
        setActive(res.data.items[0]._id); // Lấy phần tử đầu tiên thay vì index 1
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh mục món ăn:", error);
    }
  }, []);

  const fetchDishesByCategory = useCallback(async (categoryId) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/Category/FindByIdCategory/${categoryId}`
      );
      setListFruits(res.data.items);
    } catch (error) {
      console.error("Lỗi khi lấy món ăn theo danh mục:", error);
    }
  }, []);

  useEffect(() => {
    fetchCategoriesAndDishes();
  }, [fetchCategoriesAndDishes]);

  useEffect(() => {
    if (active) {
      fetchDishesByCategory(active);
    }
  }, [active, fetchDishesByCategory]);

  return (
    <div className="container-fluid py-2">
      {/* Danh sách danh mục */}
      <div className="d-flex py-3 justify-content-center">
        {dishes.map((dish) => (
          <div
            key={dish._id}
            onClick={() => setActive(dish._id)}
            className={`card text-center me-3 ${dish._id === active ? "bg-danger text-white" : "bg-light"
              }`}
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              cursor: "pointer",
              border: "none",
            }}
          >
            <h6 className="fw-bold m-0" style={{ fontSize: "0.9rem" }}>
              {dish.name}
            </h6>
          </div>
        ))}
      </div>

      {/* Danh sách món ăn */}
      <div className="container-fluid py-5">
        <div className="mb-5">
          <div className="row g-3">
            {listFruits.map((fruit) => (
              <NavLink
                to={`productDetail/${fruit._id}`}
                key={fruit._id}
                className="col-12 col-md-4 col-lg-3 d-flex align-items-stretch"
                style={{ textDecoration: 'none' }}
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
                      <h5 className="fw-bold" style={{ fontSize: "1rem" }}>
                        {fruit.name}
                      </h5>
                      <p className="text-muted" style={{ fontSize: "0.9rem" }}>
                        120 Calories
                      </p>
                      <h6 className="text-danger fw-bold" style={{ fontSize: "1.1rem" }}>
                        ${fruit.price}
                      </h6>
                    </div>
                    <button
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
                      className="btn btn-outline-danger btn-sm rounded-circle"
                      style={{
                        border: "none",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        alignSelf: "center",
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
    </div>
  );
};

export default ListCategory;
