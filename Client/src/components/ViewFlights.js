import React, {useState} from "react";
import "./CSS/Flights.css";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ListItem from '@mui/material/ListItem';
import Card from '@mui/material/Card';
import { format } from 'date-fns';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FlightLand, FlightTakeoff, Send } from "@mui/icons-material";

import { addFlight } from './redux/flightSlice';
import { useSelector, useDispatch } from "react-redux";


export default function ViewFlights() {
    const location = useLocation();
    const state = location.state;
    console.log(state); 

    const [desChecked, setDesChecked] = React.useState([]);
    const [arrivalChecked, setArrivalChecked] = React.useState([]);
    const [desFlightData, setDesFlightData] = useState({
        departureLoc: "",
        arrivalLoc: "",
        arrivalDate: "",
        departureDate: "",
        typeFlight: "Direct Flight",
        price: "500"
    });
    const [arrivalFlightData, setArrivalFlightData] = useState({
        departureLoc: "",
        arrivalLoc: "",
        arrivalDate: "",
        departureDate: "",
        typeFlight: "Direct Flight",
        price: "700"
    });
    const navigate = useNavigate();

    function sendCheckoutInformation() {
        let flightNum = [desChecked[0]]

        if (desFlightData.typeFlight == "Connecting Flight")
            flightNum.push(desChecked[1])
        
        if (state[0].bookingType == 'round') {
            flightNum.push(arrivalChecked[0])
            if (arrivalFlightData.typeFlight == "Connecting Flight")
                flightNum.push(desChecked[1])
        }
        
        
        navigate("/checkout", {
            state:
            {
                numPassenger: state[0].numPassenger,
                bookingType: state[0].bookingType == 'round' ? "Round Trip" : "One-way",
                seatClass: state[0].seatClass,
                flightNums: flightNum, 
                flightData: { desFlightData, arrivalFlightData }
            }
        }
        
        );
    }
    
    function flightBack() {
        return (
            <div style={{ display: "inline", margin: "20 px"}}>
                <Box sx={{ bgcolor: 'background.paper' }}>  
                    < Typography variant="h5" component="h5" align="center">  
                        <FlightTakeoff />{'\t\t\t\t'}Choose Your Flight Back:
                    </Typography >
                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        {(state[0].bookingType == 'round') && state[2].map(data => <Flights
                            setArrivalFlightData={setArrivalFlightData}
                            arrivalChecked={arrivalChecked}
                            setArrivalChecked = {setArrivalChecked}
                            direction={"arrival"}
                            flightNumber={[data.flight_no, data.flight_no2]}
                            stop={data.stop}
                            departingTime={[data.departure_time, data.departure_time2]}
                            arrivalTime={[data.arrival_time, data.arrival_time2]}
                            price={[data.price, data.price2]}
                            available_seats={[data.available_seats, data.available_seats2]}
                            elapsedtime={[data.elapsedtime, data.elapsedtime2, data.totalelapsedtime]}
                            departureCity={[data.departurecity, data.departurecity2]}
                            arrivalCity={[data.arrivalcity, data.arrivalcity2]}
                            departureAirPortCode={[data.departureairportcode, data.departureairportcode2]}
                            arrivalAirPortCode={[data.arrivalairportcode, data.arrivalairportcode2]}
                        />)}
                    </List>
                </Box>
            </div>
        );
    }

    return (
        <div>
            <div>    
                <div style={{ margin: "auto", display: "inline" }}>
                    <Box
                        sx={{ bgcolor: 'background.paper' }}
                    >
                        <Typography variant="h5" component="h5" align="center">
                            <FlightLand />{'\t\t\t\t'}Choose Departing Flight:
                        </Typography>
                        <List sx={{ width: '100%',  bgcolor: 'background.paper' }}>
                            {state && state[1].map(data => <Flights
                                setDesFlightData={setDesFlightData}
                                desChecked={desChecked}
                                setDesChecked={setDesChecked}
                                direction={"destination"}
                                flightNumber={[data.flight_no, data.flight_no2]}
                                stop={data.stop}
                                departingTime={[data.departure_time, data.departure_time2]}
                                arrivalTime={[data.arrival_time, data.arrival_time2]}
                                price={[data.price, data.price2]}
                                available_seats={[data.available_seats, data.available_seats2]}
                                elapsedtime={[data.elapsedtime, data.elapsedtime2, data.totalelapsedtime]}
                                departureCity={[data.departurecity, data.departurecity2]}
                                arrivalCity={[data.arrivalcity, data.arrivalcity2]}
                                departureAirPortCode={[data.departureairportcode, data.departureairportcode2]}
                                arrivalAirPortCode={[data.arrivalairportcode, data.arrivalairportcode2]}
                            />)}
                        </List>
                    </Box>
                </div>      
                {(state[0].bookingType == 'round') && flightBack()}
            </div>

            <Link className="flights-btn-container" to="/search-flight">
                <button className="flights-btn" >Back</button>
            </Link>
            <button className="flights-btn" onClick = {sendCheckoutInformation}>Checkout</button>
        </div>

    );
}

function Flights(props) {
    const [open, setOpen] = useState(props.stop-1);
    const [checked, setChecked] = React.useState([]);
    const dispatch = useDispatch();

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };

    function formatDate(timestamp) {
        return format(new Date(timestamp), 'MM/dd/yyyy HH:mm aaa');
    }
    
    const handleClick = () => {
        if (open) {
            let flightNum = [props.flightNumber[0], props.flightNumber[1]];    
            let flightInfo = {
                departureLoc: [props.departureCity[0] + ', ' + props.departureAirPortCode[0],
                props.departureCity[1] + ', ' + props.departureAirPortCode[1]],
                arrivalLoc: [[props.arrivalCity[0] + ', ' + props.arrivalAirPortCode[0]],
                [props.arrivalCity[1] + ', ' + props.arrivalAirPortCode[1]]],
                arrivalDate: [formatDate(props.arrivalTime[0]), formatDate(props.arrivalTime[1])],
                departureDate: [formatDate(props.departingTime[0]), formatDate(props.arrivalTime[1])],
                typeFlight: props.stop == 0 ? "Direct Flight" : "Connecting Flight",
                price: props.stop == 0 ? parseInt(props.price[0]) :  parseInt(props.price[0]) + parseInt(props.price[1])
            };
            if (props.direction == "destination") {
                props.setDesChecked(flightNum)
                props.setDesFlightData(flightInfo)
            } else {
                props.setArrivalChecked(flightNum)
                props.setArrivalFlightData(flightInfo)
            }
        }
        setOpen(!open);
    };

    const shouldBeChecked = () => {
        if (props.direction == "destination") {
            return (props.desChecked[0] == props.flightNumber[0] && props.desChecked[1] == props.flightNumber[1])
        } else {
            return (props.arrivalChecked[0] == props.flightNumber[0] && props.arrivalChecked[1] == props.flightNumber[1])
        }
    }

    return (    
        <List disablePadding dense>
            <ListItemButton role={undefined} onClick={handleClick} disablePadding dense>
                
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={shouldBeChecked()}
                        tabIndex={-1}
                        disableRipple
                    />
                </ListItemIcon>
                <ListItemText id={props.flightNumber[0] + props.flightNumber[1]}
                    primary={`${props.stop == 0 ? 'Direct Flight    -' : 'Connecting flight  -'} 
                    ${props.stop == 0 ? '' : ' 1 Stop -'}  
                    Total Time:
                    ${props.elapsedtime[2].days ? props.elapsedtime[2].days+' Day and ': ''}
                    ${props.elapsedtime[2].hours ? props.elapsedtime[2].hours : '00'}:${props.elapsedtime[2].minutes ? props.elapsedtime[2].minutes : '00' + ''}
                    ${props.elapsedtime[2].hours >= 1 ? 'Hours' : ''}
                    `}
                />
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <ListItem component="div" >
                    <div style={{ padding: '10px' , margin: '10px'}}>
                        {[...Array(props.stop + 1).keys()].map((value) => (

                            <ListItem key={props.flightNumber[value]}>
                                <Card style={{ padding: '0px 30px 0px', margin: '10px', marginTop: '0px' }}>
                                    <pre>
                                        Flight number: {props.flightNumber[value] + '\t\t\t\t'}
                                        Available Seats: {props.available_seats[value]} </pre>
                                    <pre>
                                        Departure Time: {formatDate(props.departingTime[value]) + '\t\t'}
                                        Arrival Time: {formatDate(props.arrivalTime[value])} </pre>
                                    <pre>
                                        Departure Location: {props.departureCity[value] + ' (' + props.departureAirPortCode[value] + ')\t\t'}
                                        Arrival Location: {props.arrivalCity[value] + ' (' + props.arrivalAirPortCode[value] +')'}</pre>
                                    <pre>
                                        Price: ${props.price[value] + '                    '}</pre>
                                </Card>
                            </ListItem>
                        ))}
                    </div>
                </ListItem>
            </Collapse>
        </List>
    );
}
