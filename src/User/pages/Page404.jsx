import React from 'react'
import { NavLink } from 'react-router-dom'

const Page404 = () => {
  return (
    <div className="row page_404">
  <div className="col-md-12">
    <div className="col-md-12 col-sm-offset-1 text-center">
      <div className="four_zero_four_bg">
        <h1>404</h1>
      </div>
      <div className="contant_box_404">
        <h3>Look like you're lost</h3>
        <p>The page you are looking for is not available!</p>
        <NavLink to={"/"} className="link_404">Go to Home</NavLink>
      </div>
    </div>
  </div>
</div>

  )
}

export default Page404