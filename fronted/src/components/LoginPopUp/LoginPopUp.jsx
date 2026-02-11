




import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
// import {  toast } from 'react-toastify';
const LoginPopup = ({ setShowLogin }) => {
  const { backendUrl,token,setToken } = useContext(StoreContext)

  const [currState, setCurrState] = useState("Login")

  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  const onLogin = async (e) => {
    e.preventDefault()
    console.log("FORM SUBMITTED", currState, data)

    // API logic will go here later

     let new_url = backendUrl  ;
         if (currState === "Login") {
             new_url += "/api/user/login";
        }
         else {
             new_url += "/api/user/register"
         }
         const response = await axios.post(new_url, data); //post the new url.
         if (response.data.success) {
             setToken(response.data.token)
             localStorage.setItem("token", response.data.token)
            //  loadCartData({token:response.data.token})
              setShowLogin (false)
        }
        else {
            alert(response.data.message)
         }
  }

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">

        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            src={assets.cross_icon}
            alt=""
            onClick={() => setShowLogin(false)}
          />
        </div>

        <div className="login-popup-inputs">
          {currState === "Sign Up" && (
            <input
              name="name"
              type="text"
              placeholder="Your name"
              value={data.name}
              onChange={onChangeHandler}
              required
            />
          )}

          <input
            name="email"
            type="email"
            placeholder="Your email"
            value={data.email}
            onChange={onChangeHandler}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={data.password}
            onChange={onChangeHandler}
            required
          />
        </div>

        <button type="submit">
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>

        {currState === "Login" ? (
          <p>
            Create a new account?
            <span onClick={() => setCurrState("Sign Up")}> Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?
            <span onClick={() => setCurrState("Login")}> Login here</span>
          </p>
        )}
      </form>
    </div>
  )
}

export default LoginPopup
