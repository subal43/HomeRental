import React from 'react'

const About = () => {
  return (
    <div className='flex w-[44rem] sm:w-[57rem] md:w-[68rem] xl:w-[76rem] flex-col justify-center items-center text-center animate-fade-in-up'>
      <h1 className='text-4xl font-sans font-bold text-gray-700 animate-zoom-in'>About</h1>

      <div className='flex mt-10 flex-col md:flex-row gap-4 md:gap-6 xl:gap-9 w-[39rem] md:w-[59rem] xl:w-[60rem] items-center'>
        <div className='w-80 h-48 rounded-tl-3xl rounded-br-3xl rounded-bl-3xl px-3 py-3 shadow-top-lg animate-zoom-in'>
          <img
            className="w-full h-full object-cover rounded-tl-3xl rounded-br-3xl rounded-bl-3xl"
            src='home1.jpg'
            alt='home'
          />
        </div>

        <div className='w-[35rem] flex flex-col justify-between items-center h-48 animate-fade-in-up'>
          <h2 className='text-2xl font-bold'>We provide the best rent service for you!</h2>
          <p className='font-semibold text-gray-700'>
            We offer a reliable and easy-to-use rental service where customers can find apartments, houses, or rooms that match their needs and budget. Whether you're looking for a short-term stay or a long-term home, our platform helps you connect with property owners directly, making the rental process fast, transparent, and hassle-free for everyone.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About
