//import useState hook to create menu collapse state
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
//import react pro sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from 'react-pro-sidebar'

//import icons from react icons
import { FaList, FaRegHeart } from 'react-icons/fa'
import {
  FiHome,
  FiLogOut,
  FiArrowLeftCircle,
  FiArrowRightCircle,
} from 'react-icons/fi'
import { RiPencilLine } from 'react-icons/ri'
import { BiCog } from 'react-icons/bi'

//import sidebar css from react-pro-sidebar module and our custom css
import 'react-pro-sidebar/dist/css/styles.css'
import './Sidebar.css'

const Sidebar = () => {
  //create initial menuCollapse state using useState hook
  const [menuCollapse, setMenuCollapse] = useState(false)

  //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true)
  }

  const navigate = useNavigate()
  const ApplicationList = () => {
    navigate('/admin')
  }

  const Record = () => {
    navigate('/recordlist')
  }
  const Slot = () => {
    navigate('/bookingslot')
  }
  return (
    <>
      <div id="header">
        {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
            <div className="closemenu" onClick={menuIconClick}>
              {/* changing menu collapse icon on click */}
              {menuCollapse ? <FiArrowRightCircle /> : <FiArrowLeftCircle />}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem
                active={true}
                onClick={ApplicationList}
                icon={<FiHome />}
              >
                Home
              </MenuItem>
              <MenuItem icon={<FaList />} onClick={Record}>
                Record List
              </MenuItem>
              <MenuItem icon={<FaRegHeart />} onClick={Slot}>
                Slot Booking
              </MenuItem>
             
            </Menu>
          </SidebarContent>
        </ProSidebar>
      </div>
    </>
  )
}

export default Sidebar
