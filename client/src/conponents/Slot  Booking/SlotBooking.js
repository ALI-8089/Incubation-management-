import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import {serverURL} from "../../constants/constan"
import { decodeToken } from 'react-jwt'
import {useNavigate} from "react-router-dom"
function SlotBooking() {
  const navigate = useNavigate()
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const [slotid, setSlotid] = useState('')
  const [refresh , setRefresh] = useState()
  const handleShow = () => {
  
    setShow(true)
  }

  const [slotA, setSlotA] = useState([])
  const [slotB, setSlotB] = useState([])
  const [slotC, setSlotC] = useState([])
  const [slotD, setSlotD] = useState([])
  const [slotE, setSlotE] = useState([])
  const [company, setCompany] = useState('')
 
  const [error, setError] = useState()
 

  const [data, setData] = useState([])
  const SelectSlot = () => {
    if (company === '') {
      setError('select a Company ')
    } else {
      const dataId = {
        _id: slotid,
        company: company,
      }
      axios.post(`${serverURL}/sloted`, dataId).then((res) => {
        console.log("res",res)
        setRefresh(res)
        handleClose()
      })
    }
  }
  useEffect(() => {
const adminToken = localStorage.getItem('adminToken')

 if(adminToken){
  const admin = decodeToken(adminToken)
  if(!admin){
    navigate('/adminlogin')
  }
 }
    axios.get(`${serverURL}/slot`).then((response) => {
      const data = response.data
      setSlotA(data.filter((item) => item.section === 'A'))
      setSlotB(data.filter((item) => item.section === 'B'))
      setSlotC(data.filter((item) => item.section === 'C'))
      setSlotD(data.filter((item) => item.section === 'D'))
      setSlotE(data.filter((item) => item.section === 'E'))
    })

    axios.get(`${serverURL}/newapplication`).then((response) => {
      const res = response.data.application
      setData(res.filter((item) => item.status === 'approved'))
    })
  }, [refresh])

  return (
    <div className="container-sm my-5">
      <h1 className="text-center">Select Slot</h1>
      <div className="row m-3">
        <div className="row m-2">
          {slotA.map((x, key) => (
            <div className="col-2 col-md-1 p-1" key={key}>
              <div
                className="  m-1 border border-5 border-light"
                style={{ width: '5rem', height: '5rem',backgroundColor: x.selected ? "#880808":'#ffc107' }}
                onClick={!x.selected?() => {
                  handleShow()
                  setSlotid(x._id)
                }:""}
              ></div>
            </div>
          ))}
        </div>
        <div className="row m-2 ">
          {slotB.map((x, key) => (
            <div className="col-2 col-md-1 p-1" key={key}>
            <div
              className="   m-1 border border-5 border-light"
              style={{ width: '5rem', height: '5rem',backgroundColor: x.selected ? "#880808":'#ffc107' }}
              onClick={!x.selected?() => {
                handleShow()
                setSlotid(x._id)
              }:''}
            ></div>
          </div>
          ))}
        </div>
        <div className="row m-2 ">
          {slotC.map((x, key) => (
            <div className="col-2 col-md-1 p-1" key={key}>
            <div
              className=" m-1 border border-5 border-light"
              style={{ width: '5rem', height: '5rem' ,backgroundColor: x.selected ? "#880808":'#ffc107'}}
              onClick={!x.selected?() => {
                handleShow()
                setSlotid(x._id)
              }:''}
            ></div>
          </div>
          ))}
        </div>
        <div className="row m-2">
          {slotD.map((x, key) => (
            <div className="col-2 col-md-1 p-1" key={key}>
            <div
              className="  m-1 border border-5 border-light"
              style={{ width: '5rem', height: '5rem' ,backgroundColor: x.selected ? "#880808":'#ffc107'}}
              onClick={!x.selected?() => {
                handleShow()
                setSlotid(x._id)
              }:''}
            ></div>
          </div>
          ))}
        </div>
        <div className="row m-2">
          {slotE.map((x, key) => (
            <div className="col-2 col-md-1 p-1" key={key}>
            <div
              className="  m-1 border border-5 border-light"
              style={{ width: '5rem', height: '5rem',backgroundColor: x.selected ? "#880808":'#ffc107' }}
              onClick={!x.selected?() => {
                handleShow()
                setSlotid(x._id)
              }:''}
            ></div>
          </div>
          ))}
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Slot Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="input-group mb-3">
          {error ? <p style={{ color: "red" }}>{error}</p> : ""}
            <label class="input-group-text" for="inputGroupSelect01">
              Choose
            </label>
            <select
              class="form-select"
              id="inputGroupSelect01"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            >
              <option selected>Company</option>
              {data.map((value, index) => (
                <option value={value._id}>{!value.selected  && value.companyName }</option>
              ))}
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={SelectSlot}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default SlotBooking
