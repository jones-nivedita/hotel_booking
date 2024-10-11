import React,{useState, useEffect} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const Featured = () => {
    const [hotels, setHotels] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8001/api/hotels?featured=true')
        .then(response => setHotels(response.data))
        .catch(err => console.log('Error retrieving hotel details:',err))
    })
  return (
    <div className='mx-20 my-20'>
        <h1 className='text-lg sm:text-xl lg:text-3xl font-semibold'>Featured Hotels</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-5 gap-6'>
            {hotels.map((h) => (
                <Link to={`/hotels/${h._id}`} key={h._id} className='cursor-pointer'>
                  <div key={h._id} className='flex flex-col shadow-md rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300'>
                    <div className='h-60 w-full'>
                       <img src={`http://localhost:8001/uploads/${h.photos[0]}`}
                              alt={h.name}
                              className='h-full w-full object-cover '></img>
                    </div>
                    <div className='p-2'>
                        <h1 className='py-1 font-semibold text-sm sm:text-md lg:text-lg'>{h.name}</h1>
                        <h1 className='py-1 text-neutral-500'>{h.city}</h1>
                        <h1 className='py-1 font-semibold text-sm sm:text-md'>Starting from {` ₹${h.cheapestPrice}`}</h1>
                    </div>
                  </div>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default Featured