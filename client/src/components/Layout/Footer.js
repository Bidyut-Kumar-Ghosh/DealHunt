import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='footer'><h1 className='text-center'>All Rights Reserved &copy; Bidyut</h1>
            <p className='text-center mt-3'>
                <Link to="/about">About</Link>
                <Link to="/Contact">Contact us</Link>
                <Link to="/Policy">Privacy Policy</Link>
            </p>
        </div>
    );
};

export default Footer;