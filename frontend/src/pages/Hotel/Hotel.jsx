import React, { useContext, useEffect, useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Hotel.css'
import { FaLocationDot, FaX, FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { UserContext } from '../../components/UserContext';
import Reserve from '../../components/Reserve/Reserve';

const Hotel = () => {

    const {id} = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const {userInfo} = useContext(UserContext);
    const [hotel, setHotel] = useState([])
    const [slideNumber, setSlideNumber] = useState(0);
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:8001/api/hotels/${id}`)
            .then(response => {
              setHotel(response.data)
            })
            .catch(err => console.log('Error fetching hotel:', err));
    }, [])

    const handleOpen = (i) => {
        setSlideNumber(i);
        setOpen(true);
      };
    
      const handleMove = (direction) => {
        let newSlideNumber;
    
        if (direction === "l") {
          newSlideNumber = slideNumber === 0 ? hotel.photos.length - 1  : slideNumber - 1;
        } else {
          newSlideNumber = slideNumber === hotel.photos.length - 1 ?  0 : slideNumber + 1;
        }
    
        setSlideNumber(newSlideNumber);
      };

      const handleBook = () => {
        if(!userInfo || !userInfo.id){
          navigate('/login');
        }
        console.log(userInfo);
        setOpenModal(true);
      }

  return (
    <div className='mx-20 my-10'>
        <div className='flex flex-col space-y-2 relative'>
           <div className='flex justify-between items-center'>
               <h1 className='text-lg lg:text-xl font-semibold'>{hotel.name}</h1>
               <button className='btn' onClick={handleBook}>Book Now</button>
           </div> 

           <div className='flex flex-row space-x-2 items-center text-md lg:text-xl'>
             <FaLocationDot/>
             <span>{hotel.address}</span>
           </div>  

           <div className='text-md lg:text-xl'>
              <p>{hotel.distance}</p>
           </div>

           <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3'> 
              {hotel?.photos?.map((p, index) => (
                <div key={index} className='h-80 w-full'>
                    <img key={index} src={`http://localhost:8001/uploads/${p}`} alt={p}
                         className='h-full w-full object-cover cursor-pointer' 
                         onClick={() => handleOpen(index)}></img>
                </div>
                
              ))}
           </div>
           {open && (
            <div className="slider">
              <FaX onClick={() => setOpen(false)} className="closeIcon"/>
              <FaAngleLeft onClick={() => handleMove("l")} className="arrowIcon left" />
              <div className="sliderWrapper">
                <img
                  src={`http://localhost:8001/uploads/${hotel.photos[slideNumber]}`}
                  alt={hotel.photos[slideNumber]}
                  className="sliderImg"
                />
              </div>
              <FaAngleRight onClick={() => handleMove("r")} className="arrowIcon right" />
            </div>
          )}
        </div> 
        {openModal && <Reserve setOpen={setOpenModal} hotelId={id}/>}   
    </div>
  )
}

export default Hotel