import React, { useState } from 'react';


import { FaSearch, FaChevronDown } from "react-icons/fa";










function Rent() {
  const [showBudget, setShowBudget] = useState(false);
  const [showBedroom, setShowBedroom] = useState(false);
  const [showCategory, setShowCategory] = useState(false);

  const toggleBudget = () => {
    setShowBudget(!showBudget);
    setShowBedroom(false);
    setShowCategory(false);
  };

  const toggleBedroom = () => {
    setShowBedroom(!showBedroom);
    setShowBudget(false);
    setShowCategory(false);
  };

  const toggleCategory = () => {
    setShowCategory(!showCategory);
    setShowBudget(false);
    setShowBedroom(false);
  };





  return (
    <div className="p-5 min-h-screen bg-gray-100">
      {/* Search Bar */}
      <div className="flex justify-center items-center">
        <div className="flex items-center my-12 w-[42rem] bg-white shadow-xl rounded-full px-6 py-3 transition-all duration-300 hover:shadow-2xl">
          <FaSearch className="text-gray-700 text-lg" />
          <input
            type='text'
            className='w-full px-5 py-3 bg-transparent text-gray-700 placeholder-gray-400 border-none focus:outline-none focus:ring-0'
            placeholder='Search Location'
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex justify-center gap-6 flex-wrap">
        {/* Filter Button Component */}
        {[
          {
            label: "Budget",
            show: showBudget,
            toggle: toggleBudget,
            options: [
              "₹500 - ₹1000",
              "₹1001 - ₹3000",
              "₹3001 - ₹5000",
              "₹5001 - ₹7000",
              "₹7000 and above"
            ],
            width: "w-64"
          },
          {
            label: "Bedrooms",
            show: showBedroom,
            toggle: toggleBedroom,
            options: ["1 BHK", "2 BHK", "3 BHK", "4+ BHK"],
            width: "w-48"
          },
          {
            label: "Room Category",
            show: showCategory,
            toggle: toggleCategory,
            options: ["Single Room", "Double Room", "Family Room"],
            width: "w-56"
          }
        ].map(({ label, show, toggle, options, width }, index) => (
          <div key={index} className="relative">
            <button
              onClick={toggle}
              className="bg-indigo-100 text-gray-800 px-5 py-3 rounded-full shadow-md hover:bg-indigo-200 flex items-center gap-2 transition-all duration-200 font-medium"
            >
              {label} <FaChevronDown className="text-sm" />
            </button>
            {show && (
              <div
                className={`absolute mt-3 bg-white border border-gray-200 rounded-xl shadow-2xl ${width} z-20 animate-fade-in`}
              >
                <ul className="divide-y divide-gray-100">
                  {options.map((option, i) => (
                    <li
                      key={i}
                      className="p-3 hover:bg-indigo-50 cursor-pointer text-gray-700 transition-colors duration-200"
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* show the protrices */}
      <div>

       </div>
    </div>
  );


}

export default Rent;
