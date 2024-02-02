import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../../assets/logo.png";

const Navbar = () => {
  return (
    <div>
      <nav className='p-3 bg-white-900 sticky top-0 z-10 dark:bg-gray-bg'>
        <div className='flex items-center justify-between'>
            <Link to="/">
                <img
                    className='h-14 w-auto ml-6'
                    src={logo}
                    draggable={false}
                    alt='Your Company'
                />
            </Link>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
