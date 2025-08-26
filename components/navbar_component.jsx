import React from 'react'
import Image from 'next/image'
import logo_netflix from '../public/images/nexflix_logo.png'
import logo_netflix_mobile from '../public/images/logo_mobile.png'

export default function navbar() {
  return (
    <div className='md:py-4 py-8 px-14 bg-linear-to-b from-black to-transparent '> 
        <div className='flex justify-between'>
          <div className='flex items-center'>
            <Image src={logo_netflix} alt='logo' width={100} className='cursor-pointer object-contain hidden md:block'/>
            <Image src={logo_netflix_mobile} alt='logo' width={20}  className='cursor-pointer object-contain block md:hidden'/>
            <ul className='md:flex gap-8 ml-10 hidden '>
              <li>Home</li>
              <li>TV Shows</li>
              <li>Movies</li>
              <li>New & Popular</li>
              <li>My List</li>
            </ul>
          </div>
          <div className='flex items-center gap-6'>
            <i className="fa-solid fa-magnifying-glass cursor-pointer"></i>
            <p className='text-sm cursor-pointer hidden md:inline'>Kids</p>
            <i className="fa-solid fa-bell cursor-pointer"></i>
            <i className="fa-solid fa-user cursor-pointer"></i>
            {/* <Image src="https://occ-0-1723-92.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABUZzFqk0mKp8xfMZ-PYv2oq3H8g0e-7fM4qkXG7xJ3bFfXqWn2sU3vWM0WchzU3rXnXoJQWnU1vX7P4DFg.png?r=1cf" alt="profile" width={30} height={30} className='cursor-pointer rounded'/> */}
          </div>
        </div>
        <div>
           <ul className='md:hidden gap-8  flex justify-center mt-4 '>
              <li className='text-nowrap'>TV Shows</li>
              <li>Movies</li>
              <li>Categories</li>
            </ul>
        </div>
    </div>
  )
}
