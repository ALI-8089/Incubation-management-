import React from 'react'
import { useState ,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {decodeToken} from 'react-jwt'
import axios from 'axios'
import { serverURL } from '../../constants/constan'
import './Home.css'
function Home() {
  const navigate = useNavigate()
  const initialValues = {
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    mobile: '',
    companyName: '',
    teamandbackground: '',
    companyandproduct: '',
    problem: '',
    incubationtype: '',
    status: '',
  }
  const [formValues, setFormvalues] = useState(initialValues)
  const [logo, setLogo] = useState()
  const handleImage = (e) => {
    setLogo(e.target.files[0])
  }
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormvalues({ ...formValues, [name]: value })
  }
  const Submit = async (e) => {
    e.preventDefault()
    const data = new FormData()
    console.log('qwerty')
    data.append('logo', logo)
    data.append('data', JSON.stringify(formValues))
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }

    axios
      .post(`${serverURL}/home`, data, config)
      .then((response) => {
        console.log(response)
        navigate('/proccessing')
      })
      .catch((err) => {
        console.log('error')
      })
  }
  useEffect(()=>{
       
    const token = localStorage.getItem('token')
    if(token){
        const user = decodeToken(token)
      
        if(!user){
            localStorage.removeItem('token')
           
            navigate('/login', { replace: true });
        }
    }else{
      navigate('/login', { replace: true });
    }
    },[])
  return (
    <div>
      <div className="container">
        <div className="row mt-5 d-flex justify-content-center align-items-center">
         
          <form style={{backgroundColor:"#cce1f2"}} className=" p-5" onSubmit={Submit}>
            <h1 class="text-center ">APPLICATION FOR INCUBATION</h1>

            <div class="my-2 ">
              <label for="exampleInputEmail1" class="form-label">
                Name
              </label>
              <input
                name="name"
                type="text"
                class="form-control"
                id="form-fname"
                required
                onChange={handleChange}
              />
            </div>

            <div class="my-2 ">
              <label for="exampleInputEmail1" class="form-label">
                Address
              </label>
              <input
                name="address"
                type="text"
                class="form-control"
                id="form-lname"
                required
                onChange={handleChange}
              />
            </div>
            <div class="my-2 ">
              <label for="exampleInputEmail1" class="form-label">
                Email address
              </label>
              <input
                name="email"
                type="email"
                class="form-control "
                id="form-email"
                aria-describedby="emailHelp"
                required
                onChange={handleChange}
              />
            </div>
            <div class="my-2 ">
              <label for="exampleInputPassword1" class="form-label">
                Phone
              </label>
              <input
                name="mobile"
                type="number"
                class="form-control  "
                required
                onChange={handleChange}
              />
            </div>
            <div class="mb-3 s">
              <label for="exampleInputPassword1" class="form-label">
                City
              </label>
              <input
                name="city"
                type="text"
                class="form-control  "
                id="form-confirm"
                required
                onChange={handleChange}
              />
            </div>
            <div class="mb-3 ">
              <label for="exampleInputPassword1" class="form-label">
                State
              </label>
              <input
                name="state"
                type="text"
                class="form-control  "
                id="form-confirm"
                required
                onChange={handleChange}
              />
            </div>
            <div class="mb-3 ">
              <label for="exampleInputPassword1" class="form-label">
                Company Name
              </label>
              <input
                name="companyName"
                type="text"
                class="form-control  "
                id="form-confirm"
                required
                onChange={handleChange}
              />
            </div>

            <div class="mb-3 ">
              <label for="exampleInputPassword1" class="form-label">
                Company Logo
              </label>
              <input
                name="logo"
                type="file"
                class="form-control  "
                required
                onChange={handleImage}
              />
            </div>
            <div class="mb-3 ">
              <label for="exampleInputPassword1" class="form-label">
                Dicripe Your Team and Background
                <small className="text-danger">*</small>
              </label>
              <br />
              <div class="form-floating">
                <textarea
                  name="teamandbackground"
                  class="form-control"
                  placeholder="Leave a comment here"
                  id="floatingTextarea2"
                  onChange={handleChange}
                ></textarea>
                <label for="floatingTextarea2">Comments</label>
              </div>
            </div>
            <div class="mb-3 ">
              <label for="exampleInputPassword1" class="form-label">
                Dicripe Your Company and Products
                <small className="text-danger">*</small>
              </label>
              <br />
              <div class="form-floating">
                <textarea
                  name="companyandproduct"
                  class="form-control"
                  placeholder="Leave a comment here"
                  id="floatingTextarea2"
                  onChange={handleChange}
                ></textarea>
                <label for="floatingTextarea2">Comments</label>
              </div>
            </div>
            <div class="mb-3 ">
              <label for="exampleInputPassword1" class="form-label">
                Dicripe the problem your try to solve
                <small className="text-danger">*</small>
              </label>
              <br />
              <div class="form-floating">
                <textarea
                  name="problem"
                  class="form-control"
                  id="floatingTextarea2"
                  onChange={handleChange}
                ></textarea>
                <label for="floatingTextarea2">Comments</label>
              </div>
            </div>
            <div>
              <h4 className="text-white"> Type of Incubation needed</h4>
              <div class="">
                <label for="exampleInputPassword1" class="form-label">
                  <input
                    value="physical"
                    class="form-check-input"
                    type="radio"
                    name="incubationtype"
                    onChange={handleChange}
                  />
                  Physical Incubation
                </label>
              </div>
              <div class="">
                <label for="exampleInputPassword1" class="form-label">
                  <input
                    value="virtual"
                    class="form-check-input"
                    type="radio"
                    name="incubationtype"
                    onChange={handleChange}
                  />
                  Virtual Incubation
                </label>
              </div>
            </div>
            <div class="d-flex justify-content-center py-3">
              <button
                id="signup-button"
                type="submit"
                class="btn btn-primary w-50"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Home
