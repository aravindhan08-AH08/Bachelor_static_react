import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../style/Home.css'

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
        <>
            <Navbar />

            <section className='hero-section'>
                <div className='hero-content'>
                    <h1>Find Your Perfect Room, Love Your Best Life</h1>
                    <p>
                        Living the bachelor lifestyle means independence, growth, and endless
                        possibilities. Connect with verified owners, discover
                        bachelor-friendly accommodations, and join a community where you can
                        learn, grow, and thrive on your own terms.
                    </p>

                    <div className='search-box'>
                        <div className='search-input-group'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M12 22q-4.025-3.425-6.012-6.362T4 10.2q0-3.75 2.413-5.975T12 2h.5q.25 0 .5.05v2.025q-.25-.05-.488-.063T12 4Q9.475 4 7.738 5.738T6 10.2q0 1.775 1.475 4.063T12 19.35q3.05-2.8 4.525-5.087T18 10.2V10h2v.2q0 2.5-1.987 5.438T12 22m0-10q.825 0 1.413-.587T14 10t-.587-1.412T12 8t-1.412.588T10 10t.588 1.413T12 12m6-4h2V5h3V3h-3V0h-2v3h-3v2h3z" />
                            </svg>
                            <input
                                type="text"
                                placeholder='Enter Location'
                                className='search-input'
                                value={location}
                                onChange={e => setLocation(e.target.value)}
                            />
                        </div>

                        <div className='search-input-group'>
                            <i className='fas fa-bed icon-search'></i>
                            <select className="search-input" value={roomType} onChange={e => setRoomType(e.target.value)}>
                                <option value="">All Room Types</option>
                                <option value="single">Single Room</option>
                                <option value="Shared Room">Shared Room</option>
                                <option value="1bhk">1 BHK</option>
                                <option value="2bhk">2 BHK</option>
                            </select>
                        </div>

                        <div className='price-slider-container'>
                            <label id='price-label'>Max: ₹{price.toLocaleString('en-IN')}</label>
                            <div className='slider-controls'>
                                <input
                                    type="range"
                                    id='price'
                                    min='2000'
                                    max='50000'
                                    step='1000'
                                    value={price}
                                    className='price-slider'
                                    onChange={e => setPrice(Number(e.target.value))}
                                />
                            </div>
                        </div>

                        <button className='search-btn' onClick={handleSearch}>
                            <i className='fas fa-search'></i> Search Rooms
                        </button>
                    </div>
                </div>
            </section>

            <section className='features-section'>
                <h2>Why Bachelor Life?</h2>
                <p>We understand the bachelor journey - the independence, the growth unique challenges you face</p>
                <div className='feature-cards'>
                    <div className="card">
                        <i className="fas fa-user-shield icon-large"></i>
                        <h3>Bachelor-Friendly Verified</h3>
                        <p>Every room is verified to welcome bachelors. No more rejections or hidden policies - just honest, transparent listings.</p>
                    </div>
                    <div className='card'>
                        <i className='fas fa-user-shield icon-large'></i>
                        <h3>Smart Discovery</h3>
                        <p>Find rooms that match your budget, location preferences, and lifestyle. Our filters really understand what bachelor need.</p>
                    </div>
                    <div className="card">
                        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" style={{ color: 'var(--success-green)', marginBottom: '20px' }}>
                            <path fill="currentColor" d="M20.875 22q-3.9 0-7.337-1.475q-3.438-1.475-6-4.037q-2.563-2.563-4.05-6Q2 7.05 2 3.125q-.025-.45.3-.788Q2.625 2 3.1 2H7q.45 0 .775.337q.325.338.325.813q0 1.1.15 2.075q.15.975.475 1.85q.125.275.05.562q-.075.288-.3.538l-2.5 2.5q1.075 2.2 3.05 4.175Q11 16.825 13.275 18l2.5-2.5q.225-.225.525-.3q.3-.075.6.05q.925.3 1.912.462q.988.163 2.038.163q.475 0 .813.35q.337.35.337.85V20.9q0 .45-.325.775t-.8.325Z" />
                        </svg>
                        <h3>Direct Connection</h3>
                        <p>Skip the middleman. Connect directly with owners who understand and welcome the bachelor lifestyle.</p>
                    </div>
                </div>
            </section>

            <section className="advantage-section">
                <div className="advantage-content">
                    <h2>The Bachelor Advantage</h2>
                    <p>Living independently isn't just about finding a room - it's about building your future, learning from experienced people, and growing into the person you want to become.</p>
                    <div className="stats-container">
                        <div className="stat-item">
                            <span className="stat-number">100%</span>
                            <span className="stat-label">Bachelor-Friendly</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">24/7</span>
                            <span className="stat-label">Support Available</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">500+</span>
                            <span className="stat-label">Verified Rooms</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">95%</span>
                            <span className="stat-label">Success Rate</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="cta-section">
                <h2>Ready to Start Your Journey?</h2>
                <p>Join the community of independent bachelors who choose to live their life on their own terms.</p>
                <div className="cta-buttons">
                    <button className="btn-primary" onClick={() => navigate('/find-rooms')}>Find My Room</button>
                    <button className="btn-secondary" onClick={() => navigate('/post-room')}>List My Property</button>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Home