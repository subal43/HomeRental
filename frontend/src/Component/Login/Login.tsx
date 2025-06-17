import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaXmark } from "react-icons/fa6";
import { useAuth } from '../Contexs/btnContex';
import Swal from 'sweetalert2';

const Login: React.FC = () => {
 const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const { setIsAuthenticated  } = useAuth();
  const navigate = useNavigate();



  useEffect(() => {
    setEmail('');
    setPassword('');
  }, []);

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email === 'tamalsarkar499@gmail.com' && password === 'password123') {
      setIsAuthenticated(true);
      setIsAnimating(true); // Start animation
     
      setTimeout(() => {
        Swal.fire({
          title: "Login successful",
          icon: "success",
          confirmButtonText: "OK",
          buttonsStyling: false,
          customClass: {
            confirmButton: "bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          }
        });
        navigate('/');
      }, 500); // Delay to let the animation play
    } else {
      Swal.fire({
        title: "Invalid email or password",
        icon: "error",
        confirmButtonText: "OK",
        buttonsStyling: false,
        customClass: {
          confirmButton: "bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        }
      });
    }
  };


  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => e.target.classList.remove('focus:border-green-800');

  return (
    <div className='max-w-7xl m-auto p-8 text-center bg-white'>
      <div className={`flex justify-center items-center p-6 bg-gray-100 min-h-screen transform transition-transform duration-500 ${isAnimating ? 'translate-y-full' : ''}`}>
        <div className='w-72 sm:w-96 relative bg-white border rounded-lg shadow-lg px-2 py-7 h-[30rem] flex flex-col justify-between'>
          <Link to="/" className='absolute right-4 top-6 hover:text-lg'>
            <FaXmark />
          </Link>
          <div className='text-center'>
            <h1 className='text-gray-800 text-3xl font-bold'>Login</h1>
            <p className='mt-2 text-gray-500 font-medium'>
              Enter your credentials to access your <br /> account
            </p>
          </div>
          <form
            onSubmit={handleLogin}
            className='flex flex-col justify-evenly h-80 items-center p-6'
          >
            <div className="w-64 flex flex-col items-start">
              <label htmlFor="email" className="text-gray-700 font-semibold">Email:</label>
              <input
                type="email"
                name="email"
                id="email"
                className="w-full border border-gray-400 mt-2 px-2 py-2 rounded text-gray-700 bg-white font-medium focus:outline-none focus:border-green-800"
                value={email}
                onChange={handleEmailChange}
                onBlur={handleBlur}
                autoComplete="off"
              />
            </div>
            <div className="w-64 flex flex-col items-start">
              <label htmlFor="psw" className="text-gray-700 font-semibold">Password:</label>
              <input
                type="password"
                name="password"
                id="psw"
                className="w-full border border-gray-400 mt-2 px-2 py-2 rounded text-gray-700 bg-white font-medium focus:outline-none focus:border-green-800"
                value={password}
                onChange={handlePasswordChange}
                onBlur={handleBlur}
                autoComplete="off"
              />
            </div>
            <button
              type="submit"
              className='w-64 bg-green-700 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-900 focus:outline-none transition duration-300 ease-in-out'
            >
              Login
            </button>
            <div className='w-64 flex justify-between items-center'>
              <Link to="/signUp" className='text-gray-600 text-sm font-medium hover:text-green-900'>
                Create Account
              </Link>
              <Link to="#" className='text-gray-600 text-sm font-medium hover:text-green-900'>
                Forget Password
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
