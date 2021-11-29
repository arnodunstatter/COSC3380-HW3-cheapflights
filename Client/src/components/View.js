import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import './CSS/View.css';

import { Link, useLocation } from "react-router-dom";

function View() {
    const location = useLocation();
    const state = location.state;

    return (
        <div className='tickets-container'>
            {state && state.map(data => <Tickets 
                ticketNumber={data.ticket_no}
                flightNumber={data.flight_no}
                departingCity={data.departing_city}
                departingTime={data.departure_time}
                arrivingCity={data.arrival_city}
                arrivalTime={data.arrival_time}
                departingAirport={data.departure_airport_name}
                departingAirportCode={data.departure_airport_code}
                arrivingAirport={data.arrival_airport_name}
                arrivingAirportCode={data.arrival_airport_code}
                aircraftName={data.aircraft_name}
                seatClass={data.seat_class}
                totalAmount={data.total_amount}
                />)}
        </div>
    );
}

export default View;

function Tickets(props) {

    function formatDate(timestamp) {
        return format(new Date(timestamp), 'h:mmaaa');
    }

 return(
    <div className='view-container'>
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

            <p className='view-form-h3'>Fare: {props.seatClass}</p>
            <p className='view-form-h4'>Your selection applies to all flights</p>

            <div className='view-subheader'>
                <p className='view-form-h3'>Total fare</p>
                <p className='view-form-h4'>${props.totalAmount}</p>
            </div>

            <div className='view-btn-container'>
                <button className='view-btn'>Check-in</button>
                <p className='view-form-h4'>Cancel booking</p>
            </div>
        </div>
    );
}