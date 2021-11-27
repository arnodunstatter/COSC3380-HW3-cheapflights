import React from 'react';
import './CSS/Login.css'

import { Link } from "react-router-dom";

function Login() {
    return (
        <div className='login-container'>
            <p className='login-header'>Welcome to <span>Cheap<span>Flights</span></span></p>
            <Link to='/search-flight'>
                <button className='login-guest-btn'>Book a flight</button>
            </Link>
            <div className='login-search'>
                <p>Already have a flight?</p>
                <div className='login-inputs'>
                    <div className='login-icon'><i className="fas fa-search"></i></div>
                    <input placeholder='Enter Email Address'></input>
                </div>
            </div>

            <Link to='/view-flight'>
                <button className='login-admin-btn'>View a booked flight</button>
            </Link>
        </div>
    );
}

export default Login;
