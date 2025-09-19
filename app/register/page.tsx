'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import bg from '../../public/images/back_login.jpg';
import { useRouter } from 'next/navigation';
import { useUi } from '@/components/stateMenage/UiProvider';

export default function Page() {
  const apiUrl = process.env.NEXT_PUBLIC_DOTNET_PUBLIC_API_URL;
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [PasswordHash, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { setLoading } = useUi();

  const handleSignUp = async () => {
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`${apiUrl}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, PasswordHash , email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Something went wrong');
        return;
      }

      setSuccess('User registered successfully!');
      setUsername('');
      setPassword('');
      setEmail('');
       router.push('/login');
    } catch (err) {
      console.error(err);
      setError('Something went wrong');
    }
  };

  return (
    <div className='relative h-screen'>
      <Image src={bg} alt="background" className="object-cover" fill />
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        <div className='bg-black/80 rounded p-10'>
          <div className='w-80 flex flex-col gap-4'>
            <div className='text-white text-3xl font-bold'>Sign Up</div>

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
              value={PasswordHash}
              onChange={(e) => setPassword(e.target.value)}
            />

               <input
              type="email"
              placeholder='Email'
              className='p-4 border rounded'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {error && <div className='text-red-500 text-center'>{error}</div>}
            {success && <div className='text-green-500 text-center'>{success}</div>}

            <button
              className='bg-red-500 p-3 rounded'
              onClick={handleSignUp}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
