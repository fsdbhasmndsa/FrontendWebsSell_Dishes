import React from 'react'
import { FaLeaf, FaTruck, FaSmile } from "react-icons/fa";
const About = () => {
  return (
    <div className="container py-5">
      <div className="row justify-content-center text-center">
        <div className="col-md-8">
          <h1 className="fw-bold mb-4 text-primary">About Us</h1>
          <p className="lead text-muted">
            Welcome to <strong>Foodie Delight</strong>, your ultimate destination for delicious and high-quality meals. We are passionate about bringing the best flavors to your table.
          </p>
        </div>
      </div>

      <div className="row mt-5 align-items-center">
        <div className="col-md-6">
          <img
            src="https://images.unsplash.com/photo-1511690656952-34342bb7c2f2"
            alt="Delicious Food"
            className="img-fluid rounded shadow-lg"
          />
        </div>
        <div className="col-md-6">
          <p className="fs-5 text-secondary">
            Our journey started with a simple idea: to provide fresh, tasty, and healthy food to our customers. Every dish is prepared with care, using only the finest ingredients. Our chefs are dedicated to creating mouth-watering recipes that satisfy every craving.
          </p>
          <p className="fs-5 text-secondary">
            We believe in sustainability and sourcing our ingredients responsibly. Our partnerships with local farmers ensure that you receive the freshest produce while supporting our community.
          </p>
        </div>
      </div>

      <div className="row mt-5 text-center">
        <div className="col-md-4">
          <FaLeaf size={50} className="text-success mb-3" />
          <h3 className="fw-bold text-success">Quality Ingredients</h3>
          <p>We use only the best ingredients to ensure great taste and nutrition.</p>
        </div>
        <div className="col-md-4">
          <FaTruck size={50} className="text-danger mb-3" />
          <h3 className="fw-bold text-danger">Fast Delivery</h3>
          <p>Get your favorite meals delivered to your doorstep quickly and efficiently.</p>
        </div>
        <div className="col-md-4">
          <FaSmile size={50} className="text-warning mb-3" />
          <h3 className="fw-bold text-warning">Customer Satisfaction</h3>
          <p>Your happiness is our top priority. We strive to provide the best service.</p>
        </div>
      </div>
    </div>
  );
}

export default About