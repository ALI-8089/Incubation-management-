import React from 'react'
import { useNavigate } from 'react-router-dom'

function Header() {
  const navigate = useNavigate()
  const Logout = () =>{
   localStorage.removeItem('adminToken')
   navigate('/adminlogin',{replace:true})
  }
  return (
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-info">
  <div class="container-fluid">
    <h4 class="navbar-brand" href="#">ADMIN DASHBOARD</h4>
   <button className='btn btn-secondary' onClick={Logout}>Logout</button>

  </div>
</nav>
    </div>
  )
}

export default Header