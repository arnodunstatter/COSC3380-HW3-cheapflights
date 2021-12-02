import React, { useState } from 'react';
import './CSS/Login.css'

import { Link, useNavigate } from "react-router-dom";

function Login() {
    ///////////////////////////////////States and functions//////////////////////////////////////
    const [ value, setValue ] = useState();
    const navigate = useNavigate();
    ///////////////////////////////////End of section////////////////////////////////////////////

    ///////////////////////////////////Queries///////////////////////////////////////////////////
    const onSubmitForm = async(e) => {
        e.preventDefault();

        try {
            const body = { value };
            const response = await fetch("http://localhost:5000/get-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            navigate("/view-flight", { state: await response.json() });
        } catch (error) {
            console.log(error);
        }
    }
    //////////////////////////////////End of Section////////////////////////////////////////////
    const populateCities = async() => {

        try {
            const body = {}
            const response = await fetch("http://localhost:5000/search-flight", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            //console.log(await response.json())
            navigate("/search-flight", { state: await response.json() });
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='login-container'>
            <p className='login-header'><span>Cheap<span>Flights</span></span></p>
            
            <button className='login-guest-btn' onClick={populateCities}>Book a flight</button>
           
            
            <form onSubmit={onSubmitForm}>
                <div className='login-search'>
                    <p>Already have a flight?</p>
                    <div className='login-inputs'>
                        <div className='login-icon'><i className="fas fa-search"></i></div>
                        <input placeholder='Enter Email Address' value={value} onChange={event => setValue(event.target.value)}></input>
                    </div>
                </div>

                <button type='submit' className='login-admin-btn'>View a booked flight</button>
            </form>
        </div>
    );
}

export default Login;
