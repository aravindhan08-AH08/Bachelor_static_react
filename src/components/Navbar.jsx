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
        <header className='navbar'>
            <NavLink to="/" className='logo'>
                <span className='logo-bachelor'>Bachelor</span>
                <span className='logo-life'>Life</span>
            </NavLink>

            <nav className='nav-links'>
                <NavLink to='/' className={({ isActive }) => isActive ? 'active' : ''} end>Home</NavLink>
                <NavLink to='/find-room' className={({ isActive }) => isActive ? 'active' : ''}>Find Room</NavLink>
                <NavLink to='/post-room' className={({ isActive }) => isActive ? 'active' : ''}>Post Room</NavLink>
                {isLoggedIn && (
                    <NavLink to={getDashboardLink()} className={({ isActive }) => isActive ? 'active' : ''}>
                        Dashboard
                    </NavLink>
                )}
            </nav>

            <div>
                {isLoggedIn ? (
                    <a href='#' className='login-btn' onClick={handleLogout}>Logout</a>
                ) : (
                    <NavLink to='/login' className='login-btn'>Login</NavLink>
                )}
            </div>
        </header>
    );
}

export default Navbar;