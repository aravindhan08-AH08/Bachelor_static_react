import React from 'react'
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; 2026 Bachelor Life | All Rights Reserved</p>
                <div className="footer-links">
                    <Link to='/about'>About Us</Link>
                    <span className="separator">|</span>
                    <Link to='/contact'>Contact</Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer;