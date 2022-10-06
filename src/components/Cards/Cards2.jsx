import React from "react"
import "./Cards.css"
import { cardsData1 } from "../Data/Data"

import Card1 from "../Card/Card1"

const Cards = () => {
  return (
    <div className="Cards">
      {cardsData1.map((card1, id) => {
        return (
          <div className="parentContainer" key={id}>
            <Card1
              title={card1.title}
              color={card1.color}
              barValue={card1.barValue}
              value={card1.value}
              png={card1.png}
              series={card1.series}
            />
          </div>
        )
      })}
    </div>
  )
}

export default Cards
