import React, { useState } from "react";
import "../styles.css";
import { Autocomplete, TextField, adaptV4Theme } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'


function HomePage() {
    const top100Films = [];
    return (
        <div className ="homepage">
            <div className="searchContainer">
                <div style={{width: "auto", borderRadius:"15px", padding:"10px", height: "85px", backgroundColor: "orange", display:"flex", justifyContent:"center", alignItems:"center"}}>
                <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={top100Films}
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
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker sx={{width:300, bgcolor:"white", marginX:3}} label="Pickup date" />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker sx={{width:300, bgcolor:"white"}} label="Drop off date" />
                </LocalizationProvider>
                </div>
            </div>
        </div>
    );
}

export default HomePage;