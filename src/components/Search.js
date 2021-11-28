import React, { useState } from "react";
import "./CSS/Search.css";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import LoadingButton from "@mui/lab/LoadingButton";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FlightLand, FlightTakeoff, Send } from "@mui/icons-material";
import { Navigate } from "react-router-dom";

function Search() {
    const today = new Date();
    const [departureDate, setDepartureDate] = useState(today);
    const [arrivalDate, setArrivalDate] = useState(departureDate);
    const [loading, setLoading] = useState(false);
    const [style, setStyle] = useState("active");
    const [bookingType, setBookingType] = useState("round");
    const [numPassenger, setNumPassenger] = useState(1);
    const [redirect, setRedirect] = useState(false);

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

    const search = () => {
        setLoading(true);
        // submit form
        setRedirect(true);
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
                        disblePortal
                        options={["Houston", "Dallas", "Russia"]}
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
                        disablePortal
                        options={["Houston", "Dallas", "Russia"]}
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
                            label="Arrival Date"
                            value={arrivalDate}
                            disablePast
                            onChange={(newDate) => {
                                checkArrivalDate(newDate);
                            }}
                            renderInput={(params) => <TextField {...params} helperText=" " />}
                        />
                    </div>
                )}
                <TextField
                    id="outlined-number"
                    label="Passengers"
                    type="number"
                    defaultValue={numPassenger}
                    onChange={setNumPassenger}
                    InputProps={{ pattern: "[0-9]*", inputProps: { min: 1, max: 138 } }}
                />
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
                {redirect ? <Navigate push to="/search-flight/flights" /> : null}
            </ThemeProvider>
        </div>
    );
}

export default Search;
