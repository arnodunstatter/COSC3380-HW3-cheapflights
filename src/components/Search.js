import React, { useState, useMemo } from 'react';
import './CSS/Search.css'

import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Datepicker } from '@mobiscroll/react';

function Search() {
    const now = new Date();
    const min = now;

    const [start, startRef] = useState(null);
    const [end, endRef] = useState(null);

    const [style, setStyle] = useState('active');
    const [bookingType, setBookingType] = useState('round');
    const selectType = useMemo(() => bookingType === 'oneway' ? 'date' : 'range', [bookingType]);

    return (
        <div className='search-container'>
            <div className='search-selection'>
                <div onClick={() => {setBookingType('round'); setStyle('active'); }} className={`search-selection-btn round-${style}`}>
                    <p>Roundtrip</p>
                </div>
                <div onClick={() => {setBookingType('oneway'); setStyle('show'); }} className={`search-selection-btn oneway-${style}`}>
                    <p>One-Way</p>
                </div>
            </div>

            

            <div className='search-form'>
                <div className='search-inputs'>
                    <div className='search-icon'><i className="fas fa-map-marker-alt"></i></div>
                    <input className='search-from' placeholder='Leaving from'></input>
                </div>
                <div className='search-inputs'>
                    <div className='search-icon'><i className="fas fa-map-marker-alt"></i></div>
                    <input className='search-goingto' placeholder='Going to'></input>
                </div>

                
                <div className='search-inputs'>
                    <div className='search-icon'><i className="far fa-calendar"></i></div>
                    <Datepicker
                        control={['calendar']}
                        select={selectType}
                        startInput={start}
                        endInput={end}
                        inputComponent="input"
                        inputProps={{className: 'search-departure-long', placeholder: 'Departing'}}
                        theme="ios"
                        touchUi={true}
                        rangeStartLabel="Depart"
                        rangeEndLabel="Return"
                        min={min}
                        pages={2}
                    />
                    {bookingType === 'round' && <input ref={startRef} className='search-departure' placeholder='Departing'></input>} 
                </div>

                {   
                    bookingType === 'round' &&
                    <div className='search-inputs'>
                        <div className='search-icon'><i className="far fa-calendar"></i></div>
                        <input ref={endRef} className='search-arrival' placeholder='Returning'></input>
                    </div>
                }
            </div>

            <button className='search-btn'>Search</button>
        </div>
    );
}

export default Search;