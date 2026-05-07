import React from 'react'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { API_CONFIG } from '../utils/api'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Login() {
    const [role, setRole] = useState('Bachelor');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const endpoint = role === 'Owner' ? API_CONFIG.OWNER_LOGIN : API_CONFIG.USER_LOGIN;
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Backend returns user data inside a 'user' key
                login(role, data.user);
                alert(`Login successful!`);
                navigate(role === 'Owner' ? '/owner-dashboard' : '/find-room');
            } else {
                alert(data.detail || 'Invalid email or password');
            }
        } catch (error) {
            console.error('Login Error:', error);
            alert('Failed to connect to backend. Please check if the server is running.');
        } finally {
            setLoading(false);
        }
    }
  return ( 
    <div className="flex flex-col min-h-screen bg-[#f4f7fa]">
    <Navbar />
    <div className='min-h-[calc(100vh-130px)] flex justify-center items-center py-10 px-5 bg-[#f8f9fa]'>
        <div className='bg-white py-[45px] px-10 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] w-full max-w-[440px] text-center'>
            <div className='icon'></div>
            <h2 className="text-[1.8em] text-[#045aaf] mb-1.5 font-bold">Welcome Back</h2>
            <p className="text-[#666] mb-[25px]">Sign in to your Bachelor Life account</p>

            <div className='mb-[25px] text-left'>
                <label className='text-[0.9em] font-semibold text-[#045aaf] block mb-2.5'>Login as:</label>
                <div className='flex gap-0 rounded-lg overflow-hidden border-2 border-[#007bff]'>
                    <button type='button' className={`flex-1 p-2.5 border-none font-semibold text-[0.95em] transition-all duration-300 ${role === 'Bachelor' ? 'bg-[#007bff] text-white' : 'bg-white text-[#007bff] hover:bg-[#f8f9fa]'}`} onClick={() => setRole('Bachelor')}>Bachelor</button>
                    <button type='button' className={`flex-1 p-2.5 border-none font-semibold text-[0.95em] transition-all duration-300 ${role === 'Owner' ? 'bg-[#007bff] text-white' : 'bg-white text-[#007bff] hover:bg-[#f8f9fa]'}`} onClick={() => setRole('Owner')}>Room Owner</button>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className='mb-[18px] text-left'>
                    <label className="block text-[0.9em] text-[#333] mb-1.5 font-semibold">Email Address</label>
                    <input className="w-full p-3 border-[1.5px] border-[#ddd] rounded-lg text-[0.95em] outline-none transition-colors duration-300 focus:border-[#007bff]" type="email" placeholder='Enter Your Email' value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div className='mb-[18px] text-left'>
                    <label className="block text-[0.9em] text-[#333] mb-1.5 font-semibold">Password</label>
                    <div className="relative">
                        <input 
                            className="w-full p-3 border-[1.5px] border-[#ddd] rounded-lg text-[0.95em] outline-none transition-colors duration-300 focus:border-[#007bff] pr-10" 
                            type={showPassword ? "text" : "password"} 
                            placeholder='Enter Your Password' 
                            value={password} 
                            onChange={e => setPassword(e.target.value)} 
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
                <button type='submit' className='w-full p-[13px] bg-[#007bff] text-white border-none rounded-lg text-[1em] font-bold mt-1.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed hover:not(:disabled):bg-[#045aaf] hover:not(:disabled):-translate-y-0.5' disabled={loading}>{loading ? 'Signing in...' : 'Sign In'}</button>
            </form>

            <p className='mt-5 text-[#666] text-[0.9em]'>Don't have an account? <Link className="text-[#007bff] font-semibold" to="/signup">Sign up</Link></p>
        </div>
    </div>
    </div>
  );
}

export default Login;