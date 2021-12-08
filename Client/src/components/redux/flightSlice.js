import { createSlice, PayloadAction } from '@reduxjs/toolkit'


export const flightSlice = createSlice({
    name: 'flightInfo',
    initialState: {
        bookingType: "round",
        seatClass: "economy",
        departureLoc: "",
        arrivalLoc: "",
        arrivalDate: "",
        departureDate: "",
        typeFlight: "Direct Flight", 
        desFlightNum: [],
        arrivalFlightNum: [],   
        passengerNum: 1,
        functionName: "", 
    },
    reducers: {
        setFlights: (state, action) => {
            state.desFlightNum = action.payload[0];
            state.arrivalFlightNum = action.payload[1];
        },
        setArrivalFlight: (state, action) => {
            state.arrivalFlightNum = action.payload;
        },
        setPassengerNum: (state, action) => {
            state.passengerNum = action.payload;
            console.log(state.passengerNum, action.payload); 
        },
        setBookingType: (state, action) => {
            state.bookingType = action.payload; 
        },
        setSeatClass: (state, action) => {
            state.seatClass = action.payload;
        },
        setDepartureLoc: (state, action) => {
            state.departureLoc = action.payload;
        },
        setArrivalLoc: (state, action) => {
            state.arrivalLoc = action.payload;
        },
        setArrivalDate: (state, action) => {
            state.arrivalDate = action.payload;
        },
        setDepartureDate: (state, action) => {
            state.bookingType = action.payload;
        },
        setFunctionName: (state, action) => {
            state.functionName = action.payload; 
        } 
    },
})

// Action creators are generated for each case reducer function
export const { setPassengerNum, setFlights, setFunctionName} = flightSlice.actions

export default flightSlice.reducer