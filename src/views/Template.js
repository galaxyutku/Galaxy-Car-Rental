import React, { useState } from "react";
import "../styles.css";
import {useNavigate} from "react-router-dom";
import "../Colors";
import { Colors } from "../Colors";

function Template() {

    const navigate = useNavigate();

    return (
        <div className ="template">
            <button onClick={() => navigate('/searchpage')} style={{width:'130px', height:'100px',background: Colors.galaxyBlue}}>Go Search</button>
        </div>
    );
}

export default Template;