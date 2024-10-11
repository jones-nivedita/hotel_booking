import './App.css';
import Home from './pages/Home';
import Layout from './components/Layout';
import {UserContextProvider} from './components/UserContext';
import { SearchContextProvider } from './components/SearchContext';
import { Route, Routes, useLocation } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import HotelList from './pages/HotelList/HotelList';
import Hotel from './pages/Hotel/Hotel';
import { useEffect } from 'react';

function App() {

  const location = useLocation();

  useEffect(() => {
    localStorage.setItem('lastVisited', location.pathname);
  }, [location]);

  return (
    <UserContextProvider>
      <SearchContextProvider>
       <Routes>
          <Route path="/" element={<Layout />}>
             <Route index element={<Home />} />
             <Route path='/login' element={<Login />} />
             <Route path='/register' element={<Register />} />
             <Route path='/hotels' element={<HotelList />} />
             <Route path='/hotels/:id' element={<Hotel />} />
           </Route>
       </Routes>
      </SearchContextProvider>
    </UserContextProvider>
  );
}

export default App;
