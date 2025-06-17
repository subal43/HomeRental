import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../Contexs/btnContex'; // Import the authentication context
import { BsList } from "react-icons/bs";
import { FaXmark } from "react-icons/fa6";
import { useSubmission } from '../Contexs/SubmissionContext';

export const Header = () => {
    const { isAuthenticated, setIsAuthenticated, setUser } = useAuth();
    const [isManuOpen, setIsManuOpen] = useState(false);
    const { hasSubmitted, resetSubmission } = useSubmission();

    const handleLogout = () => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("currentUser");

        // reset admin button visibility
        resetSubmission();
    };




    return (
        <header className='shadow sticky z-50 top-0 w-[46rem] sm:w-[57rem] px-11 bg-white lg:w-full md:w-[70rem] '>
            <nav className='bg-white border-gray-200 px-4 lg:px-6 py-2.5'>
                <div className='flex flex-wrap justify-between items-center mx-auto max-w-screen-xl'>

                    <Link to="/" className="flex items-center">
                        <img src="logo.png" className="mr-3 w-16 h-16 rounded-full" alt="Logo" />
                        <h2 className="text-2xl font-bold text-gray-500">Home<span className='text-red-700'>Rental</span></h2>
                    </Link>
                    <div className='relative left-36 flex justify-between items-center '>
                        <BsList className='absolute right-4 md:left-4 text-3xl lg:hidden block cursor-pointer' onClick={() => setIsManuOpen(!isManuOpen)} />
                    </div>
                    <div className={`absolute xl:hidden top-24 left-0 w-full bg-white flex flex-col items-center gap-7 font-semibold text-lg transform transition-transform ${isManuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5 hidden"}`} style={{ transition: "transform 0.3s ease, opacity 0.3s ease", padding: "2rem" }}>

                        <div >
                            <FaXmark
                                className='absolute sm:right-7 right-4 md:right-20  top-4 text-xl cursor-pointer hover:text-gray-800 transition-all'
                                onClick={() => setIsManuOpen(false)}
                            />

                        </div>

                        <li className='list-none'>
                            <Link to="/" className="  w-full text-center py-3 px-6 rounded-lg hover:bg-green-600 hover:text-white transition-all cursor-pointer">Home</Link>
                        </li>
                        <li className='list-none'>
                            <Link to="/rent" className="  w-full text-center py-3 px-6 rounded-lg hover:bg-green-600 hover:text-white transition-all cursor-pointer">Rent</Link>
                        </li>
                        <li className='list-none'>
                            <Link to="/review" className="  w-full text-center py-3 px-6 rounded-lg hover:bg-green-600 hover:text-white transition-all cursor-pointer">Review</Link>
                        </li>

                        <li className='list-none'>
                            <Link to="/post" className="  text-white  bg-red-600 hover:bg-red-700 font-medium rounded-lg px-4 py-2 text-base cursor-pointer">Post Properties</Link>
                        </li>





                        <li className='list-none'>
                            <div className='flex flex-col items-center md:hidden'>

                                {!isAuthenticated ? (
                                    <div>
                                        <Link to="/Login" className='text-gray-800  bg-gray-100 hover:bg-gray-200 font-medium rounded-lg px-4 py-2 text-sm mr-3'>Log in</Link>
                                        <Link to="/SignUp" className='text-white  bg-red-600 hover:bg-red-700     font-medium rounded-lg px-4 py-2 text-sm '>Sign up</Link>
                                    </div>
                                ) : (
                                    <div>
                                        {isAuthenticated && (
                                            <NavLink to="/admin" className="text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg px-4 py-2 text-sm mr-3">
                                                Admin
                                            </NavLink>
                                        )}


                                        <button
                                            onClick={handleLogout}
                                            className='text-white bg-red-600 hover:bg-red-700  font-medium rounded-lg px-4 py-2 text-sm'>
                                            Log out
                                        </button>

                                    </div>
                                )}
                            </div>


                        </li>



                    </div>


                    {/* large screen */}


                    <div className='flex items-center lg:order-2'>
                        {!isAuthenticated ? (
                            <div className='hidden md:block '>
                                <Link to="/Login" className='text-gray-800   hover:bg-gray-50 font-medium rounded-lg px-4 py-2 text-sm mr-3'>Log in</Link>
                                <Link to="/SignUp" className='text-white  bg-red-600 hover:bg-red-700 font-medium rounded-lg px-4 py-2 text-sm '>Sign up</Link>
                            </div>
                        ) : (
                            <button
                                onClick={handleLogout}
                                className='text-white hidden md:block bg-red-600 hover:bg-red-700 font-medium rounded-lg px-4 py-2 text-sm'>
                                Log out
                            </button>
                        )}
                    </div>

                    <div className=' hidden justify-center items-center w-full lg:flex lg:order-1 lg:w-auto'>
                        <ul className='flex flex-col items-center font-medium mt-4 lg:flex-row lg:space-x-8 lg:mt-0'>
                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        `block py-2 pr-3 pl-4 border-b-2 ${isActive ? "border-green-700 text-gray-800" : "border-transparent text-gray-900"
                                        } hover:border-green-700 hover:text-gray-800 transition-all duration-300 lg:border-0 lg:border-b-2`
                                    }
                                >
                                    Home
                                </NavLink>

                            </li>
                            <li>
                                <NavLink to="/rent" className={({ isActive }) =>
                                    `block py-2 pr-3 pl-4 border-b-2 ${isActive ? "border-green-700 text-gray-800" : "border-transparent text-gray-900"
                                    } hover:border-green-700 hover:text-gray-800 transition-all duration-300 lg:border-0 lg:border-b-2`
                                }>Rent</NavLink>
                            </li>
                            <li>
                                <NavLink to="/review" className={({ isActive }) =>
                                    `block py-2 pr-3 pl-4 border-b-2 ${isActive ? "border-green-700 text-gray-800" : "border-transparent text-gray-900"
                                    } hover:border-green-700 hover:text-gray-800 transition-all duration-300 lg:border-0 lg:border-b-2`
                                }>Review</NavLink>
                            </li>
                            <li>
                                <NavLink to="/post" className="text-white  bg-red-600 hover:bg-red-700 font-medium rounded-lg px-4 py-2 text-sm">Post Properties</NavLink>
                            </li>
                            <li>


                                {hasSubmitted && (

                                    <NavLink to="/admin" className="text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg px-4 py-2 text-sm mr-3">
                                        Admin
                                    </NavLink>
                                )

                                }




                            </li>

                        </ul>
                    </div>

                </div>
            </nav>
        </header>
    );
};
