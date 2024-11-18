import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typewriter } from 'react-simple-typewriter';
import Filter from '../components/Filter/Filter';
import Featured from '../components/Featured/Featured';

const Home = () => {
    const [hotels, setHotels] = useState([]);

  return (
    <div>
      {/* Hero */}
       <div className='relative w-full xl:h-screen h:40'>
          <img src='https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
               alt='Featured image' className='w-full h-full object-cover'></img>
          <div className='absolute inset-0 bg-black/50'></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center h-full">
             <span className='text-white text-2xl xl:text-5xl ml-14 tracking-wide'>
                <Typewriter
                 words={['Book Better, Stay Better']}
                 typeSpeed={70}
                 deleteSpeed={50}
                 delaySpeed={2000}              
               />
              </span>

              <Filter />
          </div>
       </div>

       <Featured />
    </div>
  )
}

export default Home