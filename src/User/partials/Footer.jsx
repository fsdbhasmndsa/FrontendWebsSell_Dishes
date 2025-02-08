import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-dark text-white  py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h5 className="fw-bold">About Us</h5>
              <p>We provide fresh and healthy food directly to your doorstep. Enjoy the best quality and taste every day!</p>
            </div>
            <div className="col-md-4">
              <h5 className="fw-bold">Quick Links</h5>
              <ul className="list-unstyled">
                <li><a href="#" className="text-white text-decoration-none">Home</a></li>
                <li><a href="#" className="text-white text-decoration-none">Products</a></li>
                <li><a href="#" className="text-white text-decoration-none">Contact Us</a></li>
                <li><a href="#" className="text-white text-decoration-none">FAQs</a></li>
              </ul>
            </div>
            <div className="col-md-4">
              <h5 className="fw-bold">Follow Us</h5>
              <div>
                <a href="#" className="text-white me-3"><i className="bi bi-facebook"></i></a>
                <a href="#" className="text-white me-3"><i className="bi bi-twitter"></i></a>
                <a href="#" className="text-white me-3"><i className="bi bi-instagram"></i></a>
                <a href="#" className="text-white"><i className="bi bi-linkedin"></i></a>
              </div>
            </div>
          </div>
          <div className="text-center mt-3">
            <p className="mb-0">&copy; 2025 FreshFood. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
  )
}

export default Footer