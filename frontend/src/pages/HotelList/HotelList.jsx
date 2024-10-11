import React,{useState, useEffect} from 'react'
import {useLocation, Link} from 'react-router-dom'
import {DateRange} from 'react-date-range'
import { format } from "date-fns";
import axios from 'axios';
import './HotelList.css'
import { FaStar } from "react-icons/fa";

const HotelList = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8001/api/hotels?city=${destination}&min=${min || 0 }&max=${max || 10000}`)
    .then(response => setHotels(response.data))
    .catch(err => console.log('Error fetching hotels:', err));
  }, [hotels])

  return (
    <div className='xl:mx-20 xl:my-20 mt-10'>
       <div className='flex flex-col xl:flex-row space-y-4 xl:space-x-2'>
          <div className='left-container px-6 xl:w-1/4 w-full xl:border-r-2 xl:border-neutral-200'>
             <div className='searchDiv'>
               <label className='label'>Destination</label>
               <input className='searchInput' value={destination} onChange={(e) => setDestination(e.target.value)}></input>
             </div>
             <div className='searchDiv'>
               <label className='label'>Dates</label>
               <span className='searchInput' onClick={() => setOpenDate(!openDate)}>{`${format(
                dates[0].startDate,
                "dd/MM/yyyy"
              )} to ${format(dates[0].endDate, "dd/MM/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
             </div>
             <div className='searchDiv'>
                <label className='label'>Options</label>
                <div className='pl-2'>
                   <div className='input-row'>
                      <span className="lsOptionText">
                       Min price <small>per night</small>
                     </span>
                     <input
                       type="number"
                       onChange={(e) => setMin(e.target.value)}
                       className="optionInput"
                     />
                   </div>
                   <div className='input-row'>
                      <span className="lsOptionText">
                       Max price <small>per night</small>
                     </span>
                     <input
                       type="number"
                       onChange={(e) => setMax(e.target.value)}
                       className="optionInput"
                     />
                   </div>
                   <div className='input-row'>
                      <span className="lsOptionText">Adult</span>
                     <input
                       type="number"
                       min={1}
                       className="optionInput"
                       placeholder={options.adult}
                     />   
                   </div>
                   <div className='input-row'>
                      <span className="lsOptionText">Children</span>
                     <input
                       type="number"
                       min={0}
                       className="optionInput"
                       placeholder={options.children}
                     />
                   </div>
                   <div className='input-row'>
                      <span className="lsOptionText">Room</span>
                      <input
                         type="number"
                         min={1}
                         className="optionInput"
                         placeholder={options.room}
                      />
                   </div>
                </div>
                
             </div>       
          </div>
          <div className='right-container w-full xl:w-3/4'>
             <div className='grid grid-cols-1 gap-3'>
                {hotels.length > 0 ? (
                hotels.map((h) => (
                  <div key={h._id} className='flex items-center shadow p-2 space-x-1 lg:space-x-2'>
                     <div className='h-40 lg:h-60 w-1/3'>
                        <img src={`http://localhost:8001/uploads/${h.photos[0]}`}
                             alt={h.name}
                             className='h-full w-full object-cover'></img>
                     </div>
                     <div className='w-2/3 flex flex-col lg:space-y-2 p-1 lg:p-3'>
                        <div className='flex justify-between lg:mb-2'>
                           <h1 className='text-sm lg:text-xl font-bold text-purple-navy'>{h.name}</h1>
                           <span className='text-sm lg:text-xl bg-purple-navy px-2 text-white rounded-full flex items-center'>{h.rating} <FaStar size={13}/></span>
                        </div>
                        <p>{h.distance}</p>
                        <p className='text-sm lg:text-xl font-semibold'>{h.description}</p>
                        <span className="text-sm lg:text-xl text-green-600">Free cancellation </span>
                        <span className="text-sm lg:text-xl">
                          You can cancel later, so lock in this great price today!
                        </span>
                        <div className='flex justify-between text-sm lg:text-xl'>
                           <span>Cheapest Price:<span className='font-semibold'>{` ₹${h.cheapestPrice}`}</span></span>
                           <Link to={`/hotels/${h._id}`}>
                              <button className='button text-sm lg:text-xl'>See Availability</button>
                           </Link>
                        </div>
                        
                     </div>
                  </div>
                ))
              ) : (
                <p>No hotels found.</p>
              )}
             </div>
          </div>
       </div>
    </div>
  )
}

export default HotelList