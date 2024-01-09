import React, { useState, useEffect } from "react";
import "../styles.css";
import "../const/Colors";
import { Divider, Typography } from "@mui/material";

function DetailComponent({IncomingText}) {
    return(
        <Typography sx={{ fontWeight: "bold", fontSize: "140%" }}>
            {IncomingText}
            <Divider
            sx={{ marginTop: "10px", marginBottom: "10px" }}
            />
        </Typography>
    );
}

export default DetailComponent;
