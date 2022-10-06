import React from "react"
import CustomerReview from "../CustomerReview/CustomerReview"
import Updates from "../Updates/Updates"
import "./RightSide.css"

const RightSide = () => {
  return (
    <div className="RightSide">
      <div className="Customer-Reviews-ring-pistion">
        <h3>Complete Chart</h3>
        <CustomerReview />
      </div>
      <div>
        <h3>Customer Review</h3>
        <Updates />
      </div>
    </div>
  )
}

export default RightSide
