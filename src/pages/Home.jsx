import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Home() {
    const [location, setLocation] = useState('');
    const [roomType, setRoomType] = useState('');
    const [price, setPrice] = useState(30000);
    const navigate = useNavigate();

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (location) params.set('location', location);
        if (roomType) params.set('type', roomType);
        if (price) params.set('budget', price);
        navigate(`/find-rooms?${params.toString()}`);
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#f4f7fa]">
            <Navbar />

            <section className='bg-[#f8f9fa] py-16 md:py-20 px-5 text-center animate-[fadeInSlideUp_1s_ease-out_0.3s_both]'>
                <div className='max-w-[900px] mx-auto'>
                    <h1 className='text-4xl md:text-5xl lg:text-[3.5em] text-[#045aaf] mb-4 font-extrabold'>Find Your Perfect Room, Love Your Best Life</h1>
                    <p className='text-lg md:text-[1.15em] text-black mb-10'>
                        Living the bachelor lifestyle means independence, growth, and endless
                        possibilities. Connect with verified owners, discover
                        bachelor-friendly accommodations, and join a community where you can
                        learn, grow, and thrive on your own terms.
                    </p>

                    <div className='flex flex-col md:flex-row justify-center items-center bg-white p-4 md:p-5 rounded-xl shadow-[0_8px_20px_rgba(0,0,0,0.12)] gap-4 animate-[slideUp_1s_ease-out_0.8s_both] w-full max-w-[900px] mx-auto flex-wrap'>
                        <div className='flex items-center gap-2 w-full md:w-auto md:flex-1'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='text-[#666]'>
                                <path fill="currentColor" d="M12 22q-4.025-3.425-6.012-6.362T4 10.2q0-3.75 2.413-5.975T12 2h.5q.25 0 .5.05v2.025q-.25-.05-.488-.063T12 4Q9.475 4 7.738 5.738T6 10.2q0 1.775 1.475 4.063T12 19.35q3.05-2.8 4.525-5.087T18 10.2V10h2v.2q0 2.5-1.987 5.438T12 22m0-10q.825 0 1.413-.587T14 10t-.587-1.412T12 8t-1.412.588T10 10t.588 1.413T12 12m6-4h2V5h3V3h-3V0h-2v3h-3v2h3z" />
                            </svg>
                            <input
                                type="text"
                                placeholder='Enter Location'
                                className='p-3 border border-gray-300 rounded-lg flex-grow w-full text-[0.95em] outline-none focus:border-[#007bff]'
                                value={location}
                                onChange={e => setLocation(e.target.value)}
                            />
                        </div>

                        <div className='flex items-center gap-2 w-full md:w-auto md:flex-1'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='text-[#666]'>
                                <path fill="currentColor" d="M19 7h-8v8H3V7H1v10h2v3h2v-3h14v3h2v-3h2V7h-2zM7 13A3 3 0 0 0 7 7a3 3 0 0 0 0 6z" />
                            </svg>
                            <select className="p-3 border border-gray-300 rounded-lg flex-grow w-full text-[0.95em] outline-none focus:border-[#007bff] bg-white" value={roomType} onChange={e => setRoomType(e.target.value)}>
                                <option value="">All Room Types</option>
                                <option value="single">Single Room</option>
                                <option value="Shared Room">Shared Room</option>
                                <option value="1bhk">1 BHK</option>
                                <option value="2bhk">2 BHK</option>
                            </select>
                        </div>

                        <div className='flex flex-col items-start border border-gray-300 rounded-lg py-2 px-4 w-full md:w-[180px]'>
                            <label className='text-xs text-gray-500 mb-1'>Max: ₹{price.toLocaleString('en-IN')}</label>
                            <input
                                type="range"
                                min='2000'
                                max='50000'
                                step='1000'
                                value={price}
                                className='w-full cursor-pointer accent-[#007bff]'
                                onChange={e => setPrice(Number(e.target.value))}
                            />
                        </div>

                        <button className='bg-[#007bff] text-white border-none py-3 px-8 rounded-lg text-[1.05em] font-semibold w-full md:w-auto hover:bg-[#045aaf] hover:-translate-y-px hover:shadow-[0_4px_10px_rgba(0,0,0,0.2)] transition-all' onClick={handleSearch}>
                            Search Rooms
                        </button>
                    </div>
                </div>
            </section>

            <section className='bg-white py-16 md:py-[100px] px-5 text-center'>
                <h2 className='text-3xl md:text-[2.5em] text-[#045aaf] mb-3 font-bold'>Why Bachelor Life?</h2>
                <p className='text-lg md:text-[1.1em] text-[#666] mb-12 md:mb-[60px] max-w-3xl mx-auto'>We understand the bachelor journey - the independence, the growth unique challenges you face</p>
                <div className='flex flex-col md:flex-row justify-center gap-8 max-w-[1200px] mx-auto px-4'>
                    <div className="bg-white p-8 rounded-2xl shadow-[0_6px_18px_rgba(0,0,0,0.08)] flex-1 max-w-full md:max-w-[380px] text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_25px_rgba(0,0,0,0.15)] mx-auto animate-[cardEntrance_0.7s_ease-out_both] delay-[1600ms]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" className='text-[#4caf50] mx-auto mb-5'><path fill="currentColor" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V5l-9-4zm0 6c1.4 0 2.8 1.4 2.8 2.8S13.4 12.6 12 12.6S9.2 11.2 9.2 9.8S10.6 7 12 7zm0 10.5c-2.3 0-4.6-1.5-4.6-3.8v-.2c0-.5.4-1 1-1h7.2c.5 0 1 .4 1 1v.2c0 2.3-2.3 3.8-4.6 3.8z"/></svg>
                        <h3 className='text-[#045aaf] mb-4 text-[1.4em] font-bold'>Bachelor-Friendly Verified</h3>
                        <p className='text-[#666]'>Every room is verified to welcome bachelors. No more rejections or hidden policies - just honest, transparent listings.</p>
                    </div>
                    <div className='bg-white p-8 rounded-2xl shadow-[0_6px_18px_rgba(0,0,0,0.08)] flex-1 max-w-full md:max-w-[380px] text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_25px_rgba(0,0,0,0.15)] mx-auto animate-[cardEntrance_0.7s_ease-out_both] delay-[1800ms]'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" className='text-[#4caf50] mx-auto mb-5'><path fill="currentColor" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V5l-9-4zm0 6c1.4 0 2.8 1.4 2.8 2.8S13.4 12.6 12 12.6S9.2 11.2 9.2 9.8S10.6 7 12 7zm0 10.5c-2.3 0-4.6-1.5-4.6-3.8v-.2c0-.5.4-1 1-1h7.2c.5 0 1 .4 1 1v.2c0 2.3-2.3 3.8-4.6 3.8z"/></svg>
                        <h3 className='text-[#045aaf] mb-4 text-[1.4em] font-bold'>Smart Discovery</h3>
                        <p className='text-[#666]'>Find rooms that match your budget, location preferences, and lifestyle. Our filters really understand what bachelor need.</p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-[0_6px_18px_rgba(0,0,0,0.08)] flex-1 max-w-full md:max-w-[380px] text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_25px_rgba(0,0,0,0.15)] mx-auto animate-[cardEntrance_0.7s_ease-out_both] delay-[2000ms]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" className='text-[#4caf50] mx-auto mb-5'>
                            <path fill="currentColor" d="M20.875 22q-3.9 0-7.337-1.475q-3.438-1.475-6-4.037q-2.563-2.563-4.05-6Q2 7.05 2 3.125q-.025-.45.3-.788Q2.625 2 3.1 2H7q.45 0 .775.337q.325.338.325.813q0 1.1.15 2.075q.15.975.475 1.85q.125.275.05.562q-.075.288-.3.538l-2.5 2.5q1.075 2.2 3.05 4.175Q11 16.825 13.275 18l2.5-2.5q.225-.225.525-.3q.3-.075.6.05q.925.3 1.912.462q.988.163 2.038.163q.475 0 .813.35q.337.35.337.85V20.9q0 .45-.325.775t-.8.325Z" />
                        </svg>
                        <h3 className='text-[#045aaf] mb-4 text-[1.4em] font-bold'>Direct Connection</h3>
                        <p className='text-[#666]'>Skip the middleman. Connect directly with owners who understand and welcome the bachelor lifestyle.</p>
                    </div>
                </div>
            </section>

            <section className="bg-[#045aaf] text-white py-16 md:py-[100px] px-5 text-center">
                <div className="max-w-[1200px] mx-auto">
                    <h2 className="text-3xl md:text-[2.5em] mb-4 font-bold">The Bachelor Advantage</h2>
                    <p className="text-lg md:text-[1.1em] text-[#a9c8f9] mb-12 md:mb-[60px] max-w-[900px] mx-auto">Living independently isn't just about finding a room - it's about building your future, learning from experienced people, and growing into the person you want to become.</p>
                    <div className="flex flex-wrap justify-around max-w-[1000px] mx-auto gap-8">
                        <div className="flex flex-col items-center flex-1 min-w-[140px]">
                            <span className="text-4xl md:text-[4em] font-black text-[#4caf50] mb-2">100%</span>
                            <span className="text-lg md:text-[1.1em] text-[#a9c8f9] font-medium">Bachelor-Friendly</span>
                        </div>
                        <div className="flex flex-col items-center flex-1 min-w-[140px]">
                            <span className="text-4xl md:text-[4em] font-black text-[#4caf50] mb-2">24/7</span>
                            <span className="text-lg md:text-[1.1em] text-[#a9c8f9] font-medium">Support Available</span>
                        </div>
                        <div className="flex flex-col items-center flex-1 min-w-[140px]">
                            <span className="text-4xl md:text-[4em] font-black text-[#4caf50] mb-2">500+</span>
                            <span className="text-lg md:text-[1.1em] text-[#a9c8f9] font-medium">Verified Rooms</span>
                        </div>
                        <div className="flex flex-col items-center flex-1 min-w-[140px]">
                            <span className="text-4xl md:text-[4em] font-black text-[#4caf50] mb-2">95%</span>
                            <span className="text-lg md:text-[1.1em] text-[#a9c8f9] font-medium">Success Rate</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-white py-16 md:py-[100px] px-5 text-center animate-[fadeIn_1s_ease-in_both] delay-[2300ms]">
                <h2 className="text-3xl md:text-[2.5em] text-[#045aaf] mb-4 font-bold">Ready to Start Your Journey?</h2>
                <p className="text-lg md:text-[1.1em] text-[#666] mb-10">Join the community of independent bachelors who choose to live their life on their own terms.</p>
                <div className="flex justify-center gap-4 flex-col sm:flex-row px-4">
                    <button className="bg-[#007bff] text-white border-none py-3 md:py-[15px] px-8 md:px-[35px] rounded-[10px] text-lg md:text-[1.15em] font-bold hover:bg-[#045aaf] hover:-translate-y-1 hover:shadow-[0_6px_15px_rgba(0,123,255,0.4)] transition-all w-full sm:w-auto" onClick={() => navigate('/find-rooms')}>Find My Room</button>
                    <button className="bg-white text-[#007bff] border-2 border-[#007bff] py-3 md:py-[15px] px-8 md:px-[35px] rounded-[10px] text-lg md:text-[1.15em] font-bold hover:bg-[#f8f9fa] hover:text-[#045aaf] hover:border-[#045aaf] hover:-translate-y-1 transition-all w-full sm:w-auto" onClick={() => navigate('/post-room')}>List My Property</button>
                </div>
            </section>
            
            <Footer />
        </div>
    )
}

export default Home;