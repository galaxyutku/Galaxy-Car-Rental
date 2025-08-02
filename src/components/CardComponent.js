import React from "react";
import "../styles.css";
import { Colors } from "../Colors";
import Button from '@mui/material/Button';
import { Avatar, Card, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

function CardComponent({carModel, pickupPlace, seatAmount, gearType, dailyPrice}) {
    const navigate = useNavigate();
    return (
        <div>
            <Card onClick={()=>{navigate('/details')}} sx={{ display:"flex", flexWrap:"row", justifyContent:"center" ,width: "100%", height: 330,border:"1px gray solid", '&:hover': { boxShadow: '3px 3px gray', borderColor: 'neutral.outlinedHoverBorder', cursor:'pointer', opacity:'0.93' }}}>
            <CardMedia
                component="img"
                image={require("../assets/car_1.png")}
                alt="car1"
                sx={{ maxWidth:"225px", objectFit: "contain" }}
            />
            <div style={{display:"flex", flexDirection:"column", maxWidth:"200px", fontSize:"1vw", justifyContent:"center", textAlign:"center"}}>
                <CardHeader
                title={carModel}
                subheader={pickupPlace}
                />
                <CardContent sx={{display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"center", gap:2}}>
                    <Typography sx={{display:"flex", flexDirection:"row", justifyContent:"center", gap:"3px"}}>
                        <PersonIcon /><span>{seatAmount} Seat</span>
                    </Typography>
                    <Typography sx={{display:"flex", flexDirection:"row", justifyContent:"center", gap:"3px"}}>
                        <DirectionsCarIcon /><span>{gearType}</span>
                    </Typography>
                </CardContent>
                <CardContent sx={{display:"flex", flexDirection:"column", gap:1, justifyContent:"center", alignItems:"center"}}>
                    <span>Daily Price</span><span>{dailyPrice} $</span>
                </CardContent>
            </div>
            </Card>
        </div>
    );
}

export default CardComponent;