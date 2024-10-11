import React, {useEffect, useContext} from 'react';
import {UserContext} from './UserContext';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    const {userInfo, setUserInfo} = useContext(UserContext);

    useEffect(()=>{
        axios.get('http://localhost:8001/api/users/profile', {
            withCredentials: true
        })
        .then(response => {
              console.log('User Profile:',response.data);
              setUserInfo(response.data);
          })
        .catch(error =>{
          console.log('Error retrieving profile:',error);
        })
    }, [userInfo])

    const logout = () =>{
        axios.post('http://localhost:8001/api/users/logout', {
            withCredentials: true
        })
        .then(response => {
            setUserInfo(null);
            navigate('/');
            console.log('User logged out:', response.data);
          })
        .catch(error => {
            console.log('Error logging out user:' ,error);
          })
    }

    const username = userInfo?.username;
  return (
    <header className='flex justify-between text-xl p-10 my-auto bg-purple-navy text-white'>
            <Link to="/" className='font-bold xl:text-4xl sm:text-3xl'>Hotels Now</Link>
            <nav className='flex space-x-8 font-semibold'>
            {username && (
                <>
                  <h1>{username}</h1>
                  <a onClick={logout} className='hover:cursor-pointer'>Logout</a>
                </>
              )}
              {!username && (
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/register">Register</Link>
                </>
              )}
            </nav>
        </header>
  )
}

export default Header