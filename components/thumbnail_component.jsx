import React from 'react'
import Image from 'next/image'
import thumbnail_img from '../public/images/Card.png'



export default function thumbnail({image,title} ) { 
  return (
    <div className='cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out '>
        <img src={image} alt='thumbnail' className='w-full h-full' ></img>
    </div>
  )
}
