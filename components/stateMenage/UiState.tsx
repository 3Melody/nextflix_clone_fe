'use client'
import React from 'react';
import { useUi } from './UiProvider';
import Image from 'next/image';
import netflixLogo from '../../public/images/nexflix_logo.png';

const UiState: React.FC = () => {
  const { loading, error, loadingOverlay } = useUi();

  if (loading) {
    return (
      <div className="fixed inset-0 flex flex-col bg-black items-center justify-center p-4 z-50">
        <div className="w-20 h-20 border-5 border-transparent border-t-red-500 rounded-full animate-spin mb-2"></div>
      </div>
    );
  }

  if (loadingOverlay) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center p-4 z-50">
        <div className="w-20 h-20 border-5 border-transparent border-t-red-500 rounded-full animate-spin mb-2"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center fixed inset-0 w-full h-full z-20 bg-black justify-center p-4">
        <div className='flex flex-col items-center mb-4 gap-3'>
          <Image src={netflixLogo} alt="logo" width={300} height={300}/>
          <div className='text-2xl font-bold mt-8'>Something went wrong...</div>
          <div className='font-bold flex md:flex-row flex-col gap-3'>
            <button className='w-50 py-3 border rounded-md' onClick={() => window.location.reload()}>Try Again</button>
            <button className='w-50 py-3 bg-white rounded-md text-black'>More Details</button>
          </div>
        </div>
      </div>
    );
  }

  return null; // ถ้าไม่มี state ก็ไม่ render อะไร
};

export default UiState;
