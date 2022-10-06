import React, { useState, useEffect } from "react"
import "./../css/Mixed.css"
import { useNavigate } from "react-router-dom"
import axios from "axios"

import {
  CONSTANT,
  checkLoginFromAdmin,
  setMessage,
  resetMessage,
  isMessage,
} from "./../CONSTANT"

import AlternateEmailIcon from "@material-ui/icons/AlternateEmail"
import VpnKeyIcon from "@material-ui/icons/VpnKey"
import EmailIcon from "@mui/icons-material/Email"
import LocalPhoneIcon from "@mui/icons-material/LocalPhone"
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings"
import NumbersIcon from "@mui/icons-material/Numbers"
export default function AddUser() {
  let navigate = useNavigate()

  useEffect(() => {
    if (checkLoginFromAdmin()) {
      navigate("/dashboard")
    }
  }, [])

  const __init = {
    username: "",
    email: "",
    password: "",
    phone: "",
    role: "admin",
    identity: "",
    image: "",
    petName: "",
    petdiscription: "",
  }
  const [data, setData] = useState(__init)
  const changeData = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

  const addData = async (e) => {
    console.log(setData)
    e.target.style.pointerEvents = "none"
    e.target.innerHTML =
      '<div className="spinner-border custom-spin" role="status"><span className="visually-hidden">Loading...</span></div>'
    e.preventDefault()
    resetMessage()
    if (
      data.email !== "" &&
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)
    ) {
      if (
        data.password !== "" &&
        data.username !== "" &&
        data.phone !== "" &&
        data.role !== "" &&
        data.identity !== "" &&
        data.image !== "" &&
        data.petName != "" &&
        data.petdiscription != ""
      ) {
        await axios
          .post(CONSTANT.server + "users/insert", data)
          .then((responce) => {
            if (responce.status === 200) {
              let res = responce.data
              if (res.message) {
                setMessage(res.message, "danger")
              } else {
                console.log(data)
                setMessage("User Added primaryfully!", "primary")
                setData(__init)
              }
            }
          })
          .catch((error) => {
            console.log(error)
          })
      } else {
        setMessage("Fill All Fields", "danger")
      }
    } else {
      setMessage("Please Enter Valid Email", "danger")
    }
    e.target.style.pointerEvents = "unset"
    e.target.innerHTML = "Add"
  }
  return (
    <div className="__AddUser row d-flex justify-content-center align-items-center">
      <div className="form col-lg-6 col-sm-12">
        <h1 className="mb-5 text-center">Add User</h1>
        <div className="custom-input input-group mb-3">
          <span className="input-group-text">
            <AlternateEmailIcon />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            name="username"
            onChange={changeData}
            value={data.username}
          />
        </div>
        <div className="custom-input input-group mb-3">
          <span className="input-group-text">
            <EmailIcon />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Email"
            name="email"
            onChange={changeData}
            value={data.email}
          />
        </div>
        <div className="custom-input input-group mb-3">
          <span className="input-group-text">
            <VpnKeyIcon />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Password"
            name="password"
            onChange={changeData}
            value={data.password}
          />
        </div>
        <div className="custom-input input-group mb-3">
          <span className="input-group-text">
            <LocalPhoneIcon />
          </span>
          <input
            type="number"
            className="form-control"
            placeholder="Phone"
            name="phone"
            onChange={changeData}
            value={data.phone}
          />
        </div>
        <div className="custom-input input-group mb-3">
          <span className="input-group-text">
            <LocalPhoneIcon />
          </span>

          <input
            type="file"
            className="form-control"
            name="image"
            onChange={changeData}
            value={data.image}
          />
        </div>

        <div className="custom-input input-group mb-3">
          <span className="input-group-text">
            <AdminPanelSettingsIcon />
          </span>
          <select
            class="form-select form-control"
            name="role"
            onChange={changeData}
            value={data.role}
            aria-label="Select Role"
          >
            <option
              value="admin"
              selected={data.role === "admin" ? true : false}
            >
              Admin
            </option>
            <option value="user" selected={data.role === "user" ? true : false}>
              User
            </option>
          </select>
        </div>
        <div className="custom-input input-group mb-3">
          <span className="input-group-text">
            <NumbersIcon />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Identity Number"
            name="identity"
            onChange={changeData}
            value={data.identity}
          />
        </div>
        <div className="custom-input input-group mb-3">
          <span className="input-group-text">
            <NumbersIcon />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Pet-Name"
            name="petName"
            onChange={changeData}
            value={data.petName}
          />
        </div>
        <div className="custom-input input-group mb-3">
          <span className="input-group-text">
            <NumbersIcon />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Pet Discription"
            name="petdiscription"
            onChange={changeData}
            value={data.petdiscription}
          />
        </div>
        <p
          className="text-danger p-0 m-0 mb-2"
          id="error"
          style={{ display: "none" }}
        >
          Error
        </p>
        <div className="w-100 mt-1 custom-button">
          <button
            type="button"
            className="btn btn-success"
            style={{
              padding: "12px 15px",
            }}
            onClick={addData}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  )
}
