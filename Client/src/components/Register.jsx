import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../../src/redux/features/auth/authapi'; 


const Register = () => {
  const [message, setMessage] = useState('');
  const [username, setUser] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');


const [registerUser,{isloading}]=useRegisterUserMutation()
const navigate=useNavigate();



  const handleRegister = async (e) => {
    e.preventDefault();
    const data = { username, email, password }
    console.log(data)

    try {
      await registerUser(data).unwrap();
      alert("Register succesfull")
      navigate("/login")
      
    } catch (error) {
      setMessage("Register Failed")
    }
  }

  return (
    <section className='h-screen flex items-center justify-center'>
      <div className='max-w-sm border shadow bg-white mx-auto p-8'>
        <h2 className='text-2xl font-semibold pt-5'>Please Register</h2>
        <form onSubmit={handleRegister} className='space-y-5 max-w-sm mx-auto pt-8 '>
          <input
            onChange={(e) => setUser(e.target.value)}
            type="text"
            name="username"
            id="username"
            autoComplete="current-user"
            placeholder='Enter your Name'
            required
            className='w-full bg-gray-100 focus:outline-none px-5 py-3'
          />

          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            id="email"
            autoComplete="current-user"
            placeholder='Email Address'
            required
            className='w-full bg-gray-100 focus:outline-none px-5 py-3'
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
            placeholder='Password'
            autoComplete="current-password"
            required
            className='w-full bg-gray-100 focus:outline-none px-5 py-3'
          />
          {message && <p className='text-red-500'>{message}</p>}

          <button type='submit' className='w-full mt-5 bg-primary text-white hover:bg-indigo-500 font-medium py-3 rounded-md'>Register</button>
        </form>
        <p className='my-5 italic text-sm text-center'>If you have an account ? <Link className='text-red-500' to="/login">Login</Link> here.</p>
      </div>
    </section>
  );
};

export default Register;


