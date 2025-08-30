'use client';

import React from 'react'
import Image from 'next/image'
import Thumbnail_img from '../public/images/logo_mobile.png'

interface ThumbnailProps {
  image: string;
  title: string;
}

export default function Thumbnail({ image, title }: ThumbnailProps) { 
  return (
    <div className='cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out h-full'>
    {image ? (  <img src={image} alt={title} className='w-full h-full object-cover' /> ) : (
      <div className='flex justify-center items-center h-full font-bold text-xl bg-black'>{title}</div>
    )}
    </div>
  )
}
