import React, { useRef } from 'react';
import { signIn } from 'next-auth/react';
import Button from '@/components/ui/Button/Button';
import Card from '@/components/ui/Card/Card';
import Input from '@/components/ui/Input/Input';
import Link from 'next/link';
import toast from 'react-hot-toast';
import axios from 'axios';

const Index = () => {
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const handleSignup = async () => {
    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value

    if (!(username && email && password && confirmPassword)) {
      toast.error("All fields are required!");
    }

    try {
      const response = await axios.post('http://localhost:4000/api/auth/signup', {
        username,
        email,
        password,
      });

      if (response.status === 200) {
        const user = response.data;
       toast.success("Account successfully created, Please login to continue")
        // Redirect or perform other actions on successful login
      } else {
        console.error('Authentication failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during authentication:', error.response.data.error);
      toast.error(error.response.data.error)
    }
  };

  return (
    <div className='h-[100vh] flex justify-center items-center'>
      <Card className='p-6 flex flex-col gap-4 w-[25vw] border border-gray-300 shadow-md rounded-2xl'>
        <h1 className='text-2xl font-bold text-center'>Sign Up</h1>
        <span className='text-center text-gray-600'>
          Already have an account? <Link href='login' className='text-blue-800'>Sign In here</Link>
        </span>

        <div>
          <Input ref={usernameRef} type='text' label="Username" id="username" placeholder='Please enter your username' />
        </div>

        <div>
          <Input ref={emailRef} type='text' label="Email" id="email" placeholder='Please enter your email' />
        </div>

        <div>
          <Input ref={passwordRef} type='password' label="Password" id="password" placeholder='Please enter your password' />
        </div>

        <div>
          <Input ref={confirmPasswordRef} type='password' label="Comfirm Password" id="comfirm-password" placeholder='Please confirm your password' />
        </div>

        <div>
          <Button onClick={handleSignup} className='w-full'>Create new account</Button>
        </div>
      </Card>
    </div>
  );
};

export default Index;
