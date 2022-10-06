import React from "react"
import "./App.css"
import { Routes, Route, BrowserRouter as Router } from "react-router-dom"
import Login from "./views/Login"
import Layout from "./views/Layout"
import AddUser from "./views/AddUser"
import ViewUsers from "./views/ViewUsers"

function App(props) {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Layout />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/addUser"
            element={
              <Layout>
                <AddUser />
              </Layout>
            }
          />
          <Route
            path="/viewUsers"
            element={
              <Layout>
                <ViewUsers />
              </Layout>
            }
          />

          <Route path="*" element={<Layout />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
