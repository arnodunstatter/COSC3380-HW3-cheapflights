import React, { useState } from "react";
import { Link } from "react-router-dom";
import './CSS/Checkout.css';

import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

function Checkout() {
    const [value, setValue] = useState(null);

    return(
        <div className='checkout-container'>
            <div className='checkout-confirmation-container'>
                <div className='checkout-confirmation'>

                    <p className='checkout-form-h1'>Who's traveling?</p>
                    <p className='checkout-form-h4'>Traveler names must match government-issued photo ID exactly.</p>

                    <div className='checkout-form-name'>
                            <TextField label="First name" variant="outlined" size="small" sx={{ 
                                width: 200,
                                height: 5,
                                my: 2,
                                mr: 2
                            }} />

                            <TextField label="Last name" variant="outlined" size="small" sx={{ 
                                width: 200,
                                height: 5,
                                my: 2
                            }} />
                    </div>


                    <div className='checkout-form-name'>
                            <TextField label="Phone number" variant="outlined" size="small" sx={{ 
                                width: 200,
                                height: 5,
                                my: 2,
                                mr: 2
                            }} />

                            <TextField label="Email" variant="outlined" size="small" sx={{ 
                                width: 200,
                                height: 5,
                                my: 2
                            }} />
                    </div>

                    <div className='checkout-form-section'>
                        <TextField label="Passport number" variant="outlined" size="small" sx={{ 
                            width: 300,
                            height: 5,
                            my: 2
                        }} />
                    </div>

                    <div className='checkout-dob'>
                        <LocalizationProvider  dateAdapter={AdapterDateFns}>
                            <DatePicker
                                
                                label="Date of birth"
                                value={value}
                                onChange={(newValue) => {
                                setValue(newValue);
                                }}
                                renderInput={(params) => <TextField size="small" sx={{ 
                                    width: 150,
                                    height: 10,
                                }} 
                                {...params} />} />
                        </LocalizationProvider>
                    </div>
                </div>

                <div className='checkout-payment'>
                    <p className='checkout-form-h1'><i class="fas fa-lock"></i> How would you like to pay?</p>
                    <TextField label="Debit/Credit card number" variant="outlined" size="small" sx={{ 
                        width: 300,
                        height: 5,
                        my: 4
                        }} />                          
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

                    <Link className='checkout-btn-container' to='/'>
                        <button className='search-btn'>Complete Booking</button>
                    </Link>

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
                <p className='checkout-form-h4'>One-way</p>

                <p className='checkout-form-h2'>Houston (IAH) to Los Angeles (LAX)</p>
                <p className='checkout-form-h3'>Sat, Dec 11</p>
                <p className='checkout-form-h4'>7:15am - 8:58am (3h 43m)</p>
                <p className='checkout-form-h4'>Spirit Airlines 590</p>

                <div className='checkout-price-summary'>
                    <p className='checkout-form-h1'>Price summary</p>

                    <div className='checkout-price'>
                        <p className='checkout-form-h4'>Traveler:</p>
                        <p className='checkout-form-h4'>1</p>
                    </div>
                    <div className='checkout-price'>
                        <p className='checkout-form-h4'>Flight:</p>
                        <p className='checkout-form-h4'>$16.66</p>
                    </div>
                    <div className='checkout-price'>
                        <p className='checkout-form-h4'>Taxes & Fees:</p>
                        <p className='checkout-form-h4'>$116.88</p>
                    </div>

                    <div className='checkout-price-total'>
                        <p className='checkout-form-h4'>Total:</p>
                        <p className='checkout-form-h4'>$133.54</p>
                    </div>

                    <p className='checkout-form-info'>All prices quoted in <span>US dollars</span>.</p>
                </div>
            </div>
        </div>
    );
}

export default Checkout;