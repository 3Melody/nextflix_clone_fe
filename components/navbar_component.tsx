'use client';

import React , { useState } from 'react'
import Image from 'next/image'
import logo_netflix from '../public/images/nexflix_logo.png'
import logo_netflix_mobile from '../public/images/logo_mobile.png'
import { useRouter } from 'next/navigation';
import UiState from './stateMenage/UiState';
import { useUi } from '../components/stateMenage/UiProvider';


export default function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const router = useRouter();
  const [keyword , setKeyword] = useState('');
 const { setLoadingOverlay, setError } = useUi();
  
  const handleSearchIconClick = () => {
    setShowSearch(!showSearch);
  }

  const routetoSearch = (e : any) => {
    console.log("🚀 ~ routetoSearch ~ e:", e)
    const query = e
    if (query.trim()) {
      setLoadingOverlay(true);
      localStorage.setItem('lastSearch', query);
      window.dispatchEvent(new Event('lastSearchChange'));
      router.push(`/search`);
    }
  }

  const routeToHome = () => {
    router.push('/');
  }
  return (
    <div className='md:py-2 py-8 px-14 bg-linear-to-b h-20 from-black to-transparent '> 
        <div className='flex justify-between h-16'>
          <div className='flex items-center'>
            <Image onClick={routeToHome} src={logo_netflix} alt='logo' width={100} className='cursor-pointer object-contain hidden md:block'/>
            <Image onClick={routeToHome} src={logo_netflix_mobile} alt='logo' width={20}  className='cursor-pointer object-contain block md:hidden'/>
            <ul className='xl:flex gap-8 ml-10 hidden '>
              <li onClick={routeToHome} className='hover:text-red-500'>Home</li>
              <li  className='hover:text-red-500'>TV Shows</li>
              <li  className='hover:text-red-500'>Movies</li>
              <li  className='hover:text-red-500'>New & Popular</li>
              <li  className='hover:text-red-500'>My List</li>
            </ul>
          </div>
          <div className='flex items-center gap-6'>
           {showSearch && ( <div><input type="text" className='px-2 py-1 rounded border hidden xl:block' placeholder='Search' onKeyDown={(e) => e.key === 'Enter' && routetoSearch(e.currentTarget.value) } /></div>)}
            <i onClick={handleSearchIconClick} className="fa-solid fa-magnifying-glass cursor-pointer"></i>
            <p className='text-sm cursor-pointer hidden md:inline'>Kids</p>
            <i className="fa-solid fa-bell cursor-pointer"></i>
            <i className="fa-solid fa-user cursor-pointer"></i>
            {/* <Image src="https://occ-0-1723-92.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABUZzFqk0mKp8xfMZ-PYv2oq3H8g0e-7fM4qkXG7xJ3bFfXqWn2sU3vWM0WchzU3rXnXoJQWnU1vX7P4DFg.png?r=1cf" alt="profile" width={30} height={30} className='cursor-pointer rounded'/> */}
          </div>
        </div>
        <div className='flex flex-col w-full items-center sm:items-end'>
           {showSearch && ( <div className='flex gap-2 sm:w-full sm:justify-end xl:hidden'>
            <input type="text" className='px-2 py-1 rounded border bg-black opacity-70 sm:w-full' placeholder='Search' onChange={(e) => setKeyword(e.currentTarget.value) } />
            <button onClick={() => routetoSearch(keyword)} className='bg-white text-black px-3 py-2 rounded'>Search</button>
            </div>)}
           <ul className='xl:hidden gap-8  flex justify-center mt-4 '>
              <li className='text-nowrap'>TV Shows</li>
              <li>Movies</li>
              <li>Categories</li>
            </ul>
        </div>
    </div>
  )
}
