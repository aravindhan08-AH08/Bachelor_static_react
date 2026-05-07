import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login';
import Signup from './pages/Signup';
import FindRoom from './pages/FindRoom';
import RoomDetails from './pages/RoomDetails';
import PostRoom from './pages/PostRoom';
import BachelorDashboard from './pages/BachelorDashboard';
import OwnerDashboard from './pages/OwnerDashboard';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/find-room' element={<FindRoom />} />
          <Route path='/find-rooms' element={<FindRoom />} />
          <Route path='/room/:id' element={<RoomDetails />} />
          <Route path='/post-room' element={<PostRoom />} />
          <Route path='/bachelor-dashboard' element={<BachelorDashboard />} />
          <Route path='/owner-dashboard' element={<OwnerDashboard />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App