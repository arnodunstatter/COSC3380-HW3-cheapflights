import React, { useState, useEffect } from "react";
import './CSS/Checkout.css';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { format } from 'date-fns';
import moment from 'moment-timezone';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';


function Checkout() {
    const [passengers, setPassengers] = useState([]);
    const [cardNum, setCardNum] = useState("");
    const [discountCode, setDiscountCode] = useState("");
    const [completedBooking, setCompletedBooking] = useState(false);
    const location = useLocation();
    const state = location.state;

    const [confirm, setConfirm] = useState(false);
    const [bookingResponse, setBookingResponse] = useState(""); 

    const confirmationDialog = () => {
        return (
            <div>
                <Dialog
                    open={confirm}
                    onClose={setConfirm}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Use Google's location service?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            The booking was confirmed! {bookingResponse}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={setConfirm}>Disagree</Button>
                        <Button onClick={setConfirm} autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>

        );
    }

    const completeBooking = async () => {
        setCompletedBooking(true);
        console.log(passengers.length , state.numPassenger)
        if (passengers.length != state.numPassenger) {
            alert("Please reconfirm all passenger information!");
            setPassengers([]);
            return; 
        }
        try {
            const body = {
                flight_nos: state.flightNums,
                economySeats: state.seatClass == "economy" ? parseInt(state.numPassenger) : 0,
                businessSeats: state.seatClass == "business" ? parseInt(state.numPassenger) : 0,
                discount_code: discountCode ? discountCode : "none",
                card_no: cardNum,
                passengersInfo: passengers
            };
            console.log(body);
            const response = await fetch("http://localhost:5000/checkout-Confirmation", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            }).then((value) => {
                console.log("Successful Transaction!")
                alert("Successful Transaction!");
                //navigate("/search-flight/flights", { state: value });
            }, reason => {
                alert("Unsuccessful Transaction :'( ", reason);
                console.error(reason); // Error!
            }
            );

        } catch (error) {
            console.log(error);
        }
    };
    function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }


    let totalPrice = state.bookingType == "Round Trip" ?
        state.flightData.desFlightData.price + state.flightData.arrivalFlightData.price
        : state.flightData.desFlightData.price;

    return (
        <div className='checkout-container'>
            {confirmationDialog()}
            <div className='checkout-confirmation-container'>
                {state && [...Array(parseInt(state.numPassenger)).keys()].map((val) =>
                    <PassengerInfo
                        val={val}
                        completedBooking={completedBooking}
                        passengers={passengers}
                        setPassengers={setPassengers}
                        seatClass={state.seatClass}
                    />
                )}

                <div className='checkout-payment'>
                    <p className='checkout-form-h1'><i class="fas fa-lock"></i> How would you like to pay?</p>
                    <TextField label="Debit/Credit card number" variant="outlined" size="small" sx={{
                        width: 300,
                        height: 5,
                        my: 4
                    }}
                        value={cardNum}
                        onChange={(event) => setCardNum(event.target.value)}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', minLength: 16, maxLength: 16 }}
                        error={(isNumber(cardNum) == false) && cardNum.length != 0}

                    />
                    <TextField label="Discount Code" variant="outlined" size="small" sx={{
                        width: 300,
                        height: 5,
                        my: 4
                    }}
                        value={discountCode}
                        onChange={(event) => setDiscountCode(event.target.value)}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    />
                </div>

                <div className='checkout-review'>
                    <p className='checkout-form-h1'>Review and book your trip</p>
                    <div className='checkout-form-section'>
                        <p className='checkout-form-h4'>1. Review your trip details to make sure the dates and times are correct.</p>
                        <p className='checkout-form-h4'>2. Flight passenger names must match government-issued photo ID exactly.</p>
                        <p className='checkout-form-h4'>3. Review the terms of your booking</p>
                        <ul>
                            <li className='checkout-form-h4'>Tickets are nonrefundable and nontransferable. Itinerary changes are permitted, fee may apply.</li>
                            <li className='checkout-form-h4'>Please read the complete penalty rules for changes and cancellations or charter contract.</li>
                            <li className='checkout-form-h4'>Please read important information regarding airline liability limitations.</li>
                            <li className='checkout-form-h4'>Prices may not include baggage fees or other fees charged directly by the airline.</li>
                            <li className='checkout-form-h4'>Fares are not guaranteed until ticketed.</li>
                        </ul>
                    </div>

                    <div className='checkout-form-section'>
                        <p className='checkout-form-h4'>By clicking on the button below, I acknowledge that I have reviewed the Privacy Statement. and Government Travel Advice. and have reviewed and accept the above Rules & Restrictions and Terms of Use.</p>
                    </div>

                    <div className='checkout-btn-container' >
                        <button className='search-btn' onClick={completeBooking}>Complete Booking</button>
                    </div>

                    <div className='checkout-form-section'>
                        <p className='checkout-form-h4'><i class="fas fa-lock"></i> We use secure transmission and encrypted storage to protect your personal information.</p>
                    </div>
                    <div className='checkout-form-section'>
                        <p className='checkout-form-h4'>This payment will be processed in the U.S. This does not apply when the travel provider (airline/hotel/rail, etc.) processes your payment.</p>
                    </div>
                </div>
            </div>

            <div className='checkout-form-dummy'>
            </div>

            <div className='checkout-form'>
                <p className='checkout-form-h1'>Flight summary</p>
                <p className='checkout-form-h4'>{state.bookingType}</p>

                <p className='checkout-form-h2'>{state.flightData.desFlightData.departureLoc[0]} to {
                    (state.flightData.arrivalFlightData.typeFlight == "Direct Flight") ?
                        state.flightData.arrivalFlightData.arrivalLoc[0] : state.flightData.arrivalFlightData.arrivalLoc[1]}</p>
                <p className='checkout-form-h3'>{state.flightData.desFlightData.departureDate[0]}</p>

                <p className='checkout-form-h4'>CheapFlights Airlines {state.flightNums[0]}</p>
                <div className='checkout-price-summary'>
                    <p className='checkout-form-h1'>Price summary</p>

                    <div className='checkout-price'>
                        <p className='checkout-form-h4'>Traveler(s):</p>
                        <p className='checkout-form-h4'>{state.numPassenger}</p>
                    </div>
                    <div className='checkout-price'>
                        <p className='checkout-form-h4'>Flight:</p>
                        <p className='checkout-form-h4'>${totalPrice}</p>
                    </div>
                    <div className='checkout-price'>
                        <p className='checkout-form-h4'>Taxes & Fees:</p>
                        <p className='checkout-form-h4'>${totalPrice * (0.0825)}</p>
                    </div>

                    <div className='checkout-price-total'>
                        <p className='checkout-form-h4'>Total:</p>
                        <p className='checkout-form-h4'>${totalPrice * (1.0825)}</p>
                    </div>

                    <p className='checkout-form-info'>All prices quoted in <span>US dollars</span>.</p>
                </div>
            </div>
        </div>
    );
}

export default Checkout;


function PassengerInfo(props) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNum, setPhoneNum] = useState("");
    const [email, setEmail] = useState("");
    const [dateOB, setDateOB] = useState(moment().subtract(18, "years"));
    const [passportNum, setPassportNum] = useState("");

    function formatDate(timestamp) {
        return format(new Date(timestamp), 'yyyy-MM-dd');
    }

    function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }


    function transferData() {
        let newPassengers = [...props.passengers, [passportNum, firstName, lastName, email, phoneNum, formatDate(dateOB), props.seatClass]];
        props.setPassengers(newPassengers)
    }
    //[passport_no, first_name, last_name, email_address, phone_no, dob, seatClass]

    return (
        <div className='checkout-confirmation'>
            <p className='checkout-form-h1'>Passenger {props.val + 1}</p>
            <p className='checkout-form-h4'>Traveler names must match government-issued photo ID exactly.</p>

            <div className='checkout-form-name'>
                <TextField label="First name" variant="outlined" size="small" sx={{
                    width: 200,
                    height: 5,
                    my: 2,
                    mr: 2
                }}
                    value={firstName}
                    onChange={(event) => { setFirstName(event.target.value) }}
                />

                <TextField label="Last name" variant="outlined" size="small" sx={{
                    width: 200,
                    height: 5,
                    my: 2
                }}
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                />
            </div>


            <div className='checkout-form-name'>
                <TextField label="Phone number" variant="outlined" size="small" sx={{
                    width: 200,
                    height: 5,
                    my: 2,
                    mr: 2
                }}
                    value={phoneNum}
                    onChange={(event) => setPhoneNum(event.target.value)}
                    inputProps={{ pattern: '[0-9]*', inputMode: 'numeric', minLength: 10, maxLength: 10 }}
                    error={isNumber(phoneNum) == false && phoneNum.length != 0}
                />

                <TextField label="Email" variant="outlined" size="small" sx={{
                    width: 200,
                    height: 5,
                    my: 2
                }}
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
            </div>

            <div className='checkout-form-section'>
                <TextField label="Passport number" variant="outlined" size="small" sx={{
                    width: 300,
                    height: 5,
                    my: 2
                }}
                    value={passportNum}
                    onChange={(event) => setPassportNum(event.target.value)}
                    inputProps={{ pattern: '[0-9]*', inputMode: 'numeric', minLength: 9 }}
                />
            </div>

            <div className='checkout-dob'>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker

                        label="Date of birth"
                        value={dateOB}
                        //maxDate={new Date(moment().subtract(18, "years"))}
                        onChange={(newDateOB) => {
                            setDateOB(newDateOB);
                        }}
                        renderInput={(params) => <TextField size="small" sx={{
                            width: 150,
                            height: 10,
                        }}
                            {...params} />} />
                </LocalizationProvider>
                
                <button className='search-btn' onClick={transferData}>Confirmas</button>
            </div>

            
           
          
        </div>
    )
}
