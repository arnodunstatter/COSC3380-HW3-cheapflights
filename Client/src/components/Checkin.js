import React, {useState } from 'react';
import './CSS/Checkin.css';

import { format } from 'date-fns';
import TextField from "@mui/material/TextField";
import {useLocation, useNavigate } from "react-router-dom";

function Checkin () {
    const navigate = useNavigate();
    const location = useLocation();
    const [bags, setBags] = useState(0);
    const [show, setShow] = useState(false);
    const props = location.state;

    function formatDate(timestamp) {
        return format(new Date(timestamp), 'h:mmaaa');
    }

    async function onSubmitForm() {
        try {
            
            props.bagAmount = bags;

            const body = { props };
            await fetch("http://localhost:5000/check-in", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div className='checkin-container'>
            { show && <div className='prompt-padding'>
                <div className='checkin-prompt'>
                    <p className='view-form-h1'>Confirm Check In</p>

                    <div className='tickets-prompt-info'>
                        <p className='view-form-h3'>Ticket • {props.ticketNumber}</p>
                    </div>

                    <p className='view-form-h4'>To make sure you make it to your gate on time, get to the airport early. Aim for at least 1-2 hours before take-off for domestic flights and 2-3 hours for international flights. If you’re checking bags, flying out of a major airport, or traveling at a busy time (say, on a holiday), plan to get to the airport even earlier than you normally would. You’ll need your boarding pass and a government-issued photo ID to go through airport security. Curious if you need anything else? Contact your airline to find out more.</p>

                    <div className='tickets-prompt-options'>
                        <button onClick={() => {
                                setShow(false);
                                onSubmitForm(); 
                                navigate("/");
                                alert('Check in successful. You may now view your boarding pass.');
                            }} 
                            className='tickets-prompt-btn'>
                            Check In
                        </button>
                        <button onClick={() => setShow(false)} className='tickets-prompt-btn'>
                            Cancel
                        </button>
                    </div>
                </div>
            </div> }
            <p className='checkin-form-h1'><i className="fas fa-calendar-check"></i> Check In</p>
            <p className='view-form-h1'>{props.departingCity} to {props.arrivingCity}</p>
            <p className='view-form-h4'>Ticket • {props.ticketNumber}</p>
            <p className='view-form-h4'>Flight • {props.flightNumber}</p>

            <div className='view-subheader'>
                <p className='view-form-h3'><i className="fas fa-plane-departure"></i> {formatDate(props.departingTime)} - {props.departingCity}</p>
                <p className='view-form-h4'>{props.departingAirport}. ({props.departingAirportCode})</p>
            </div>

            <p className='view-form-h4'>{props.aircraftName}</p>
            <p className='view-form-h4'>{props.seatClass}</p>

            <div className='view-subheader'>
                <p className='view-form-h3'><i className="fas fa-plane-arrival"></i> {formatDate(props.arrivalTime)} - {props.arrivingCity}</p>
                <p className='view-form-h4'>{props.arrivingAirport}. ({props.arrivingAirportCode})</p>
            </div>

            <TextField
                id="outlined-number"
                label="Baggages"
                type="number"
                defaultValue={bags}
                value={bags}
                onChange={e => setBags(e.target.value)}
                InputProps={{ pattern: "[0-9]*", inputProps: { min: 0, max: 2 } }}
                size="small" sx={{ 
                    width: 80,
                    height: 5,
                    my: 2
                }} 
            />

            <div className='view-btn-container'>
                <button onClick={() => setShow(true)} className='view-btn'>Confirm</button>
            </div>
        </div>
    );
}

export default Checkin;