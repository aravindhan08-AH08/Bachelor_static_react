import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
    const { isLoggedIn, userRole, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        logout();
        navigate('/login');
    };

    const getDashboardLink = () => {
        if (userRole === 'Owner') return '/owner-dashboard';
        if (userRole === 'Bachelor') return '/bachelor-dashboard';
        return '/';
    };

    return (
        <header className='flex justify-between items-center px-5 md:px-12 py-4 bg-blue-600 shadow-md sticky top-0 z-50 flex-col md:flex-row gap-3 md:gap-0'>
            <NavLink to="/" className='text-2xl font-extrabold tracking-wide text-white'>
                <span>Bachelor</span>
                <span>Life</span>
            </NavLink>

            <nav className='flex items-center gap-1 md:gap-5 flex-wrap justify-center'>
                <NavLink to='/' className={({ isActive }) => `text-white font-bold transition-colors duration-300 mx-2 text-sm md:text-base ${isActive ? 'text-green-400' : 'hover:text-green-400'}`} end>Home</NavLink>
                <NavLink to='/find-room' className={({ isActive }) => `text-white font-bold transition-colors duration-300 mx-2 text-sm md:text-base ${isActive ? 'text-green-400' : 'hover:text-green-400'}`}>Find Room</NavLink>
                <NavLink to='/post-room' className={({ isActive }) => `text-white font-bold transition-colors duration-300 mx-2 text-sm md:text-base ${isActive ? 'text-green-400' : 'hover:text-green-400'}`}>Post Room</NavLink>
                {isLoggedIn && (
                    <NavLink to={getDashboardLink()} className={({ isActive }) => `text-white font-bold transition-colors duration-300 mx-2 text-sm md:text-base ${isActive ? 'text-green-400' : 'hover:text-green-400'}`}>
                        Dashboard
                    </NavLink>
                )}
            </nav>

            <div>
                {isLoggedIn ? (
                    <button onClick={handleLogout} className='bg-transparent border-2 border-white/70 text-white px-5 py-1.5 rounded-md font-bold transition-all duration-300 hover:bg-white/15'>Logout</button>
                ) : (
                    <NavLink to='/login' className='bg-transparent border-2 border-white/70 text-white px-5 py-1.5 rounded-md font-bold transition-all duration-300 hover:bg-white/15'>Login</NavLink>
                )}
            </div>
        </header>
    );
}

export default Navbar;