import React from "react";
import "../styles.css";
import { Colors } from "../Colors";
import Button from '@mui/material/Button';

function NavigationBar() {
    const navigateToFAQ = () => {
        window.location.href = 'http://localhost:3000/faq';
      };
    return (
        <div className="navbarStyling">
            <a href="/" className="logoStyling" >GalaxyRental</a>
            <div style={{display:"flex", justifyContent:"right", width:"100%",marginRight: 30}}>
            <Button
            style={{
                marginRight:"20px",
                color: 'white',
            }}
            onClick={navigateToFAQ}
            >
            FAQ
            </Button>
            <Button variant="text" style={{color:"white", marginRight:20}}>LOGIN</Button>
            <Button variant="text" style={{color:"white"}}>SIGNUP</Button>
            </div>
        </div>
    );
}

export default NavigationBar;