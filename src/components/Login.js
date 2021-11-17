import React from 'react';
import './CSS/Login.css'

import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";

function Login () {
    return (
        <div className='login-container'>
            <p className='login-header'>VeryCheapFlights</p>
            <Link to='/search-flight'>
                <button className='login-guest-btn'>Book a flight</button>
            </Link>
            <button className='login-admin-btn'>View a booked flight</button>
        </div>
    );
}

export default Login;
