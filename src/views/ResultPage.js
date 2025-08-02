import React, { useEffect, useState } from "react";
import "../styles.css";
import { useLocation } from "react-router-dom";
import { CardMedia, CardHeader, Card, CardContent, Typography, CardActions, Button, Avatar, IconButton, Select, MenuItem, InputLabel, Autocomplete, TextField } from "@mui/material";
import CardComponent from "../components/CardComponent";
import {db} from '../utils/firebaseConfig';
import {collection, getDocs} from "firebase/firestore";
import { Label } from "@mui/icons-material";


function ResultPage() {
    const location = useLocation();
    const choosedPickupPlace = location.state.pickupPlace.pickupPlace;
    const choosedPickupDate = new Date(location.state.pickupDate.pickupDate.$d);
    const choosedDropoffDate = new Date(location.state.dropoffDate.dropoffDate.$d);
    const formattedPickupDate = choosedPickupDate.getDate() + '/' + choosedPickupDate.getMonth() + 1 + '/' + choosedPickupDate.getFullYear();
    const formattedDropoffDate = choosedDropoffDate.getDate() + '/' + choosedDropoffDate.getMonth() + 1 + '/' + choosedDropoffDate.getFullYear();

    const allGearTypes = ["Automatic", "Manuel", "Half-automatic"];
    const allSeatAmounts = [4, 5, 6, 7];
    const [selectedGearType, setSelectedGearType] = useState("");
    const [selectedSeatAmount, setSelectedSeatAmount] = useState("");

    const [carModel, setCarModel] = useState(null);
    const [pickupPlace, setPickupPlace] = useState(null);
    const [seatAmount, setSeatAmount] = useState(null);
    const [gearType, setGearType] = useState(null);
    const [dailyPrice, setDailyPrice] = useState(null);

    const [carData, setCarData] = useState(null);
    const carCollectionRef = collection(db, "car-data");

    useEffect(() => {
        const getCarData = async () => {
            const data = await getDocs(carCollectionRef);
            setCarData(data.docs.map((doc) =>({...doc.data(), id:doc.id})))
        }
        getCarData()
    }, []);

    return (
        <div className ="resultpage">
            <div className="filterBar">
                <Card>
                    <CardHeader title="Filters" />
                <CardContent >
                    <Typography>
                        Select Gear Type
                    </Typography>
                    <Autocomplete
                    disablePortal
                    options={allGearTypes}
                    sx={{
                        width: "100%", 
                        bgcolor: "white",
                        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                            border: "1px solid #eee"
                        },
                        '& legend': { display: 'none' }, 
                        '& fieldset': { top: 0 },
                        '& .MuiInputLabel-shrink': { opacity: 0, transition: "all 0.2s ease-in", }
                    }}
                    renderInput={(params) => <TextField {...params} label="Gear Types" />}
                    onInputChange={(event, newInputValue) => {
                        setSelectedGearType(newInputValue);
                    }}
                    />
                </CardContent>
                <CardContent >
                    <Typography>
                        Select Seat Amount
                    </Typography>
                    <Autocomplete
                    disablePortal
                    options={allSeatAmounts}
                    sx={{
                        width: "100%", 
                        bgcolor: "white",
                        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                            border: "1px solid #eee"
                        },
                        '& legend': { display: 'none' }, 
                        '& fieldset': { top: 0 },
                        '& .MuiInputLabel-shrink': { opacity: 0, transition: "all 0.2s ease-in", }
                    }}
                    renderInput={(params) => <TextField {...params} label="Seat Amount" />}
                    onInputChange={(event, newInputValue) => {
                        setSelectedSeatAmount(newInputValue);
                    }}
                    />
                </CardContent>
                </Card>
            </div>
            <div className="cardContainer">
            {carData ? (
            carData
            .filter((car) => {
                if (
                    (selectedGearType != "" && car.gearType != selectedGearType) ||
                    (selectedSeatAmount != "" && car.seatAmount != selectedSeatAmount)
                ) {
                    return false;
                }
                return true;
            })
            .map((car, index) => (
                <CardComponent
                    key={car.id}
                    carModel={car.carModel}
                    pickupPlace={car.pickupPlace}
                    seatAmount={car.seatAmount}
                    gearType={car.gearType}
                    dailyPrice={car.dailyPrice}
                />
            ))
            ) : (
                <p>Loading...</p>
            )}
            </div>
        </div>
    );
}

export default ResultPage;