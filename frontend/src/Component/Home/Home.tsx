import React from 'react';

export default function Home() {
  return (
    <div className="w-[46rem] sm:w-[57rem] md:w-[70rem] lg:w-[77rem] flex flex-col md:flex-row md:justify-around items-center px-4 py-6 space-y-4 lg:gap-8">
      
      <div className="w-[20rem] h-[24rem] rounded-br-3xl rounded-tl-3xl px-3 py-3 mt-4 mr-3 overflow-hidden shadow-top-lg order-1 md:order-2 animate-zoom-in">
        <img
          className="w-full h-full object-cover rounded-br-3xl rounded-tl-3xl"
          src="home3.jpg"
          alt="home"
        />
      </div>

   
      <div className="w-[35rem] flex flex-col items-center gap-3 text-center order-2 md:order-1 animate-fade-in-up">
        <h1 className="text-5xl font-sans font-bold text-gray-700">
          Find Your <span className="text-orange-800">Next Perfect Place</span> To Live ..
        </h1>
        <p className="font-semibold text-md text-gray-600">
          We provide the best and easiest rent service.
        </p>
      </div>
    </div>
  );
}
