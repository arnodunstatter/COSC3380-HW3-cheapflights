import React from 'react';
import './CSS/Search.css'

function Search() {
    return (
        <div className='search-container'>
            <div className='search-place'>
            <input className='search-from' placeholder='From'></input>
            <input className='search-goingto' placeholder='Going to'></input>
            </div>
            

            <div className='search-dates'>
                <input className='search-checkin' placeholder='Check-in'></input>
                <input className='search-checkout' placeholder='Check-out'></input>
            </div>
            
            <input className='search-travelers' placeholder='Travelers'></input>
            <button className='search-btn'>Search</button>
        </div>
    );
}

export default Search;