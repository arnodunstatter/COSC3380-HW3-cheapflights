import React from 'react';
import './CSS/Login.css'

import { Link } from "react-router-dom";

function Login () {
    return (
        <div className='login-container'>
            <p className='login-header'>VeryCheapFlights</p>
            <Link to='/search-flight'>
                <button className='login-guest-btn'>Book a flight</button>
            </Link>
            <Link to='/view-flight'>
            <button className='login-admin-btn'>View a booked flight</button>
            </Link>
        </div>
    );
}

export default Login;
