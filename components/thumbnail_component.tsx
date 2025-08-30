'use client';

import React, { useState } from 'react'
import Image from 'next/image'
import Thumbnail_img from '../public/images/logo_mobile.png'

interface ThumbnailProps {
  image: string;
  title: string;
}

export default function Thumbnail({ image, title }: ThumbnailProps) { 
  const [loading, setLoading] = useState(true);

  return (
   <div className="cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out h-full relative">
      {image ? (
        <>
          {/* Loading overlay */}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white font-bold">
              Loading...
            </div>
          )}

          {/* Image */}
         <div className='relative w-full h-50 sm:h-60 md:h-80 xl:h-80'>
            <Image
              src={image}
              alt={title}
              className="object-cover"
              fill
              loading="lazy"
              onLoad={() => setLoading(false)}
              onError={() => setLoading(false)}
            />
         </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-full font-bold text-xl bg-black text-center text-white">
          {title}
        </div>
      )}
    </div>
  );
}
