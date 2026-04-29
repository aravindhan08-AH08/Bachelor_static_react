import React from 'react'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

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
            navigate(assignedRole === 'Owner' ? '/owner-dashboard' : '/find-room');
            setLoading(false);
        }, 1000);
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
                    <input className="w-full p-3 border-[1.5px] border-[#ddd] rounded-lg text-[0.95em] outline-none transition-colors duration-300 focus:border-[#007bff]" type="password" placeholder='Enter Your Password' value={password} onChange={e => setPassword(e.target.value)} required/>
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