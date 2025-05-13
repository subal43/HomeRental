import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaXmark } from "react-icons/fa6";
import { useAuth } from '../Contexs/btnContex';
import Swal from 'sweetalert2';

const SignUp: React.FC = () => {
    const navigate = useNavigate();
    const [fname, setFname] = useState<string>("");
    const [lname, setLname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const { isAuthenticated, setIsAuthenticated } = useAuth();

    const handleSignUp = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log("First Name:", fname);
        console.log("Last Name:", lname);
        console.log("Email:", email);
        console.log("Password:", password);

        setIsAuthenticated(true);

        Swal.fire({
            title: "SignUp successful",
            icon: "success",
            confirmButtonText: "OK",
            buttonsStyling: false,
            customClass: {
                confirmButton: "bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            }
        });

        navigate('/');
    };

    const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) => 
        (e: ChangeEvent<HTMLInputElement>) => setter(e.target.value);

    return (
        <div className='max-w-7xl m-auto p-8 text-center bg-white'>
            <div className='flex justify-center items-center p-6 bg-gray-100 min-h-screen'>
                <div className='w-72 sm:w-96 relative bg-white border rounded-lg shadow-lg px-2 py-7 flex flex-col justify-between'>
                    <Link to="/" className='absolute right-4 top-6 hover:text-lg'>
                        <FaXmark />
                    </Link>
                    <div className='mb-5'>
                        <h1 className='text-gray-800 text-3xl font-bold'>Sign up</h1>
                        <p className='mt-2 text-gray-500 font-medium'>
                            Enter your information to create an<br /> account
                        </p>
                    </div>
                    <form onSubmit={handleSignUp} className='flex flex-col justify-evenly items-center p-6'>
                        {/* First Name */}
                        <div className="w-64">
                            <div className='w-full flex items-center text-gray-700 font-semibold'>
                            <label htmlFor="Fname" className="text-gray-700 font-semibold">First Name:</label>

                            </div>
                            <input
                                type="text"
                                name="Fname"
                                id="Fname"
                                value={fname}
                                onChange={handleChange(setFname)}
                                autoComplete="given-name"
                                required
                                className="w-full border border-gray-400 mt-2 px-2 py-2 rounded text-gray-700 bg-white font-medium focus:outline-none focus:border-green-800"
                            />
                        </div>

                        {/* Last Name */}
                        <div className="w-64">
                            <div className='w-full flex items-center text-gray-700 font-semibold'>

                            <label htmlFor="Lname" className="text-gray-700 font-semibold">Last Name:</label>
                            </div>
                            <input
                                type="text"
                                name="Lname"
                                id="Lname"
                                value={lname}
                                onChange={handleChange(setLname)}
                                autoComplete="family-name"
                                required
                                className="w-full border border-gray-400 mt-2 px-2 py-2 rounded text-gray-700 bg-white font-medium focus:outline-none focus:border-green-800"
                            />
                        </div>

                        {/* Email */}
                        <div className="w-64">
                            <div className='w-full flex items-center text-gray-700 font-semibold'>

                            <label htmlFor="email" className="text-gray-700 font-semibold">Email:</label>
                            </div>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={email}
                                onChange={handleChange(setEmail)}
                                autoComplete="email"
                                required
                                className="w-full border border-gray-400 mt-2 px-2 py-2 rounded text-gray-700 bg-white font-medium focus:outline-none focus:border-green-800"
                            />
                        </div>

                        {/* Password */}
                        <div className="w-64">
                            <div className='w-full flex items-center text-gray-700 font-semibold'>
                            <label htmlFor="psw" className="text-gray-700 font-semibold">Password:</label>

                            </div>
                            <input
                                type="password"
                                name="password"
                                id="psw"
                                value={password}
                                onChange={handleChange(setPassword)}
                                autoComplete="new-password"
                                required
                                className="w-full border border-gray-400 mt-2 px-2 py-2 rounded text-gray-700 bg-white font-medium focus:outline-none focus:border-green-800"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className='w-64'>
                            <button
                                type="submit"
                                className='w-full mt-4 bg-green-700 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-900 focus:outline-none transition duration-300 ease-in-out'
                            >
                                Sign up
                            </button>
                        </div>

                        {/* Login Link */}
                        <div className='w-64 gap-2 mt-2 flex items-center'>
                            <p className='text-gray-600 text-sm font-medium'>Already have an account?</p>
                            <Link to="/Login" className='text-gray-600 text-sm font-medium hover:text-green-900 hover:underline'>
                                Login
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
