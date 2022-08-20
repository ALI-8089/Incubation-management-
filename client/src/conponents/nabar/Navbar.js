import React from 'react'
import {useNavigate} from "react-router-dom"
function Navbar() {
  const navigate = useNavigate()
  const logout = () =>{
    localStorage.removeItem("token")
    navigate('/login')
  }
  return (
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-info">
  <div class="container-fluid">
    <h4 class="navbar-brand" >MASTER</h4>
   <button className='btn btn-secondary' onClick={logout}>Logout</button>
   
  </div>
</nav>
    </div>
  )
}

export default Navbar