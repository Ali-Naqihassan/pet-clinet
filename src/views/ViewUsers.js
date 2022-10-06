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

import PersonSearchIcon from "@mui/icons-material/PersonSearch"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail"
import VpnKeyIcon from "@material-ui/icons/VpnKey"
import EmailIcon from "@mui/icons-material/Email"
import LocalPhoneIcon from "@mui/icons-material/LocalPhone"
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings"
import NumbersIcon from "@mui/icons-material/Numbers"
import Modal from "@mui/material/Modal"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
}

export default function AddUser() {
  let navigate = useNavigate()

  useEffect(() => {
    if (checkLoginFromAdmin()) {
      navigate("/dashboard")
    }
  }, [])

  const [users, setUsers] = useState([])
  const [search, setSearch] = useState("")

  const [modalOpen, setModalOpen] = useState(false)
  const handleModalOpen = () => setModalOpen(true)
  const handleModalClose = () => setModalOpen(false)
  const __init = {
    username: "",
    email: "",
    password: "",
    phone: "",
    role: "admin",
    identity: "",
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

  const fetchUsers = async () => {
    await axios
      .get(CONSTANT.server + "users/view")
      .then((responce) => {
        console.log(responce)
        if (responce.status === 200) {
          let res = responce.data
          if (res.message) {
            setMessage(res.message, "danger")
          } else {
            setUsers(res)
          }
        }
      })
      .catch((error) => {
        // console.log(error)
      })
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const deleteMe = async (id) => {
    await axios
      .post(CONSTANT.server + `users/delete/${id}`)
      .then((responce) => {
        if (responce.status === 200) {
          let res = responce.data
          if (res.message) {
            setMessage(res.message, "danger")
          } else {
            setMessage("User Deleted primaryfully!", "primary")
            fetchUsers()
          }
        }
      })
      .catch((error) => {
        // console.log(error)
      })
  }

  const editMe = (id) => {
    let temp = users.filter((one, i) => {
      return one._id === id
    })[0]
    setData({
      id: temp._id,
      username: temp.username,
      email: temp.email,
      password: "",
      phone: temp.phone,
      role: temp.role,
      identity: temp.identity,
      petName: temp.petName,
      petdiscription: temp.petdiscription,
    })
    handleModalOpen()
  }

  const updateData = async (e) => {
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
        data.username !== "" &&
        data.phone !== "" &&
        data.role !== "" &&
        data.identity !== "" &&
        data.petName !== "" &&
        data.petdiscription !== ""
      ) {
        await axios
          .post(CONSTANT.server + `users/update/${data.id}`, data)
          .then((responce) => {
            if (responce.status === 200) {
              let res = responce.data
              if (res.message) {
                setMessage(res.message, "danger")
              } else {
                fetchUsers()
                setMessage("User Updated primaryfully!", "primary")
                setData(__init)
                handleModalClose()
              }
            }
          })
          .catch((error) => {
            // console.log(error)
          })
      } else {
        setMessage("Fill All Fields", "danger")
      }
    } else {
      setMessage("Please Enter Valid Email", "danger")
    }
    e.target.style.pointerEvents = "unset"
    e.target.innerHTML = "Update"
  }

  return (
    <div className="__AddUser row d-flex justify-content-center align-items-center">
      <div className="form viewPage col-12">
        <h1 className="mb-5 text-center">All Users</h1>
        <p className="p-0 m-0 mb-2" id="error" style={{ display: "none" }}>
          Error
        </p>

        <div className="custom-input input-group mb-3">
          <span className="input-group-text">
            <PersonSearchIcon />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            name="search"
            onChange={(e) => {
              setSearch(e.target.value)
            }}
            value={search}
          />
        </div>

        <div className="table-responsive-white">
          <table className="table">
            <thead>
              <tr className="text-white">
                <th scope="col">#</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Role</th>
                <th scope="col">Identity Number</th>
                <th scope="col">Pet Name</th>
                <th scope="col">pet Discription</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* {console.log(users)} */}
              {users.length > 0
                ? users
                    .filter((user, i) => {
                      return (
                        user.username.includes(search) ||
                        user.email.includes(search) ||
                        user.phone.includes(search) ||
                        user.role.includes(search) ||
                        user.identity.includes(search) ||
                        user.petName.includes(search) ||
                        user.petdiscription.includes(search)
                      )
                    })
                    .map((user, i) => {
                      return (
                        <tr className="text-white">
                          <th scope="row">{i + 1}</th>
                          <td className="text-white">{user.username}</td>
                          <td>{user.email}</td>
                          <td>{user.phone}</td>
                          <td>{user.role}</td>
                          <td>{user.identity}</td>
                          <td>{user.petName}</td>
                          <td>{user.petdiscription}</td>

                          <td>
                            <span className="d-flex justify-content-center align-items-center">
                              <span
                                role="button"
                                className="text-danger"
                                onClick={(e) => {
                                  deleteMe(user._id)
                                }}
                              >
                                <DeleteIcon />
                              </span>
                              <span
                                role="button"
                                className="mx-2 text-primary"
                                onClick={(e) => {
                                  editMe(user._id)
                                }}
                              >
                                <EditIcon />
                              </span>
                            </span>
                          </td>
                        </tr>
                      )
                    })
                : "No Users"}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="custom-modal d-flex justify-content-center align-items-center"
      >
        <div className="form col-lg-6 col-sm-12 ">
          <p className="p-0 m-0 mb-2" id="error" style={{ display: "none" }}>
            Error
          </p>
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
              placeholder="Leave Empty for Same Password"
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
              <option
                value="user"
                selected={data.role === "user" ? true : false}
              >
                User
              </option>
              <option
                value="mechanic"
                selected={data.role === "mechanic" ? true : false}
              >
                Mechanic
              </option>
              <option
                value="wrecker"
                selected={data.role === "wrecker" ? true : false}
              >
                Wrecker
              </option>
              <option
                value="petrolium"
                selected={data.role === "petrolium" ? true : false}
              >
                Petrolium
              </option>
              <option
                value="hod"
                selected={data.role === "tyres" ? true : false}
              >
                Tyres Brust Mechanic
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
              placeholder="Pet Name"
              name="identity"
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
              placeholder="pet Discription"
              name="identity"
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
              className="btn btn-primary"
              style={{
                padding: "12px 15px",
              }}
              onClick={updateData}
            >
              Update
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
