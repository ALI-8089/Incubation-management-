import React,{useEffect} from 'react'
import Navbar from '../../conponents/nabar/Navbar'
import {decodeToken} from "react-jwt";
import {useNavigate} from "react-router-dom"
function Proccess() {
  const navigate = useNavigate()
useEffect(() => {
  const token = localStorage.getItem('token')
  if(token){
    const user = decodeToken(token)
    if(!user){
navigate('/login')
    }
  }else{
    navigate('/login')
  }
},[])
  
  return (
    <div>
      <Navbar/>
        <h1 className='text-primary text-center my-5'>Thanks for your Application </h1>
        <h1 className='text-warning text-center my-5'>Your request is being Proccessing . . .</h1>
    </div>
  )
}

export default Proccess