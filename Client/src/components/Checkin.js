import React, { useEffect, useState } from 'react';
import './CSS/Checkin.css';

import { format } from 'date-fns';
import TextField from "@mui/material/TextField";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Checkin () {

    const location = useLocation();
    const [bags, setBags] = useState(0);
    const props = location.state;

    function formatDate(timestamp) {
        return format(new Date(timestamp), 'h:mmaaa');
    }

   useEffect(() => {
        async function fetchData() {
            try {
                const body = { props };
                const response = await fetch("http://localhost:5000/get-waitlist", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });

                console.log(await response.json());

            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    });

    return(
        <div className='checkin-container'>
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

                {/* <div className='checkin-waitlist-row'>
                    <div className='checkin-waitlist-column'>
                        <p className='view-form-h3'>Economy waitlist</p>
                        <p className='view-form-h4'>0</p>
                    </div>
                    <div className='checkin-waitlist-column'>
                        <p className='view-form-h3'>Business waitlist</p>
                        <p className='view-form-h4'>0</p>
                    </div>
                </div> */}

                <TextField
                    id="outlined-number"
                    label="Baggages"
                    type="number"
                    defaultValue={bags}
                    onChange={setBags}
                    InputProps={{ pattern: "[0-9]*", inputProps: { min: 0, max: 2 } }}
                    size="small" sx={{ 
                        width: 80,
                        height: 5,
                        my: 2
                    }} 
                />

                <div className='view-btn-container'>
                    <button className='view-btn'>Confirm</button>
                </div>
            </div>
    );
}

export default Checkin;