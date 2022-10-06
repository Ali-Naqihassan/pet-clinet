import React from "react"
import Cards from "../Cards/Cards"
import Cards2 from "../Cards/Cards2"
import Table from "../Table/Table"
import "./MainDash.css"
const MainDash = () => {
  return (
    <div>
      <div className="MainDash">
        <h1>Daily Sales</h1>
        <Cards />
      </div>

      <div className="MainDash-ring-pistion">
        <h1>Yearly Sales</h1>
        <Cards2 />
      </div>
    </div>
  )
}

export default MainDash
