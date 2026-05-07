import React from 'react'
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { API_CONFIG } from '../utils/api';

function Signup() {
    const [role, setRole] = useState('Bachelor');
    const [form, setForm] = useState({fullName: '', phone: '', email: '', gender:'', password: ''});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Map input name 'fullname' to state key 'fullName'
        const key = name === 'fullname' ? 'fullName' : name;
        setForm(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const endpoint = role === 'Owner' ? API_CONFIG.OWNER_SIGNUP : API_CONFIG.USER_SIGNUP;
            const payload = {
                phone: form.phone,
                email: form.email,
                gender: form.gender,
                password: form.password
            };
            
            if (role === 'Owner') {
                payload.owner_name = form.fullName;
            } else {
                payload.name = form.fullName;
            }

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Account Created Successfully! Please Login.');
                navigate('/login');
            } else {
                alert(data.detail || 'Signup failed. Please try again.');
            }
        } catch (error) {
            console.error('Signup Error:', error);
            alert('Failed to connect to backend.');
        } finally {
            setLoading(false);
        }
    };

  return (
    <div className="flex flex-col min-h-screen bg-[#f4f7fa]">
    <Navbar />
    <div className='min-h-[calc(100vh-130px)] flex justify-center items-center py-10 px-5 bg-[#f8f9fa]'>
        <div className='bg-white py-10 px-10 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] w-full max-w-[480px] text-center'>
            <img src="https://cdn-icons-png.flaticon.com/512/25/25694.png" alt="home icon" className='w-[55px] mx-auto mb-[15px]' />
            <h2 className="text-[1.8em] text-[#045aaf] mb-1.5 font-bold">Create Account</h2>
            <p className="text-[#666] mb-5">Join Bachelor Life today</p>

            <div className='mb-[25px] text-left'>
                <label className='text-[0.9em] font-semibold text-[#045aaf] block mb-2.5'>Signup as:</label>
                <div className='flex gap-0 rounded-lg overflow-hidden border-2 border-[#007bff]'>
                    <button type='button' className={`flex-1 p-2.5 border-none font-semibold text-[0.95em] transition-all duration-300 ${role === 'Bachelor' ? 'bg-[#007bff] text-white' : 'bg-white text-[#007bff] hover:bg-[#f8f9fa]'}`} onClick={() => setRole('Bachelor')}>Bachelor</button>
                    <button type='button' className={`flex-1 p-2.5 border-none font-semibold text-[0.95em] transition-all duration-300 ${role === 'Owner' ? 'bg-[#007bff] text-white' : 'bg-white text-[#007bff] hover:bg-[#f8f9fa]'}`} onClick={() => setRole('Owner')}>Room Owner</button>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className='mb-[18px] text-left'>
                    <label className="block text-[0.9em] text-[#333] mb-1.5 font-semibold">Full Name</label>
                    <input className="w-full p-3 border-[1.5px] border-[#ddd] rounded-lg text-[0.95em] outline-none transition-colors duration-300 focus:border-[#007bff]" type="text" name='fullname' placeholder='Enter Your Full Name'value={form.fullName} onChange={handleChange} required/>
                </div>
                <div className='mb-[18px] text-left'>
                    <label className="block text-[0.9em] text-[#333] mb-1.5 font-semibold">Phone Number</label>
                    <input className="w-full p-3 border-[1.5px] border-[#ddd] rounded-lg text-[0.95em] outline-none transition-colors duration-300 focus:border-[#007bff]" type="number" name='phone' placeholder='Enter 10 digit number' value={form.phone} onChange={handleChange} required/>
                </div>
                <div className='mb-[18px] text-left'>
                    <label className="block text-[0.9em] text-[#333] mb-1.5 font-semibold">Email Address</label>
                    <input className="w-full p-3 border-[1.5px] border-[#ddd] rounded-lg text-[0.95em] outline-none transition-colors duration-300 focus:border-[#007bff]" type="email" name='email' placeholder='Enter Your email' value={form.email} onChange={handleChange} required/>
                </div>
                <div className='mb-[18px] text-left'>
                    <label className="block text-[0.9em] text-[#333] mb-1.5 font-semibold">Gender</label>
                    <select className="w-full p-3 border-[1.5px] border-[#ddd] rounded-lg text-[0.95em] outline-none transition-colors duration-300 focus:border-[#007bff] bg-white" name="gender" value={form.gender} onChange={handleChange}>
                        <option value="" disabled>Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className='mb-[18px] text-left'>
                    <label className="block text-[0.9em] text-[#333] mb-1.5 font-semibold">Password</label>
                    <div className="relative">
                        <input 
                            className="w-full p-3 border-[1.5px] border-[#ddd] rounded-lg text-[0.95em] outline-none transition-colors duration-300 focus:border-[#007bff] pr-10" 
                            type={showPassword ? "text" : "password"} 
                            name='password' 
                            placeholder='Create a Password' 
                            value={form.password} 
                            onChange={handleChange} 
                            required
                        />
                        <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#007bff] transition-colors"
                        >
                            {showPassword ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                            )}
                        </button>
                    </div>
                </div>
                <button type='submit' className='w-full p-[13px] bg-[#045aaf] text-white border-none rounded-lg text-[1em] font-bold mt-1.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed hover:not(:disabled):bg-[#007bff] hover:not(:disabled):-translate-y-0.5' disabled={loading}>{loading ? 'Creating...' : 'Create Account'}</button>
            </form>

            <p className='mt-5 text-[#666] text-[0.9em]'>Already have an account? <Link className="text-[#007bff] font-semibold ml-1" to='/login'>Login</Link></p>
        </div>
    </div>
    <Footer />
    </div>
  )
}

export default Signup;