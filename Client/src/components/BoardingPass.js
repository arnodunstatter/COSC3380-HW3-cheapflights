import React from 'react';
import './CSS/BoardingPass.css';

import { format } from 'date-fns';
import {useLocation } from "react-router-dom";

function BoardingPass() {
    const location = useLocation();
    const state = location.state;

    console.log(state, "here");

    function formatDate(timestamp) {
        return format(new Date(timestamp), 'h:mmaaa');
    }

    return(
        <div className='pass-container'>

            <div className='pass-info'>
                <p className='view-form-h0'>Boarding Pass</p>
                <p className='view-form-h1'>{state[0].departingCity} to {state[0].arrivingCity}</p>
                <p className='view-form-h4-bold'>Class • {state[0].seatClass}</p>
                <p className='view-form-h3'>Booking • {state[0].bookRef}</p>
                <p className='view-form-h4'>Ticket • {state[0].ticketNumber}</p>
                <p className='view-form-h4'>Flight • {state[0].flightNumber}</p>

                <div className='pass-row'>
                    <div className='pass-square'>
                        <p className='view-form-h4-bold'>Boarding</p>
                        <p className='view-form-h3'>{state[1][0].boarding_no}</p>
                    </div>
                    <div className='pass-square'>
                        <p className='view-form-h4-bold'>Gate</p>
                        <p className='view-form-h3'>{state[1][0].gate_no}</p>
                    </div>
                    <div className='pass-square'>
                        <p className='view-form-h4-bold'>Seat</p>
                        <p className='view-form-h3'>{state[1][0].seat_no}</p>
                    </div>
                </div>
            </div>

            <div className='pass-flight-info'>
                <div className='view-subheader'>
                    <p className='view-form-h3'><i className="fas fa-plane-departure"></i> {formatDate(state[0].departingTime)} - {state[0].departingCity}</p>
                    <p className='view-form-h4'>{state[0].departingAirport}. ({state[0].departingAirportCode})</p>
                </div>

                <div className='view-subheader'>
                    <p className='view-form-h3'><i className="fas fa-plane-arrival"></i> {formatDate(state[0].arrivalTime)} - {state[0].arrivingCity}</p>
                    <p className='view-form-h4'>{state[0].arrivingAirport}. ({state[0].arrivingAirportCode})</p>
                </div>

                <p className='view-form-h4'>Baggage Claim • {state[1][0].baggage_claim}</p>
                <p className='view-form-h4'>Baggage ID • {state[1][0].baggage_id}</p>
            </div>

            <div className='pass-barcode'>
                <img className='pass-barcode-img' src='https://i.pinimg.com/originals/60/c1/4a/60c14a43fb4745795b3b358868517e79.png' alt='barcode'/>
            </div>
        </div>  
    );
}

export default BoardingPass;