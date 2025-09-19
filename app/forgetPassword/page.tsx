'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUi } from '@/components/stateMenage/UiProvider';
import Image from 'next/image';
import forget_bg from '../../public/images/forget_bg.jpg';
import logo from '../../public/images/nexflix_logo.png';

export default function ForgetPassword() {
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_DOTNET_PUBLIC_API_URL;

  const [step, setStep] = useState(1); // ขั้นตอน 1: email+username, 2: otp, 3: new password
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const { setLoadingOverlay } = useUi();

  // ส่ง OTP
  const handleSendOtp = async () => {
    setError('');
    try {
        setLoadingOverlay(true);
      const res = await fetch(`${apiUrl}/api/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email }),
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.message || 'Something went wrong');
        setLoadingOverlay(false);
        return;
      }

      setMessage('OTP sent to your email');
      setStep(2);
      setLoadingOverlay(false);
    } catch (err) {
      console.error(err);
      setError('Something went wrong');
    }
  };

  // ตรวจสอบ OTP
  const handleVerifyOtp = async () => {
    setError('');
    try {
      const res = await fetch(`${apiUrl}/api/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, otp }),
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.message || 'Invalid OTP');
        return;
      }

      setMessage('OTP verified, set new password');
      setStep(3);
    } catch (err) {
      console.error(err);
      setError('Something went wrong');
    }
  };

  // ตั้งรหัสผ่านใหม่
  const handleResetPassword = async () => {
    setError('');
    try {
      const res = await fetch(`${apiUrl}/api/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, newPassword }),
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.message || 'Something went wrong');
        return;
      }

      setMessage('Password reset successfully');
      setTimeout(() => router.push('/login'), 1500);
    } catch (err) {
      console.error(err);
      setError('Something went wrong');
    }
  };

  return (
    <div className="relative h-screen">
      <Image src={forget_bg} alt="background" className="object-cover" fill />
    <div className='absolute left-10 top-10'><Image src={logo} alt="logo" className="object-cover" width={100} height={100} /></div>
    <div className='absolute right-10 top-10'><button onClick={() => router.push('/login')} className='bg-red-500 p-3 px-10 rounded text-white font-bold'>Sign In</button></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="bg-white p-8 rounded-lg w-96 flex flex-col gap-4 z-10">
          <h2 className="text-2xl text-black font-bold text-center">
            Forget Password
          </h2>

          {step === 1 && (
            <>
              <input
                type="text"
                placeholder="Username"
                className="p-3 rounded border text-black"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                className="p-3 rounded border text-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                onClick={handleSendOtp}
                className="bg-red-500 p-3 rounded text-white font-bold"
              >
                Send OTP
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                className="p-3 rounded border text-black"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button
                onClick={handleVerifyOtp}
                className="bg-red-500 p-3 rounded text-white font-bold"
              >
                Verify OTP
              </button>
            </>
          )}

          {step === 3 && (
            <>
              <input
                type="password"
                placeholder="New Password"
                className="p-3 rounded border text-black"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                onClick={handleResetPassword}
                className="bg-red-500 p-3 rounded text-white font-bold"
              >
                Reset Password
              </button>
            </>
          )}

          {error && <div className="text-red-500 text-center">{error}</div>}
          {message && (
            <div className="text-green-400 text-center">{message}</div>
          )}
        </div>
      </div>
    </div>
  );
}
