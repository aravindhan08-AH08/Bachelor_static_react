import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../style/About.css'

function About() {
    return (
        <>
            <Navbar />

            <section className='about'>
                <div className='container'>
                    <div className='about-card'>
                        <h2>About Bachelor Life</h2>
                        <p className='subtitle'>Empowering independence through smart housing.</p>
                    </div>

                    <div className='about-grid'>
                        <div className='about-card'>
                            <i className='fas fa-history icon-med'></i>
                            <h3>My Story</h3>
                            <p>Bachelor Life was inspired by the real struggles single individuals face when finding a home. Living as a bachelor is like managing your own company-it teaches you responsibility, discipline, and how to stand on your own feet. I built this ti bridge that gap.</p>
                        </div>
                        <div className="about-card">
                            <i className="fas fa-eye icon-med"></i>
                            <h3>My Vision</h3>
                            <p>I believe every conversation with those ahead of us is a lesson. My vision is to create a community where bachelors can grow into stronger versions of themselves while having easy access to safe, verified, and transparent housing.</p>
                        </div>
                        <div className="about-card">
                            <i className="fas fa-gem icon-med"></i>
                            <h3>My Values</h3>
                            <p>Responsibility, Growth, and Truth. Bachelor Life isn't just a room-finding tool; it's a platform built on the trust between owners and young professionals starting their independent journey.</p>
                        </div>
                    </div>

                    <div className='team-section'>
                        <h3>The Developer</h3>
                        <p>Hii, I'm the Developer behind the Bachelor Life. I'm working solo to the housing challenges bachelors face because I understand the journey firsthand. Every features is built with transparency and direct communication in mind.</p>
                    </div>
            </div>
        </section >
        <Footer />
    </>
  );
}

export default About;