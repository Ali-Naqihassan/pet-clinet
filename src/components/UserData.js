import React from "react"

const UserData = React.createContext({
  data: {
    personal: {
      username: "",
      email: "",
      phone: "",
      role: "",
      identity: "",
      createdAt: "",
      _id: "",
      image: "",
      petName: "",
      petdiscription: "",
    },
    isLoggedIn: false,
  },
  setData: () => {},
})

export default UserData
