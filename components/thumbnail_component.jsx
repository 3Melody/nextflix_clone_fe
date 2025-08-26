import React from 'react'
import Image from 'next/image'
import thumbnail_img from '../public/images/Card.png'



export default function thumbnail({image,title} ) { 
  return (
    <div>
        <Image src={image} alt='thumbnail' width={300} ></Image>
    </div>
  )
}
