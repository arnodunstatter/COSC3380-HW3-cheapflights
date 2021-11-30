import React, { useState } from 'react';
import { format } from 'date-fns';
import './CSS/View.css';

import { Link, useLocation, useNavigate } from "react-router-dom";

function View() {
    const location = useLocation();
    const state = location.state;
    const navigate = useNavigate();

    const [show, setShow] = useState(false);
    const [bookref, setBookref] = useState('');

    const onSubmitForm = async() => {
        try {
            const body = { bookref };
            await fetch("http://localhost:5000/cancel-ticket", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <div className='tickets-container'>

            { show && <div className='prompt-padding'>
                <div className='tickets-prompt'>
                    <p className='view-form-h1'>Are you sure you want to cancel your booking?</p>

                    <div className='tickets-prompt-info'>
                        <p className='view-form-h3'>Booking • {bookref}</p>
                    </div>

                    <p className='view-form-h4'>Airline policies are changing daily due to COVID-19. Please wait and check back closer to your date of departure for the latest policies. If you do want to cancel today, please be aware that all normal cancelcancellation penalties will apply. </p>

                    <div className='tickets-prompt-options'>
                        <button onClick={() => {
                                setShow(false);
                                onSubmitForm(); 
                                navigate("/");
                            }} 
                            className='tickets-prompt-btn'>
                            Yes
                        </button>
                        <button onClick={() => setShow(false)} className='tickets-prompt-btn'>
                            No
                        </button>
                    </div>
                </div>
            </div> }

            {state.length !== 0 ? state.map(data => <Tickets 
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
                bookRef={data.book_ref}
                status={data.canceled} />) : 

            <div className='tickets-unavailable'>
                <p className='view-form-h1'><i className="fas fa-frown"></i> No Bookings.</p>
                <Link to='/search-flight'>
                    <button className='login-guest-btn'>Book a flight</button>
                </Link>
            </div> }
            
        </div>
    );



    function Tickets(props) {

        function formatDate(timestamp) {
            return format(new Date(timestamp), 'h:mmaaa');
        }

        let stat = '';

        if (props.status === false) {
            stat = 'Active';
        } else if (props.status === true){
            stat = 'Canceled';
        }

    return(
        <div className='view-container'>
            <p className='view-form-h1'>{props.departingCity} to {props.arrivingCity}</p>
            <p className='view-form-h3'>Booking • {props.bookRef}</p>
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

            <div className='view-row'>
                <div className='view-subheader'>
                    <p className='view-form-h3'>Booking status</p>
                    <p className='view-form-h4-bold'>{stat}</p>
                </div>
                <div className='view-subheader'>
                    <p className='view-form-h3'>Total fare</p>
                    <p className='view-form-h4-bold'>${props.totalAmount}</p>
                </div>
            </div>

            {stat !== 'Canceled' && <div className='view-btn-container'>
                <button onClick={() => {
                        navigate("/checkin", { state: props });
                    }} 
                    className='view-btn'>
                    Check-in
                </button>

                <p onClick={() => {
                        setShow(true);
                        setBookref(props.bookRef);
                    }} 
                    
                    className='view-form-h4'>Cancel booking
                </p>
            </div> }
        </div>
        );
    }
}

export default View;