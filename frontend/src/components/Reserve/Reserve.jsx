import React,{useEffect, useState, useContext} from 'react'
import './Reserve.css'
import { FaX } from "react-icons/fa6";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {SearchContext} from '../../components/SearchContext'

const Reserve = ({ setOpen, hotelId }) => {

  const [selectedRooms, setSelectedRooms] = useState([]);
  const [rooms, setRooms] = useState([]);
  const { dates } = useContext(SearchContext);
  const navigate = useNavigate()
  

  const getDatesInRange = (startDate, endDate) => {
    if (!startDate || !endDate) {
      console.log('Dates empty')
      return [];
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  useEffect(() => {
    axios.get(`http://localhost:8001/api/hotels/room/${hotelId}`)
    .then(response=>setRooms(response.data))
    .catch(err => console.log('Error fetching rooms:', err));
  },[])

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`http://localhost:8001/api/rooms/availability/${roomId}`, {
            dates: alldates,
          });
          return res.data;
        })
      );
      setOpen(false);
      alert('Rooms Booked!!');
      navigate("/");
    } catch (err) {}
  };

  return (
    <div className='reserve'>
        <div className='content-container'>
          <FaX onClick={() => setOpen(false)} className="close"/>
          {rooms.map((r) => (
            <div key={r._id} className='flex justify-between space-x-2 mb-4'>
              <div>
                 <div className='text-lg font-semibold'>{r.title}</div>
                 <div>{r.description}</div>
                 <div>Max People{` ${r.maxPeople}`}</div>
                 <div>₹{r.price}</div>
              </div>
               <div className="selectRooms">
              {r.roomNumbers.map((roomNumber) => (
                <div className="room" key={roomNumber._id}>
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div> 
            </div>           
          ))}
          <button className="btn" onClick={handleClick}>
             Book
          </button>
        </div>
    </div>
  )
}

export default Reserve