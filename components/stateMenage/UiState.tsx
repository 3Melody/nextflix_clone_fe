'use client';
import React from 'react';
import netflixLogo from '../../public/images/nexflix_logo.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type UiStateProps = {
  loading?: boolean;
  error?: string;
  linerLoading?: boolean;
  loadingOverlay?: boolean;
};

const UiState: React.FC<UiStateProps> = ({ loading, error ,linerLoading,loadingOverlay }) => {

  const router = useRouter();
      
  if (loading) {
    return (
      <div className="fixed inset-0 flex flex-col bg-black items-center justify-center p-4 z-50">
        <div className="w-20 h-20 border-5 border-transparent  border-t-red-500 rounded-full animate-spin mb-2"></div>
      </div>
    );
  }

    if (loadingOverlay) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center p-4 z-50">
        <div className="w-20 h-20 border-5 border-transparent  border-t-red-500 rounded-full animate-spin mb-2"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center fixed inset-0 w-full h-full z-20 bg-black justify-center p-4">
        <div className='flex flex-col items-center mb-4 gap-3'>
            <Image src={netflixLogo} alt="logo" width={300} height={300}></Image>
            <div className='text-2xl font-bold mt-8'>Someting went wrong... </div>
            <div className='font-bold flex md:flex-row flex-col  gap-3'>
                <button className='w-50 py-3 border rounded-md' onClick={() => window.location.reload()}>Try Again</button>
                <button className='w-50  py-3 bg-white rounded-md text-black'>More Details</button>

            </div>
        </div>
      </div>
    );
  }

if (linerLoading) {
  return (
    <div className="flex flex-col items-center justify-center z-50 w-full">
      <div className="relative w-full h-1 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="absolute h-1 bg-red-600 w-1/3"
          style={{
            animation: 'loading 1.5s ease-in-out infinite',
          }}
        ></div>
      </div>

      <style jsx>{`
        @keyframes loading {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}


};

export default UiState;
