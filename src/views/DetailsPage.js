import React, { useState } from "react";
import "../styles.css";
import { Colors } from "../Colors";

function DetailsPage() {

    return (
        <div className ="detailsPage">
            <div className="detailsContainer">
                <img src={require("../assets/car_1.png")}></img>
            </div>
        </div>
    );
}

export default DetailsPage;