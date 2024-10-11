import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import './Register.css'

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) =>{
    e.preventDefault();
    axios.post('http://localhost:8001/api/users/register', { username, password, email, city, country, phone })
      .then(response => {
        alert('Registration Successful')
        navigate('/login')
      })
      .catch(error => {
        console.error('Error registering user:', error);
      });
  };
  return (
    <div className='w-full my-20 flex items-center justify-center'>
      <div className='shadow-lg p-10'>
        <h2 className='text-center text-sm lg:text-xl font-semibold'>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className='inputDiv'>
             <label htmlFor='username' className='label'>Username:</label>
             <input type='text' 
                    id='username' 
                    name='username'
                    value={username}
                    onChange={(e)=> setUsername(e.target.value)} 
                    className='input'></input>
          </div>

          <div className='inputDiv'>
             <label htmlFor='password' className='label'>Password:</label>
             <input type='password' 
                    id='password' 
                    name='password' 
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    className='input'></input>
          </div>

          <div className='inputDiv'>
            <label htmlFor='email' className='label'>Email:</label>
            <input type='email'
              id='email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='input'
            />
          </div>

          <div className='inputDiv'>
            <label htmlFor='city' className='label'>City:</label>
            <input type='text'
              id='city'
              name='city'
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className='input'
            />
          </div>

          <div className='inputDiv'>
            <label htmlFor='country' className='label'>Country:</label>
            <input type='text'
              id='country'
              name='country'
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className='input'
            />
          </div>

          <div className='inputDiv'>
            <label htmlFor='phone' className='label'>Phone Number:</label>
            <input type='tel'
              id='phone'
              name='phone'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className='input'
            />
          </div>
          <div className='flex justify-center mt-10'>
             <button type='submit' className='bg-purple-navy text-white rounded-lg py-2 px-2 text-sm lg:text-md font-semibold hover:bg-dark-purple-navy transition-colors duration-300'>Register</button>
          </div>
        
        </form>
      </div>
    </div>
  )
}

export default Register