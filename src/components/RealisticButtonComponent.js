import React, { useState, useEffect } from "react";
import "../styles.css";
import "../const/Colors";
import { Divider, Typography } from "@mui/material";

function RealisticButtonComponent({InputText, onClick, bgColor}) {
    return(
        <>
            <button style={{backgroundColor: bgColor}}onClick={onClick} class="button">{InputText}</button>
        </>
    );
}

export default RealisticButtonComponent;
