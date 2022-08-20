import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {serverURL} from "../../constants/constan"
import { decodeToken } from 'react-jwt'
import { useNavigate, UseNavigate } from 'react-router-dom'
function Application() {
  const navigate = useNavigate()
  const [newapp, setNewapp] = useState([])
  const [opendata, setOpendata] = useState({})
  const [pendingdata, setPendingdata] = useState([])

  let application, newapplications, pendingApplications
  const pending = (id, event) => {
    event.preventDefault()
    axios
      .get(`${serverURL}/pending`, { params: { id } })
      .then((response) => {})
  }

  const getNewApplication = () => {
    try {
      axios.get(`${serverURL}/newapplication`).then((response) => {
        application = response.data.application

        newapplications = application.filter((item) => {
          return item.status === 'new'
        })
        setNewapp(newapplications)

        pendingApplications = application.filter((item) => {
          return item.status === 'pending'
        })
        setPendingdata(pendingApplications)
      })
    } catch (err) {
      console.log(err)
    }
  }

  const open = (id, event) => {
    event.preventDefault()
    axios
      .get(`${serverURL}/openapp`, { params: { id } })
      .then((response) => {
        setOpendata(response.data.data)
      })
  }

  const Approve = (id, event) => {
    event.preventDefault()
    axios
      .get(`${serverURL}/approve`, { params: { id } })
      .then((response) => {})
  }
  const Decline = (id, event) => {
    event.preventDefault()
    axios
      .get(`${serverURL}/decline`, { params: { id } })
      .then((response) => {})
  }

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if(adminToken){
      const user = decodeToken(adminToken)
      if(user){
        getNewApplication()
      }else{
        localStorage.removeItem('adminToken')
        navigate('/adminlogin',{replace:true})
      }
    }else{
      navigate('/adminlogin',{replace:true})
    }
   
  }, [pending, Approve, Decline])

  return (
    <div className="container my-5">
     <div className='mx-3'>
     <h1>NEW APPLICATION LIST</h1>
      <div className="table-responsive-md">
        <table class="table table-bordered border-secondary">
          <thead>
            <tr>
              <th scope="col">Sl.No</th>
              <th scope="col">Company Name</th>
              <th scope="col">Incubation Type</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {newapp.map((value, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{value.companyName}</td>
                <td>{value.incubationtype}</td>
                <td>
                  <button
                    onClick={(event) => open(value._id, event)}
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Open
                  </button>
                </td>
                <td>
                  <button
                    onClick={(event) => pending(value._id, event)}
                    className="btn btn-warning"
                  >
                    Pending
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
     </div>

      <div className="mx-3">
        <h1>PENDING APPLICATION LIST</h1>
        <div className="table-responsive-md">
          <table class="table table-bordered border-secondary ">
            <thead>
              <tr>
                <th scope="col">Sl.No</th>
                <th scope="col">Company Name</th>
                <th scope="col">Incubation Type</th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {pendingdata.map((value, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{value.companyName}</td>
                  <td>{value.incubationtype}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={(event) => open(value._id, event)}
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      Open
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={(event) => Approve(value._id, event)}
                    >
                      Approve
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={(event) => Decline(value._id, event)}
                    >
                      Decline
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header ">
              {opendata.status === 'new' ? (
                <h5 className="modal-title " id="exampleModalLabel">
                  NEW APPLICATION
                </h5>
              ) : (
                <h5 className="modal-title " id="exampleModalLabel">
                  PENDING APPLICATION
                </h5>
              )}
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body bg-light">
              <table class="table">
                <tbody>
                  <tr>
                    <th scope="row">Name</th>
                    <td>{opendata.name}</td>
                  </tr>
                  <tr>
                    <th scope="row">Email</th>
                    <td>{opendata.email}</td>
                  </tr>
                  <tr>
                    <th scope="row">Address</th>
                    <td>{opendata.address}</td>
                  </tr>
                  <tr>
                    <th scope="row">City</th>
                    <td>{opendata.city}</td>
                  </tr>
                  <tr>
                    <th scope="row">Mobile Number</th>
                    <td>{opendata.mobile}</td>
                  </tr>
                  <tr>
                    <th scope="row">Company Name</th>
                    <td>{opendata.companyName}</td>
                  </tr>
                  <tr>
                    <th scope="row"> Team and Background</th>
                    <td>{opendata.teamandbackground}</td>
                  </tr>
                  <tr>
                    <th scope="row"> Company and Product</th>
                    <td>{opendata.companyandproduct}</td>
                  </tr>
                  <tr>
                    <th scope="row">Problem</th>
                    <td>{opendata.problem}</td>
                  </tr>
                  <tr>
                    <th scope="row"> Incubation Type</th>
                    <td>{opendata.incubationtype}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Application
