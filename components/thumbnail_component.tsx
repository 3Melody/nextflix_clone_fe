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
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
            onLoad={() => setLoading(false)}
            onError={() => setLoading(false)}
          />
        </>
      ) : (
        <div className="flex justify-center items-center h-full font-bold text-xl bg-black text-center text-white">
          {title}
        </div>
      )}
    </div>
  );
}
