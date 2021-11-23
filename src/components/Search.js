import React from 'react';
import './CSS/Search.css';
import DatePicker from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';


function Search() {
    const [value, setValue] = React.useState(new Date());

    return (
        <div className='search-container'>
            <div className='search-selection'>
                <div className='search-selection-btn'>
                    Roundtrip
                </div>
                <div className='search-selection-btn'>
                    One-Way
                </div>
            </div>

            <div className='search-form'>
                <div className='search-inputs'>
                    <div className='search-icon'><i className="fas fa-map-marker-alt"></i></div>
                    <input className='search-from' placeholder='From'></input>
                </div>
                <div className='search-inputs'>
                    <div className='search-icon'><i className="fas fa-map-marker-alt"></i></div>
                    <input className='search-goingto' placeholder='Going to'></input>
                </div>
                <div className='search-inputs'>
                    <div className='search-icon'><i className="fas fa-calendar-alt"></i></div>
                    <input className='search-departure' placeholder='Departing'></input>
                </div>
                <div className='search-inputs'>
                    <div className='search-icon'><i className="fas fa-calendar-alt"></i></div>
                    <input className='search-arrival' placeholder='Arrival'></input>
                </div>
                <DatePicker
                    label="Basic example"
                    value={value}
                    onChange={(newValue) => {
                        setValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
                
            </div>

            <button className='search-btn'>Search</button>
        </div>
    );
}

export default Search;