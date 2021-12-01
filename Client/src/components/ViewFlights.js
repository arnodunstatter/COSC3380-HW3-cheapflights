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


export default function ViewFlights() {
    const location = useLocation();
    const state = location.state;

    function flightBack() {
        return (
            <div style={{ display: "inline", margin: "20 px"}}>
                <Box sx={{ bgcolor: 'background.paper' }}>    
                    < Typography variant="h5" component="h5" align="center">
                    Choose Your Flight Back:
                    </Typography >
                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        {(state[0] == 'round') && state[2].map(data => <Flights
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
                            Choose Flight To Destination:
                        </Typography>
                        <List sx={{ width: '100%',  bgcolor: 'background.paper' }}>
                            {state && state[1].map(data => <Flights
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
                {(state[0] == 'round') && flightBack()}
            </div>

            <Link className="flights-btn-container" to="/search-flight">
                <button className="flights-btn">Back</button>
            </Link>
            <Link className="flights-btn-container" to="/checkout">
                <button className="flights-btn">Checkout</button>
            </Link>
        </div>

    );
}

function Flights(props) {
    const [open, setOpen] = useState(props.stop-1);
    const [checked, setChecked] = React.useState([0]);

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
        return format(new Date(timestamp), 'MM/dd/yyy HH:mm aaa');
    }
    
    const handleClick = () => {
        setOpen(!open);
    };

    return (
        
        <List disablePadding dense>
            <ListItemButton role={undefined} onClick={handleClick} disablePadding dense>
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        //checked={checked.indexOf(value.val) !== -1}
                        tabIndex={-1}
                        disableRipple
                    //inputProps={{ 'aria-labelledby': labelId }}
                    />
                </ListItemIcon>
                <ListItemText id={props.flightNumber[0] + props.flightNumber[1]}
                    primary={`${props.stop == 0 ? 'Direct Flight    -' : 'Connecting flight  -'} 
                    ${props.stop == 0 ? '' : ' 1 Stop -'}  
                    Total Time:  ${props.elapsedtime[2].hours} 
                    Hour${props.elapsedtime[2].hours > 1 ? 's' : ''}`} />
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
                                        Departure Location: {props.departureCity[value] + ', ' + props.departureAirPortCode[value] + '\t\t'}
                                        Arrival Location: {props.arrivalCity[value] + ', ' + props.arrivalAirPortCode[value]} </pre>
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
