import React from 'react'
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../style/Login.css'

function Signup() {
    const [role, setRole] = useState('Bachelor');
    const [form, setForm] = useState({fullName: '', phone: '', email: '', gender:'', password: ''});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Map input name 'fullname' to state key 'fullName'
        const key = name === 'fullname' ? 'fullName' : name;
        setForm(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        
        // Simulate static account creation (No API needed)
        setTimeout(() => {
            alert('Account Created Successfully! Please Login.');
            navigate('/login');
            setLoading(false);
        }, 1000);
    };

  return (
    <>
    <Navbar />
    <div className='signup-container'>
        <div className='signup-box'>
            <img src="https://cdn-icons-png.flaticon.com/512/25/25694.png" alt="home icon" className='home-icon' />
            <h2>Create Account</h2>
            <p>Join Bachelor Life today</p>

            <div className='role-selection-group' style={{ textAlign: 'left'}}>
                <label className='role-label'>Signup as:</label>
                <div className='tab-buttons'>
                    <button type='button' className={`tab ${role === 'Bachelor' ? 'active' : ''}`} onClick={() => setRole('Bachelor')}>Bachelor</button>
                    <button type='button' className={`tab ${role === 'Owner' ? 'active' : ''}`} onClick={() => setRole('Owner')}>Room Owner</button>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className='input-group'>
                    <label>Full Name</label>
                    <input type="text" name='fullname' placeholder='Enter Your Full Name'value={form.fullName} onChange={handleChange} required/>
                </div>
                <div className='input-group'>
                    <label>Phone Number</label>
                    <input type="number" name='phone' placeholder='Enter 10 digit number' value={form.phone} onChange={handleChange} required/>
                </div>
                <div className='input-group'>
                    <label>Email Address</label>
                    <input type="email" name='email' placeholder='Enter Your email' value={form.email} onChange={handleChange} required/>
                </div>
                <div className='input-group'>
                    <label>Gender</label>
                    <select name="gender" value={form.gender} onChange={handleChange}>
                        <option value="" disabled>Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className='input-group'>
                    <label>Password</label>
                    <input type="password" name='password' placeholder='Create a Password' value={form.password} onChange={handleChange} required/>
                </div>
                <button type='submit' className='btn-create' disabled={loading}>{loading ? 'Creating...' : 'Create Account'}</button>
            </form>

            <p className='signin-text'>Already have an account?<Link to='/login'>Login</Link></p>
        </div>
    </div>
    <Footer />
    </>
  )
}

export default Signup;