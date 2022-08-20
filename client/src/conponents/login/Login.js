import React, { useState ,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {decodeToken} from 'react-jwt'
import { serverURL } from '../../constants/constan'
import './Login.css'
function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState()
  const Login = async (event) => {
    event.preventDefault()
    if (!email || !password) {
      setError('please fill all fields')
    } else {
      const response = await fetch(`${serverURL}/login`, {
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
      if (data.user) {
        localStorage.setItem('token', data.user)
        alert('login successful')
        navigate('/')
      } else {
        alert('Please check your username and password')
      }
    }
  }
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const user = decodeToken(token)
      if (user) {
        navigate('/')
      }
    } 
  }, [])

  return (
    <section className="login bg-info">
      <div className=" p-5 ">
        <div className="  d-flex justify-content-center align-items-center  ">
          <form onSubmit={Login} className="p-3  d-flex flex-column  bg-light">
            {error && <h5 style={{ color: 'red' }}>{error}</h5>}
            <h1 className="text-center">Login</h1>
            <input
              className="login-input my-3 rounded-pill border-0 p-1"
              onChange={(e) => setEmail(e.target.value)}
              type="email"
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

            <button
              onClick={() => navigate('/signup')}
              className="my-2  btn btn-primary "
              type="button"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Login
