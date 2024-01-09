import React, { useEffect, useState } from "react";
import "../styles.css";
import { useLocation } from "react-router-dom";
import {
  CardHeader,
  Card,
  CardContent,
  Typography,
  Autocomplete,
  TextField,
  Skeleton,
} from "@mui/material";
import CardComponent from "../components/CardComponent";
import { db } from "../utils/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { carBrands } from "../const/carBrands";
import { Places } from "../const/Places";
import dayjs from "dayjs";

function ResultPage() {
  const location = useLocation();
  const [choosedPickupPlace, setChoosedPickupPlace] = useState(
    location.state.pickupPlace.pickupPlace
  );

  const allGearTypes = ["Automatic", "Manual"];
  const allSeatAmounts = [2, 4, 5];
  const [selectedGearType, setSelectedGearType] = useState("");
  const [selectedSeatAmount, setSelectedSeatAmount] = useState("");
  const [carBrand, setCarBrand] = useState("");
  const [carData, setCarData] = useState(null);
  const [rentData, setRentData] = useState(null);
  const [pickupDateFormat, setPickupDateFormat] = useState(dayjs(location.state.pickupDateFormat.pickupDateFormat));
  const [dropoffDateFormat, setDropoffDateFormat] = useState(dayjs(location.state.dropoffDateFormat.dropoffDateFormat));

  const carCollectionRef = collection(db, "car-data");
  const rentCollectionRef = collection(db, "rent-status");

  useEffect(() => {
    const getCarData = async () => {
      const data = await getDocs(carCollectionRef);
      setCarData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    const getBookingData = async () => {
      const data = await getDocs(rentCollectionRef);
      setRentData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getCarData();
    getBookingData();
  }, []);

  function isDateRangeOverlapping(rentBetween, pickupDateFormat, dropoffDateFormat)  {
    const startRentDate = (dayjs(String(rentBetween).split("-")[0], "DD/MM/YYYY"));
    const endRentDate = (dayjs(String(rentBetween).split("-")[1], "DD/MM/YYYY"));
    const pickupDate = new Date(pickupDateFormat);
    const dropoffDate = new Date(dropoffDateFormat);
  
    return (
      (startRentDate <= pickupDate && endRentDate >= pickupDate) ||
    (startRentDate <= dropoffDate && endRentDate >= dropoffDate) ||
    (startRentDate >= pickupDate && endRentDate <= dropoffDate)
    );
  }

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
                console.log(new Date(pickupDateFormat));
                console.log(new Date(dropoffDateFormat));
                setSelectedSeatAmount(newInputValue);
              }}
            />
          </CardContent>
        </Card>
      </div>
      <div className="cardContainer">
        {(carData && rentData) ? (
          carData
            .filter((car) => {
              const matchedRentData = rentData.find(
                (rent) =>
                  (rent.carHash == car.id) &&
                  isDateRangeOverlapping(rent.rentBetween, pickupDateFormat, dropoffDateFormat)
              );
              if (matchedRentData &&(matchedRentData.carHash != "" && matchedRentData.carHash == car.id)) {
                return false;
              }
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
                pickupDate={location.state.pickupDate.pickupDate}
                dropoffDate={location.state.dropoffDate.dropoffDate}
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
