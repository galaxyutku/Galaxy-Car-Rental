import React, { useEffect, useState } from "react";
import "../styles.css";
import { Autocomplete, Button, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";


function HomePage() {
    const Places = ["hi", "hello"];
    const navigate = useNavigate();
    const [pickupPlace, setPickupPlace] = useState("");
    const [pickupDate, setPickupDate] = useState(null);
    const [dropoffDate, setDropoffDate] = useState(null);
    return (
        <div className ="homepage">
            <div className="searchContainer">
                <div style={{width: "auto", borderRadius:"15px", padding:"10px", height: "110px", backgroundColor: "orange", display:"flex", justifyContent:"center", alignItems:"center"}}>
                <div style={{display:"flex", flexDirection:"column",marginRight:"30px"}} >
                <span style={{marginBottom:10}}>Find a pickup place</span>
                <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={Places}
                sx={{
                    width: 600, 
                    bgcolor: "white",
                    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                        border: "1px solid #eee"
                    },
                    '& legend': { display: 'none' }, 
                    '& fieldset': { top: 0 },
                    '& .MuiInputLabel-shrink': { opacity: 0, transition: "all 0.2s ease-in", }
                }}
                renderInput={(params) => <TextField {...params} label="Places" />}
                onInputChange={(event, newInputValue) => {
                    setPickupPlace(newInputValue);
                  }}
                />
                </div>
                <div style={{display:"flex", flexDirection:"column",marginRight:"30px"}} >
                <span style={{marginBottom:10}}>Select a pickup date</span>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker 
                sx={{
                    width:300, 
                    bgcolor:"white", 
                    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                        border: "1px solid #eee"
                    },
                    '& legend': { display: 'none' }, 
                    '& fieldset': { top: 0 },
                    '& .MuiInputLabel-shrink': { opacity: 0, transition: "all 0.2s ease-in", }
                    }} 
                    label="Pickup Date" 
                    onChange={(newValue)=>{setPickupDate(newValue)}}
                    />
                </LocalizationProvider>
                </div>
                <div style={{display:"flex", flexDirection:"column",marginRight:"30px"}} >
                <span style={{marginBottom:"10px"}}>Select a drop off date</span>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker 
                sx={{
                    width:300, 
                    bgcolor:"white",
                    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                        border: "1px solid #eee"
                    },
                    '& legend': { display: 'none' }, 
                    '& fieldset': { top: 0 },
                    '& .MuiInputLabel-shrink': { opacity: 0, transition: "all 0.2s ease-in", }
                }} 
                label="Drop off Date"
                onChange={(newValue) => {setDropoffDate(newValue)}}
                />
                </LocalizationProvider>
                </div>
                <Button 
                onClick={() =>navigate('/results',{state:{pickupPlace: {pickupPlace}, pickupDate: {pickupDate}, dropoffDate: {dropoffDate}}})}
                style={{backgroundColor:"white", width:"120px", height:"70px", color:"black",marginTop:"15px"}}>Search</Button>
                </div>
            </div>
        </div>
    );
}

export default HomePage;