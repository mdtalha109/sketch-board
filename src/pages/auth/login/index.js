'use client'

import React, { useRef } from 'react';

import Button from '@/components/ui/Button/Button';
import Card from '@/components/ui/Card/Card';
import Input from '@/components/ui/Input/Input';
import Link from 'next/link';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/router';

const Index = () => {
  const router = useRouter();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleLogin = async() => {

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if(!email.length || !password.length){
      toast.error("All fields are required")
      return
    }

    try {
      const response = await axios.post('http://localhost:4000/api/auth/login', {
        email,
        password,
      });
    
      if (response.status === 200) {
        toast.success("Login Sucessfully")
        const user = response.data;
        router.push('/');
      } else {
        console.error('Authentication failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during authentication:', error);
    }

    
  };

  return (
    <div className='h-[100vh] flex justify-center items-center'>
      <Card className='p-6 flex flex-col gap-4 w-[25vw] border border-gray-300 shadow-md rounded-2xl'>
        <h1 className='text-2xl font-bold text-center'>Sign In</h1>
        <span className='text-center text-gray-600'>Don&apos;t have an account yet? <Link href='signup' className='text-blue-800'>Sign up here</Link></span>
        
        <div>
          {/* Attach the ref to the email input */}
          <Input ref={emailRef} type='text' label="Email" id="email" placeholder='Please enter your email' />
        </div>

        <div>
          {/* Attach the ref to the password input */}
          <Input ref={passwordRef} type='Password' label="Password" id="password" placeholder='Please enter your password' />
        </div>

        <div>
          <Button onClick={handleLogin} className='w-full'>Sign in</Button>
        </div>
      </Card>
    </div>
  );
};

export default Index;
