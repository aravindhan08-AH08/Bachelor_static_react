import React from 'react'
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="bg-blue-600 text-white py-5 text-center mt-10">
            <div className="flex flex-col items-center gap-2.5">
                <p>&copy; 2026 Bachelor Life | All Rights Reserved</p>
                <div className="flex items-center gap-2.5">
                    <Link to='/about' className="text-white font-medium transition-colors duration-300 hover:text-green-400">About Us</Link>
                    <span className="text-white/50">|</span>
                    <Link to='/contact' className="text-white font-medium transition-colors duration-300 hover:text-green-400">Contact</Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer;