import React from "react"
import "./../css/Admin.css"

import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader
import { Carousel } from "react-responsive-carousel"
import MainDash from "../components/MainDash/MainDash"
import RightSide from "../components/RigtSide/RightSide"
function Admin() {
  // User Data

  return (
    <div>
      <MainDash />

      <RightSide />
    </div>
  )
}

export default Admin
