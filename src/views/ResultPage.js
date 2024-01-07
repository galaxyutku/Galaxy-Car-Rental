import React, { useEffect, useState } from "react";
import "../styles.css";
import { useLocation } from "react-router-dom";
import {
  CardMedia,
  CardHeader,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Avatar,
  IconButton,
  Select,
  MenuItem,
  InputLabel,
  Autocomplete,
  TextField,
  Skeleton,
} from "@mui/material";
import CardComponent from "../components/CardComponent";
import { db } from "../utils/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Label } from "@mui/icons-material";
import { carBrands } from "../const/carBrands";
import { Places } from "../const/Places";

function ResultPage() {
  const location = useLocation();
  const [choosedPickupPlace, setChoosedPickupPlace] = useState(
    location.state.pickupPlace.pickupPlace
  );
  const choosedPickupDate = new Date(location.state.pickupDate.pickupDate.$d);
  const choosedDropoffDate = new Date(
    location.state.dropoffDate.dropoffDate.$d
  );
  const formattedPickupDate =
    ("0" + choosedPickupDate.getDate()).slice(-2) +
    "/" +
    ("0" + (choosedPickupDate.getMonth() + 1)).slice(-2) +
    "/" +
    choosedPickupDate.getFullYear();

  const formattedDropoffDate =
    ("0" + choosedDropoffDate.getDate()).slice(-2) +
    "/" +
    ("0" + (choosedDropoffDate.getMonth() + 1)).slice(-2) +
    "/" +
    choosedDropoffDate.getFullYear();

  const allGearTypes = ["Automatic", "Manual"];
  const allSeatAmounts = [4, 5, 6, 7];
  const [selectedGearType, setSelectedGearType] = useState("");
  const [selectedSeatAmount, setSelectedSeatAmount] = useState("");
  const [carBrand, setCarBrand] = useState("");

  const [carData, setCarData] = useState(null);
  const carCollectionRef = collection(db, "car-data");

  useEffect(() => {
    const getCarData = async () => {
      const data = await getDocs(carCollectionRef);
      setCarData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(formattedDropoffDate);
      console.log(formattedPickupDate);
    };
    getCarData();
  }, []);

  return (
    <div className="resultpage">
      <div className="filterBar">
        <Card>
          <CardHeader title="Filters" />
          <CardContent>
            <Typography>Select Car Brand</Typography>
            <Autocomplete
              disablePortal
              options={carBrands}
              sx={{
                width: "100%",
                bgcolor: "white",
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  border: "1px solid #eee",
                },
                "& legend": { display: "none" },
                "& fieldset": { top: 0 },
                "& .MuiInputLabel-shrink": {
                  opacity: 0,
                  transition: "all 0.2s ease-in",
                },
              }}
              renderInput={(params) => (
                <TextField {...params} label="Car Brands" />
              )}
              onInputChange={(event, newInputValue) => {
                setCarBrand(newInputValue);
              }}
            />
          </CardContent>
          <CardContent>
            <Typography>Select City</Typography>
            <Autocomplete
              disablePortal
              options={Places}
              sx={{
                width: "100%",
                bgcolor: "white",
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  border: "1px solid #eee",
                },
                "& legend": { display: "none" },
                "& fieldset": { top: 0 },
                "& .MuiInputLabel-shrink": {
                  opacity: 0,
                  transition: "all 0.2s ease-in",
                },
              }}
              value={choosedPickupPlace}
              renderInput={(params) => <TextField {...params} label="City" />}
              onInputChange={(event, newInputValue) => {
                setChoosedPickupPlace(newInputValue);
              }}
            />
          </CardContent>
          <CardContent>
            <Typography>Select Gear Type</Typography>
            <Autocomplete
              disablePortal
              options={allGearTypes}
              sx={{
                width: "100%",
                bgcolor: "white",
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  border: "1px solid #eee",
                },
                "& legend": { display: "none" },
                "& fieldset": { top: 0 },
                "& .MuiInputLabel-shrink": {
                  opacity: 0,
                  transition: "all 0.2s ease-in",
                },
              }}
              renderInput={(params) => (
                <TextField {...params} label="Gear Types" />
              )}
              onInputChange={(event, newInputValue) => {
                setSelectedGearType(newInputValue);
              }}
            />
          </CardContent>
          <CardContent>
            <Typography>Select Seat Amount</Typography>
            <Autocomplete
              disablePortal
              options={allSeatAmounts}
              sx={{
                width: "100%",
                bgcolor: "white",
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  border: "1px solid #eee",
                },
                "& legend": { display: "none" },
                "& fieldset": { top: 0 },
                "& .MuiInputLabel-shrink": {
                  opacity: 0,
                  transition: "all 0.2s ease-in",
                },
              }}
              renderInput={(params) => (
                <TextField {...params} label="Seat Amount" />
              )}
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
                (selectedSeatAmount != "" &&
                  car.seatAmount != selectedSeatAmount) ||
                (carBrand != "" && car.carModel.split(" ")[0] != carBrand) ||
                (choosedPickupPlace != "" && choosedPickupPlace != car.location)
              ) {
                return false;
              }
              return true;
            })
            .map((car, index) => (
              <CardComponent
                key={car.id}
                carModel={car.carModel}
                pickupPlace={car.location}
                seatAmount={car.seatAmount}
                gearType={car.gearType}
                dailyPrice={car.dailyPrice}
                pickupDate={formattedPickupDate}
                dropoffDate={formattedDropoffDate}
                choosedPickupPlace={choosedPickupPlace}
                carImageRef={car.carImageRef}
                carHashID={car.id}
              />
            ))
        ) : (
          <>
            <Skeleton variant="rectangular" width={"30%"} height={"30%"} />
            <Skeleton variant="rectangular" width={"30%"} height={"30%"} />
            <Skeleton variant="rectangular" width={"30%"} height={"30%"} />
            <Skeleton variant="rectangular" width={"30%"} height={"30%"} />
            <Skeleton variant="rectangular" width={"30%"} height={"30%"} />
            <Skeleton variant="rectangular" width={"30%"} height={"30%"} />
          </>
        )}
      </div>
    </div>
  );
}

export default ResultPage;
