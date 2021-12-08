import React, { useState, useEffect } from "react";
import "./CSS/Search.css";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import LoadingButton from "@mui/lab/LoadingButton";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FlightLand, FlightTakeoff, Send } from "@mui/icons-material";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { setPassengerNum , setFunctionName} from './redux/flightSlice'


function Search() {
    const today = new Date();
    const [departureDate, setDepartureDate] = useState(today);
    const [arrivalDate, setArrivalDate] = useState(departureDate);
    const [departureCity, setDepartureCity] = useState("");
    const [arrivalCity, setArrivalCity] = useState("");
    const [seatClass, setSeatClass] = useState('economy')
    const [loading, setLoading] = useState(false);
    const [style, setStyle] = useState("active");
    const [bookingType, setBookingType] = useState("round");
    const [numPassenger, setNumPassenger] = useState(1);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    
    const cities = location.state;
    console.log(cities);

    const [cityList, setCityList] = useState(cities);

    const checkArrivalDate = (newDate) => {
        if (newDate < departureDate) {
            setDepartureDate(newDate);
        }
        setArrivalDate(newDate);
    };

    const checkDepartureDate = (newDate) => {
        if (newDate) {
        }
        if (arrivalDate < newDate) {
            setArrivalDate(newDate);
        }
        setDepartureDate(newDate);
    };
    const submitTheme = createTheme({
        palette: {
            neutral: {
                light: "#EEB2C4",
                contrastText: "#fff",
                main: "#94002c",
            },
        },
    });

    const search = async() => {
        setLoading(true);

        let departure_date = departureDate.getFullYear() + '-' + (departureDate.getMonth() + 1) + '-' + departureDate.getDate();
        let arrival_date = arrivalDate.getFullYear() + '-' + (arrivalDate.getMonth() + 1) + '-' + arrivalDate.getDate();
        
        dispatch(setPassengerNum(numPassenger));
        try {
            const body = { departure_date, departureCity, arrivalCity, numPassenger, seatClass };
            console.log(body); 
            const response = await fetch("http://localhost:5000/search-flight/flights", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            if (bookingType == 'round') {
                const body2 = { departure_date: arrival_date, departureCity: arrivalCity, arrivalCity: departureCity, numPassenger, seatClass };
                console.log(body2);
                const response2 = await fetch("http://localhost:5000/search-flight/flights", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body2)
                });
                dispatch(setFunctionName("findFlight"));
                navigate("/search-flight/flights", { state: [{ numPassenger, bookingType, seatClass }, await response.json(), await response2.json() ] });
            } else {
                dispatch(setFunctionName("findFlight"));
                navigate("/search-flight/flights", { state: [{ numPassenger, bookingType, seatClass }, await response.json()] });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="search-container">
            <div className="search-selection">
                <div
                    onClick={() => {
                        setBookingType("round");
                        setStyle("active");
                    }}
                    className={`search-selection-btn round-${style}`}
                >
                    <p>Roundtrip</p>
                </div>
                <div
                    onClick={() => {
                        setBookingType("oneway");
                        setStyle("show");
                    }}
                    className={`search-selection-btn oneway-${style}`}
                >
                    <p>One-Way</p>
                </div>
            </div>

            <div className="search-form">
                
                    <div className="inputs">
                        <Autocomplete
                            value={departureCity}
                            onChange={(event, newValue) => {
                                setDepartureCity(newValue);
                            }}
                            disblePortal
                            options={cityList}
                            sx={{ width: 300 }}
                            freeSolo
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={<FlightTakeoff />}
                                    helperText="Departing Location"
                                />
                            )}
                        />
                    </div>
                    <div className="inputs">
                        <Autocomplete
                            value={arrivalCity}
                            onChange={(event, newValue) => {
                                setArrivalCity(newValue);
                            }}
                            disablePortal
                            options={cityList}
                            sx={{ width: 300 }}
                            freeSolo
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={<FlightLand />}
                                    helperText="Destination"
                                />
                            )}
                        />
                    </div>

                    <div className="inputs">
                        <DatePicker
                            label="Departure Date"
                            value={departureDate}
                            disablePast
                            onChange={(newDate) => {
                                bookingType === "round"
                                    ? checkDepartureDate(newDate)
                                    : setDepartureDate(newDate);
                            }}
                            renderInput={(params) => <TextField {...params} helperText=" " />}
                        />
                    </div>
                    {bookingType === "round" && (
                        <div className="inputs">
                            <DatePicker
                                label="Return Date"
                                value={arrivalDate}
                                disablePast
                                onChange={(newDate) => {
                                    checkArrivalDate(newDate);
                                }}
                                renderInput={(params) => <TextField {...params} helperText=" " />}
                            />
                        </div>
                )}
                <div className="inputs">
                    <TextField
                        id="outlined-number"
                        label="Passengers"
                        type="number"
                        defaultValue={numPassenger}
                        onChange={(event) => setNumPassenger(event.target.value)}
                        InputProps={{ pattern: "[0-9]*", inputProps: { min: 1, max: 138 } }}
                    />
                  
                    <Select
                        defaultValue={seatClass}
                        label="Class Preference"
                        onChange={(event) => {setSeatClass(event.target.value)}}
                        autoWidth={true}
                    >
                        <MenuItem value={'business'}>Business</MenuItem>
                        <MenuItem value={'economy'}>Economy</MenuItem>
                    </Select>
                </div>
            </div>


            <ThemeProvider theme={submitTheme}>
                <LoadingButton
                    className="search-btn"
                    onClick={search}
                    endIcon={<Send />}
                    loading={loading}
                    loadingPosition="end"
                    variant="contained"
                    color="neutral"
                >
                    Search
                </LoadingButton>
            </ThemeProvider>
        </div>
    );
}

export default Search;
