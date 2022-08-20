import React from 'react'
import Header from '../../conponents/header/Header'
import Sidebar from '../../conponents/sidebar/Sidebar'
import SlotBooking from '../../conponents/Slot  Booking/SlotBooking'

function Slot() {
  return (
    <div className="">
    <Header />
    <div className="row">
     <div className="col-1">
      <Sidebar/>
     </div>
     <div className="col-11">
     <SlotBooking />
     </div>
     
    </div>
  </div>
  )
}

export default Slot