import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../style/Contact.css'

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
        <>
            <Navbar />
            <section className="contact">
                <h2>Contact Us</h2>
                <p>Have questions or feedback? We'd love to hear from you!</p>

                <form className="contact-form" onSubmit={handleSubmit}>
                    <label>Your Name</label>
                    <input type="text" name="name" placeholder="Enter your name" value={form.name} onChange={handleChange} required />

                    <label>Your Email</label>
                    <input type="email" name="email" placeholder="Enter your email" value={form.email} onChange={handleChange} required />

                    <label>Message</label>
                    <textarea name="message" rows="5" placeholder="Write your message here..." value={form.message} onChange={handleChange} required />

                    <button type="submit" disabled={loading}>{loading ? 'Sending...' : 'Send Message'}</button>
                </form>

                <div className="contact-info">
                    <p>Email: aravindhanmv2008@gmail.com</p>
                    <p>Phone: +91 94864 29127</p>
                    <p>Connect us: <a href="https://www.linkedin.com/in/aravindhan-m-v-914170382/" target="_blank" rel="noreferrer">LinkedIn</a> | <a href="https://github.com/aravindhan08-AH08" target="_blank" rel="noreferrer">GitHub</a></p>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Contact;