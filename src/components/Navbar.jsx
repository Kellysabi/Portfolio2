import React from 'react'
import { NavLink} from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
      <header className='header'>
        <NavLink to='/' className='w-10 h-10 rounded-full bg-white items-center justify-center flex font-bold shadow-md'>
            <p className='blue-gradient_text'>
               KEA  
            </p>
        </NavLink>
        <nav className='flex text-lg gap-7 font-medium'>
            <NavLink to='/about' className={({isActive})=> isActive ? 'text-blue-600' : 'text-black'}>About</NavLink>
            <NavLink to='/projects' className={({isActive})=> isActive ? 'text-blue-600' : 'text-black'}>Project</NavLink>
            <NavLink to='/contact' className={({isActive})=> isActive ? 'text-blue-600' : 'text-black'}>Contact</NavLink>


        </nav>
       
        
      </header>
      
    </div>
  )
}

export default Navbar
