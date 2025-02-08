import React from "react";
import ListFood from "./ListFood";
import ListCategory from "./ListCategory";
import { NavLink } from "react-router-dom";
const Index = () => {
  const products = [
    { id: "67a44aa88b53ab2f2c5d0f89", name: "Icecream", description: "Chocolate & vanilla", price: 5.25, img: "https://firebasestorage.googleapis.com/v0/b/foodapp-e3dd4.appspot.com/o/Images%2F1671072664597-%24(imageFile.name)?alt=media&token=d123f2c1-de85-4f36-903f-d0bb7de54a91" },
    { id: "67a413876e833f76673865e7", name: "Strawberries", description: "Fresh Strawberries", price: 10.25, img: "https://firebasestorage.googleapis.com/v0/b/foodapp-e3dd4.appspot.com/o/Images%2F1671072554108-%24(imageFile.name)?alt=media&token=44deebb6-6d87-4334-a9a4-11a0c5b6e977" },
    { id: "67a43558a6e7d65ae0c88816", name: "Chicken Kebab", description: "Mixed Kebab Plate", price: 8.25, img: "https://firebasestorage.googleapis.com/v0/b/foodapp-e3dd4.appspot.com/o/Images%2F1671070570438-%24(imageFile.name)?alt=media&token=dfff4369-132d-4ea2-86a4-fa7e9a509e18" },
    { id: "67a44a368b53ab2f2c5d0f83", name: "Fish Kebab", description: "Mixed Fish Kebab", price: 5.25, img: "https://firebasestorage.googleapis.com/v0/b/foodapp-e3dd4.appspot.com/o/Images%2F1671072013318-%24(imageFile.name)?alt=media&token=d1749df3-145d-4d5d-ad31-e1359883f40e" },
  ];

  return (
    <>
      <main>
        <div className="container-fluid py-3">
          <div className="row align-items-center justify-content-between">
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
                  {/* <img
                    src="https://via.placeholder.com/20"
                    alt="Delivery Icon"
                    className="me-2"
                    style={{ width: "20px", height: "20px" }}
                  /> */}
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

            {/* Product List Section - 30% */}
            <div className="col-md-5  mt-2">
              <div
                className="p-4"
                style={{
                  background: "linear-gradient(135deg, #ffe0db, #fff)",
                  borderRadius: "20px",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div className="row gy-4">
                  {products.map((product) => (
                    <NavLink style={{textDecoration:'none'}} to={`productDetail/${product.id}`} className="col-6" key={product.id}>
                      <div
                        className="text-center"
                        style={{
                          background: "#fff",
                          borderRadius: "20px",
                          padding: "15px",
                          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
                          transition: "transform 0.3s ease",
                        }}
                      >
                        <img
                          src={product.img}
                          alt={product.name}
                          className="img-fluid"
                          style={{
                            borderRadius: "15px",
                            height: "120px",
                            objectFit: "cover",
                            marginBottom: "10px",
                          }}
                        />
                        <h5 className="fw-bold" style={{ fontSize: "1rem", margin: "0" }}>
                          {product.name}
                        </h5>
                        <p className="text-muted" style={{ fontSize: "0.85rem" }}>
                          {product.description}
                        </p>
                        <h6
                          style={{
                            color: "#FF5722",
                            fontWeight: "bold",
                            fontSize: "1rem",
                            marginTop: "10px",
                          }}
                        >
                          ${product.price.toFixed(2)}
                        </h6>
                      </div>
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
        <div className="pt-2 ms-2">
          <h3 className="fw-bold">Our Fresh & Healthy Fruits</h3>
          <hr className="text-danger fw-bold" style={{ width: "150px", height: "6px" }} />
        </div>
        <ListFood></ListFood>
        <div className="pt-2 ms-2">
          <h3 className="fw-bold">Our Hot Dishes</h3>
          <hr className="text-danger" style={{ width: "50px", height: "6px" }} />
        </div>
        <ListCategory></ListCategory>
       

      </main>

    </>
  );
};

export default Index;
