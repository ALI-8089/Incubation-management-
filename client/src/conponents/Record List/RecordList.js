import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {serverURL} from "../../constants/constan"
function RecordList() {
  const [newapp, setNewapp] = useState([])

  useEffect(() => {
    axios.get(`${serverURL}/newapplication`).then((response) => {
      
      setNewapp(response.data.application)
    })
  }, [])

  return (
    <div className='row m-5 table-responsive-md'>
     <div className=''>
     <table class="table ">
        <thead>
          <tr>
            <th scope="col">Sl.No</th>
            <th scope="col">Conmpany Name</th>
            <th scope="col">Inubation Type</th>
            <th scope="col">Registration Approved</th>
            <th scope="col">Under Process</th>
            <th scope="col"> Approved</th>
          </tr>
        </thead>
        <tbody>
          {newapp.map((value, index) => (
            <tr>
              <th scope="row">{index + 1}</th>
              <td>{value.companyName}</td>
              <td>{value.incubationtype}</td>
              <td colspan="3">
                <div class="progress">
            {   value.status ==="new" ?  <div
                    class="progress-bar progress-bar-striped bg-danger"
                    role="progressbar"
                    
                    style={{width:"25%" }}
                   
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >25%</div> : value.status ==="pending" ? <div
                  class="progress-bar progress-bar-striped bg-warning"
                  role="progressbar"
                  
                  style={{width:"60%" }}
                 
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >60%</div> :<div
                class="progress-bar bg-success"
                role="progressbar"
                
                style={{width:"100%" }}
               
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              >100%</div>}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     </div>
    </div>
  )
}

export default RecordList
