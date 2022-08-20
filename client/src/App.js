import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'


import UserLogin from './pages/UserLogin'
import Signup from './conponents/signup/Signup'
import Adminhome from './pages/adminhome/Adminhome'
import Adminlogin from './pages/Adminlogin/Adminlogin'
import Slot from './pages/slot/Slot'
import RecordList from './pages/trackrecords/Record'

import Proccess from './pages/Userpoccessing/Proccess'
import UserHome from './pages/UserHome'


function App() {
  return (
    <div>
   <BrowserRouter>
   <Routes>
    <Route path='/signup' element={<Signup/>} />
    <Route path='/login' element={<UserLogin/>} />
    <Route path='/' element={<UserHome/>} />
    <Route path='/proccessing' element={<Proccess/>} />
    <Route path='/adminlogin' element={<Adminlogin/>} />
    <Route path='/admin' element={<Adminhome/>} />
    <Route path='/recordlist' element={<RecordList/>} />
    <Route path='/bookingslot' element={<Slot/>} />

   </Routes>
   </BrowserRouter>
    </div>
  )
}

export default App
