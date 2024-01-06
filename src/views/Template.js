import React, { useState } from "react";
import "../styles.css";
import "../Colors";
import { Colors } from "../Colors";
import { Button, Input } from "@mui/material";
import {db} from "../utils/firebaseConfig";
import {collection, getDocs, addDoc} from "firebase/firestore";
import {dummyCarData} from "../const/dummyCarData";

function Template() {
    const [carModel, setCarModel] = useState(""); // State for car model
    const [dailyPrice, setDailyPrice] = useState(""); // State for daily price
    const [gearType, setGearType] = useState(""); // State for gear type
    const [location, setLocation] = useState(""); // State for location
    const [seatAmount, setSeatAmount] = useState(""); // State for seat amount
    const [carImageRef, setCarImageRef] = useState("");

    const carCollectionRef = collection(db, "car-data");

    const insertButtonHandler = async () => {
        for (const car of dummyCarData) {
            await addDoc(carCollectionRef, car);
        }
    };
    const insertFromInput = async () => {
        await addDoc(carCollectionRef, {
            carModel: carModel, 
            dailyPrice:dailyPrice,
            gearType:gearType,
            location:location,
            seatAmount:seatAmount,
            carImageRef: carImageRef,
        })
    };
    // { 
    //     carModel: carModel, 
    //     dailyPrice:dailyPrice,
    //     gearType:gearType,
    //     location:location,
    //     seatAmount:seatAmount,
    //     carImageRef: carImageRef,
    // }

    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%", height: "100%", gap: 20 }}>
            <h2>You can use the below button to insert dummy data to car data firebase database.</h2>
            <Input placeholder="Car Model" value={carModel} onChange={(e) => setCarModel(e.target.value)} /> {/* Controlled input for car model */}
            <Input placeholder="Daily Price" value={dailyPrice} onChange={(e) => setDailyPrice(e.target.value)} /> {/* Controlled input for daily price */}
            <Input placeholder="Gear Type" value={gearType} onChange={(e) => setGearType(e.target.value)} /> {/* Controlled input for gear type */}
            <Input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} /> {/* Controlled input for location */}
            <Input placeholder="Seat Amount" value={seatAmount} onChange={(e) => setSeatAmount(e.target.value)} /> {/* Controlled input for seat amount */}
            <Input placeholder="Car Image Link" value={carImageRef} onChange={(e) => setCarImageRef(e.target.value)} /> {/* Controlled input for seat amount */}
            <Button onClick={insertButtonHandler} variant="contained">Insert Dummy Data</Button>
            <Button onClick={insertFromInput} variant="contained">Insert from input</Button>
        </div>
    );
}

export default Template;
