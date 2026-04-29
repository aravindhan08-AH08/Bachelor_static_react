import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Contact = () => {
    const [form, setForm] = useState({ name: '', email: '', message: '' })
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)

        setTimeout(() => {
            alert('Message sent successfully!')
            setForm({ name: '', email: '', message: '' })
            setLoading(false)
        }, 1000)
    }

    return (
        <div className="flex flex-col min-h-screen bg-[#f4f7fa]">
            <Navbar />
            <section className="max-w-[650px] mx-auto my-[60px] px-5 pb-[60px] text-center w-full">
                <h2 className="text-[2.2em] text-[#045aaf] font-extrabold mb-2.5">Contact Us</h2>
                <p className="text-[#666] mb-[35px]">Have questions or feedback? We'd love to hear from you!</p>

                <form className="bg-white p-[35px] rounded-2xl shadow-[0_8px_25px_rgba(0,0,0,0.08)] text-left flex flex-col gap-1.5 mb-[30px]" onSubmit={handleSubmit}>
                    <label className="text-[0.9em] font-semibold text-[#333] mt-2.5">Your Name</label>
                    <input className="p-3 border-[1.5px] border-[#ddd] rounded-lg text-[0.95em] outline-none transition-colors duration-300 w-full focus:border-[#007bff]" type="text" name="name" placeholder="Enter your name" value={form.name} onChange={handleChange} required />

                    <label className="text-[0.9em] font-semibold text-[#333] mt-2.5">Your Email</label>
                    <input className="p-3 border-[1.5px] border-[#ddd] rounded-lg text-[0.95em] outline-none transition-colors duration-300 w-full focus:border-[#007bff]" type="email" name="email" placeholder="Enter your email" value={form.email} onChange={handleChange} required />

                    <label className="text-[0.9em] font-semibold text-[#333] mt-2.5">Message</label>
                    <textarea className="p-3 border-[1.5px] border-[#ddd] rounded-lg text-[0.95em] outline-none transition-colors duration-300 w-full resize-y focus:border-[#007bff]" name="message" rows="5" placeholder="Write your message here..." value={form.message} onChange={handleChange} required />

                    <button className="mt-[15px] p-[13px] bg-[#007bff] text-white border-none rounded-lg text-[1em] font-bold transition-all duration-300 disabled:opacity-70 hover:not(:disabled):bg-[#045aaf] hover:not(:disabled):-translate-y-0.5" type="submit" disabled={loading}>{loading ? 'Sending...' : 'Send Message'}</button>
                </form>

                <div className="bg-white p-[25px] rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.06)] text-left">
                    <p className="text-[#333] mb-2.5 text-[0.95em]">Email: aravindhanmv2008@gmail.com</p>
                    <p className="text-[#333] mb-2.5 text-[0.95em]">Phone: +91 94864 29127</p>
                    <p className="text-[#333] mb-2.5 text-[0.95em]">Connect us: <a className="text-[#007bff] font-semibold hover:text-[#045aaf]" href="https://www.linkedin.com/in/aravindhan-m-v-914170382/" target="_blank" rel="noreferrer">LinkedIn</a> | <a className="text-[#007bff] font-semibold hover:text-[#045aaf]" href="https://github.com/aravindhan08-AH08" target="_blank" rel="noreferrer">GitHub</a></p>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default Contact;