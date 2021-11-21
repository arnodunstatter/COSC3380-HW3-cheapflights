import React from 'react';

import './CSS/View.css';

import { Link } from "react-router-dom";

function View() {
    return(
        <div className='view-container'>
            <div className='view-info'>
                <p className='view-p'>Name:</p>
                <p>John Doe</p>
            </div>
            <div className='view-info'>
                <p className='view-p'>Email:</p>
                <p>johndoe@email.com</p>
            </div>
            <div className='view-info'>
                <p className='view-p'># of passengers:</p>
                <p>1</p>
            </div>
            <div className='view-info'>
                <p className='view-p'>Ticket #:</p>
                <p>123456</p>
            </div>
            <div className='view-info'>
                <p className='view-p'>Departure Airport:</p>
                <p>HOU</p>
            </div>
            <div className='view-info'>
                <p className='view-p'>Departure time:</p>
                <p>3:00pm</p>
            </div>
            <div className='view-info'>
                <p className='view-p'>Arrival Airport:</p>
                <p>LAX</p>
            </div>
            <div className='view-info'>
                <p className='view-p'>Arrival time:</p>
                <p>4:00pm</p>
            </div>

            <Link className='view-btn' to='/'>
                <button className='view-goback-btn'>Go back</button>
            </Link>
        </div>
    );
}

export default View;