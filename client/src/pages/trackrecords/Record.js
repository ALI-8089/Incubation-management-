import React from 'react'
import Header from '../../conponents/header/Header'
import RecordList from '../../conponents/Record List/RecordList'
import Sidebar from '../../conponents/sidebar/Sidebar'

function Record() {
  return (
    <div className="">
      <Header />
      <div className="row">
       <div className="col-1">
        <Sidebar/>
       </div>
       <div className="col-11">
       <RecordList />
       </div>
       
      </div>
    </div>
  )
}

export default Record