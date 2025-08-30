'use client';

import React from 'react'
import Image from 'next/image'
import thumbnail_img from '../public/images/Card.png'

interface ThumbnailProps {
  image: string;
  title: string;
}

export default function Thumbnail({ image, title }: ThumbnailProps) { 
  return (
    <div className='cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out '>
        <img src={image} alt={title} className='w-full h-full' />
    </div>
  )
}
