import React, { useState } from 'react';
import { Link } from "react-router-dom";

import './CSS/Option.css';

function Option() {
    const [show, setShow] = useState(false);

    return(
        <>
            <div onClick={() => setShow(!show)} className='option-container'>
                Search booked flight
            </div>

            {
                show === true &&
                <div className='option-popup'>
                    <div className='login-inputs'>
                        <div className='login-icon'><i className="fas fa-search"></i></div>
                        <input placeholder='Enter Email Address'></input>
                    </div>

                    <Link to='/view-flight'>
                        <button className='login-admin-btn'>View booked flight</button>
                    </Link>
                </div>
            }
        </>
    );  
}

export default Option;