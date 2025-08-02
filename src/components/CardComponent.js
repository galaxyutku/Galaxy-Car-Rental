import React from "react";
import "../styles.css";
import { Colors } from "../Colors";
import Button from '@mui/material/Button';
import { Avatar, Card, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

function CardComponent({carModel, pickupPlace, seatAmount, gearType, dailyPrice, weeklyPrice}) {
    const navigate = useNavigate();
    return (
        <div>
            <Card onClick={()=>{navigate('/details')}} sx={{ display:"flex", flexWrap:"row", justifyContent:"center" ,width: 450, height: 330,border:"1px gray solid", '&:hover': { boxShadow: '3px 3px gray', borderColor: 'neutral.outlinedHoverBorder', cursor:'pointer', opacity:'0.93' }}}>
            <div style={{height:"100%", display:"flex", justifyContent:"center", flexDirection:"column", borderRight:"1px gray solid"}}>
                <CardMedia
                    component="img"
                    height="150px"
                    width="50px"
                    image={require("../assets/car_1.png")}
                    alt="car1"
                    sx={{ width:"200px" }}
                />
            </div>
            <div style={{display:"flex", flexDirection:"column"}}>
            <CardHeader
            title={carModel}
            subheader={pickupPlace}
            />
            <CardContent sx={{display:"flex", flexDirection:"row",flexWrap:"wrap", gap:2}}>
                <Typography sx={{display:"flex", flexDirection:"row", justifyContent:"center", gap:"3px"}}>
                    <PersonIcon /><span>{seatAmount} Seat</span>
                </Typography>
                <Typography sx={{display:"flex", flexDirection:"row", justifyContent:"center", gap:"3px"}}>
                    <DirectionsCarIcon /><span>{gearType}</span>
                </Typography>
            </CardContent>
            <CardContent sx={{display:"flex", flexDirection:"row", gap:2}}>
                <div style={{display:"flex", flexDirection:"column", gap:2}}>
                <span>Daily Price</span><span>{dailyPrice} $</span>
                </div>
                <div style={{display:"flex", flexDirection:"column", gap:2}}>
                <span>Weekly Price</span><span>{weeklyPrice} $</span>
                </div>
            </CardContent>
            </div>
            </Card>
        </div>
    );
}

export default CardComponent;