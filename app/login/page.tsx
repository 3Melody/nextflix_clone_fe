'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import bg from '../../public/images/back_login.jpg';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_DOTNET_PUBLIC_API_URL;

  const [username, setUsername] = useState('');
  const [passwordHash, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, passwordHash }),
      });

      if (!response.ok) {
        setError('Invalid username or password');
        return;
      }

      const data = await response.json();
      const token = data.token;

      // เก็บ token ไว้ localStorage
      localStorage.setItem('authToken', token);

      // redirect หลัง login
      router.push('/');
    } catch (err) {
      console.error(err);
      setError('Something went wrong');
    }
  };

  return (
    <div className='relative h-screen'>
      <Image src={bg} alt="logo" className="object-cover" fill />
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        <div className='bg-black/80 rounded p-10'>
          <div className='w-80 flex flex-col gap-4'>
            <div className='text-white text-3xl font-bold'>Sign In</div>
            <input
              type="text"
              placeholder='Username'
              className='p-4 border rounded'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder='Password'
              className='p-4 border rounded'
              value={passwordHash}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div onClick={() => router.push('/forgetPassword')} className='text-white text-end cursor-pointer underline'>Forgot password?</div>
            {error && <div className="text-red-500 text-center">{error}</div>}
            <button
              onClick={handleLogin}
              className='bg-red-500 p-3 rounded'
            >
              Sign In
            </button>
            <div className='text-white text-center'>OR</div>
            <button
              onClick={() => router.push('/register')}
              className='bg-gray-500 p-3 rounded'
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
