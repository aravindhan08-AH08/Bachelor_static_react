import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function About() {
    return (
        <div className="flex flex-col min-h-screen bg-[#f4f7fa]">
            <Navbar />

            <section className='py-[60px] px-5 bg-[#f8f9fa] flex-grow'>
                <div className='max-w-[1200px] mx-auto'>
                    <div className='text-center mb-[50px]'>
                        <h2 className='text-[2em] sm:text-[2.5em] text-[#045aaf] font-extrabold'>About Bachelor Life</h2>
                        <p className='text-[#666] text-[1.1em] mt-2'>Empowering independence through smart housing.</p>
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-[25px] mb-[50px]'>
                        <div className='bg-white p-[30px] rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.06)] text-center transition-transform duration-300 hover:-translate-y-1.5'>
                            <i className='fas fa-history text-[2.5em] text-[#4caf50] mb-[15px] block'></i>
                            <h3 className='text-[1.25em] text-[#045aaf] mb-3 font-bold'>My Story</h3>
                            <p className='text-[#666] leading-relaxed'>Bachelor Life was inspired by the real struggles single individuals face when finding a home. Living as a bachelor is like managing your own company-it teaches you responsibility, discipline, and how to stand on your own feet. I built this ti bridge that gap.</p>
                        </div>
                        <div className="bg-white p-[30px] rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.06)] text-center transition-transform duration-300 hover:-translate-y-1.5">
                            <i className="fas fa-eye text-[2.5em] text-[#4caf50] mb-[15px] block"></i>
                            <h3 className='text-[1.25em] text-[#045aaf] mb-3 font-bold'>My Vision</h3>
                            <p className='text-[#666] leading-relaxed'>I believe every conversation with those ahead of us is a lesson. My vision is to create a community where bachelors can grow into stronger versions of themselves while having easy access to safe, verified, and transparent housing.</p>
                        </div>
                        <div className="bg-white p-[30px] rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.06)] text-center transition-transform duration-300 hover:-translate-y-1.5">
                            <i className="fas fa-gem text-[2.5em] text-[#4caf50] mb-[15px] block"></i>
                            <h3 className='text-[1.25em] text-[#045aaf] mb-3 font-bold'>My Values</h3>
                            <p className='text-[#666] leading-relaxed'>Responsibility, Growth, and Truth. Bachelor Life isn't just a room-finding tool; it's a platform built on the trust between owners and young professionals starting their independent journey.</p>
                        </div>
                    </div>

                    <div className='bg-white p-[35px] rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.06)] text-center'>
                        <h3 className='text-[1.5em] text-[#045aaf] mb-3 font-bold'>The Developer</h3>
                        <p className='text-[#666] leading-relaxed max-w-[700px] mx-auto'>Hii, I'm the Developer behind the Bachelor Life. I'm working solo to the housing challenges bachelors face because I understand the journey firsthand. Every features is built with transparency and direct communication in mind.</p>
                    </div>
            </div>
        </section >
        <Footer />
    </div>
  );
}

export default About;