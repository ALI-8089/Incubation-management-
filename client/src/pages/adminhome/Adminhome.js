import React, { useEffect } from 'react'
import { decodeToken } from 'react-jwt'
import { useNavigate } from 'react-router-dom'
import Application from '../../conponents/adminapplication/Application'
import Header from '../../conponents/header/Header'
import Sidebar from '../../conponents/sidebar/Sidebar'

function Adminhome() {
  const navigate = useNavigate()
  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken')
    if (adminToken) {
      const user = decodeToken(adminToken)

      if (!user) {
        localStorage.removeItem('adminToken')

        navigate('/login', { replace: true })
      }
    } else {
      navigate('/login', { replace: true })
    }
  }, [])
  return (
    <div className="">
      <Header />
      <div className="row">
       <div className="col-1">
        <Sidebar/>
       </div>
       <div className="col-11">
       <Application />
       </div>
       
      </div>
    </div>
  )
}

export default Adminhome
