import React, { useState,useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import { decodeToken } from 'react-jwt'
import { serverURL } from '../../constants/constan'
import './Adminlogin.css'
function Adminlogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState()
  const Login = async (event) => {
    event.preventDefault()
    if(!email|| !password){
      setError("Please fill all fields")
    }else{
      const response = await fetch(`${serverURL}/adminlogin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
      const data = await response.json()
  
      if (data.admin) {
        localStorage.setItem('adminToken', data.admin)
        alert('login successful')
        navigate('/admin')
      }else{
        alert('please check Email and Passsword')
      }
    }
   
  }
  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken')
    if (adminToken) {
      const admin = decodeToken(adminToken)
      if (admin) {
        navigate('/admin')
      }
    }
  }, [])
  return (
    <section className="login bg-info">
      <div className=" p-5 m-5 ">
       
        <div className=" m-5 d-flex justify-content-center align-items-center ">
          <form onSubmit={Login} className="p-3  d-flex flex-column  bg-light">
          <h1 className="text-center">Admin Login</h1>
            <input
              className="login-input my-3 rounded-pill border-0 p-1"
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Email"
            />

            <input
              className="my-3 rounded-pill border-0 p-1"
              onChange={(e) => setPassword(e.target.value)}
              type="text"
              placeholder="Passsword"
            />

            <button className="my-2  btn btn-primary " type="submit">
              Submit
            </button>

          
          </form>
        </div>
      </div>
    </section>
  )
}

export default Adminlogin
