import React from 'react'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../style/Login.css'

function Login() {
    const [role, setRole] = useState('Bachelor');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            const mockData = { email, name: email.split('@')[0] };
            
            const assignedRole = email.toLowerCase() === 'owner@test.com' ? 'Owner' : 'Bachelor';
            
            login(assignedRole, mockData);
            
            alert(`Login successful as ${assignedRole}!`);
            navigate(assignedRole === 'Owner' ? '/owner-dashboard' : '/bachelor-dashboard');
            setLoading(false);
        }, 1000);
    }
  return ( 
    <>
    <Navbar />
    <div className='login-container'>
        <div className='login-box'>
            <div className='icon'></div>
            <h2>Welcome Back</h2>
            <p>Sign in to your Bachelor Life account</p>

            <div className='role-selection-group'>
                <label className='role-label'>Login as:</label>
                <div className='tab-buttons'>
                    <button type='button' className={`tab ${role === 'Bachelor' ? 'active' : ''}`} onClick={() => setRole('Bachelor')}>Bachelor</button>
                    <button type='button' className={`tab ${role === 'Owner' ? 'active' : ''}`} onClick={() => setRole('Owner')}>Room Owner</button>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className='input-group'>
                    <label>Email Address</label>
                    <input type="email" placeholder='Enter Your Email' value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div className='input-group'>
                    <label>Password</label>
                    <input type="password" placeholder='Enter Your Password' value={password} onChange={e => setPassword(e.target.value)} required/>
                </div>
                <button type='submit' className='btn' disabled={loading}>{loading ? 'Signing in...' : 'Sign In'}</button>
            </form>

            <p className='signup-text'>Don't have an account? <Link to="/signup">Sign up</Link></p>
        </div>
    </div>
    </>
  );
}

export default Login;