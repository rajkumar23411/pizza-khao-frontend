import React from 'react'
import { NavLink } from 'react-router-dom'
import MopedOutlinedIcon from '@mui/icons-material/MopedOutlined';

const Navbar = () => {
    return (
      <div className=' w-full flex items-center justify-between px-8 py-3'>
            <div>
                    <img src="/images/logo.png" alt="logo dark" className='h-12'/>
          </div>
          <div className='flex items-center justify-center gap-8'>
                  <NavLink className="font-medium text-sm uppercase tracking-wider font-sans text-gray-700" to="/">Home</NavLink>
                  <NavLink className="font-medium text-sm uppercase tracking-wider font-sans text-gray-700" to="/menu">Menu</NavLink>
                  <NavLink className="font-medium text-sm uppercase tracking-wider font-sans text-gray-700" to="/orders">Orders</NavLink>
                <NavLink className="font-medium text-sm uppercase tracking-wider font-sans text-gray-700 flex items-center justify-center" to="/cart">
                    <div className='relative'>
                        <MopedOutlinedIcon fontSize='medium' />
                        <p className='absolute top-[-0.7rem] left-[-0.7rem] bg-red-500 text-white h-5 w-5 rounded-full flex items-center justify-center'>5</p>
                    </div>
                    Cart
                </NavLink>
                  {/* <NavLink className="font-medium text-sm uppercase tracking-wider font-sans text-gray-700" to="/contact">Contact</NavLink> */}
          </div>
      </div>
  )
}

export default Navbar