import React, { useState } from "react";
import "../../styles.css";
import "../../const/Colors";
import {
  Button,
  Card,
  Input,
  Snackbar,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Autocomplete,
  TextField,
} from "@mui/material";
import { db } from "../../utils/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import AlertComponent from "../../components/AlertComponent";
import { Places } from "../../const/Places";
import { carBrands } from "../../const/carBrands";

function AdminPanelCreateCar() {
  const [carModel, setCarModel] = useState(""); // State for car model
  const [carBrand, setCarBrand] = useState("");
  const [dailyPrice, setDailyPrice] = useState(""); // State for daily price
  const [gearType, setGearType] = useState(""); // State for gear type
  const [location, setLocation] = useState(""); // State for location
  const [seatAmount, setSeatAmount] = useState(""); // State for seat amount
  const [carPlate, setCarPlate] = useState(""); // State for seat amount
  const [carImageRef, setCarImageRef] = useState("");
  const [errorStatus, setErrorStatus] = useState(false); // Changed initial state to false
  const [errorMessage, setErrorMessage] = useState("");
  const [alertType, setAlertType] = useState("error");
  const [errorDetail, setErrorDetail] = useState("");
  const [open, setOpen] = useState(false);

  const carCollectionRef = collection(db, "car-data");

  // const insertButtonHandler = async () => {  //Use This to Insert Dummy data to database to fill the site for experimental purposes.
  //     for (const car of dummyCarData) {
  //         await addDoc(carCollectionRef, car);
  //     }
  // };
  const insertFromInput = async () => {
    if (
      carModel != "" &&
      dailyPrice != "" &&
      gearType != "" &&
      location != "" &&
      seatAmount != "" &&
      carImageRef != "" &&
      carPlate != ""
    ) {
      await addDoc(carCollectionRef, {
        carModel: carBrand + " " + carModel,
        dailyPrice: Number(dailyPrice),
        gearType: gearType,
        location: location,
        seatAmount: Number(seatAmount),
        carImageRef: carImageRef,
        carPlate: carPlate,
      });
      setAlertType("success");
      setErrorDetail("success-message");
      setErrorMessage("You have successfully generated the car data.");
      setErrorStatus(true);
      window.location.reload(false);
    } else {
      setAlertType("warning");
      setErrorDetail("warning-message");
      setErrorMessage("You have to fill all the inputs.");
      setErrorStatus(true);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        gap: 20,
      }}
    >
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Car Create Confirm"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to create car?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={insertFromInput}
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Stack>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={errorStatus}
          autoHideDuration={3000}
          onClose={() => {
            setErrorStatus(false);
          }}
        >
          <div>
            <AlertComponent
              AlertType={alertType}
              errorMessage={errorMessage}
              errorDetail={errorDetail}
            />
          </div>
        </Snackbar>
      </Stack>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 3,
          padding: "4vh",
        }}
      >
        <h2>You can use the below button to add rental car.</h2>
        <Autocomplete
              disablePortal
              options={carBrands}
              sx={{
                width: "25vh",
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
                <TextField {...params} label="Car Brand" />
              )}
              onInputChange={(event, newInputValue) => {
                setCarBrand(newInputValue);
              }}
            />
            <Input
              placeholder="Car Model"
              value={carModel}
              onChange={(e) => setCarModel(e.target.value)}
            />{" "}
        {/* Controlled input for car model */}
        <Input
          placeholder="Daily Price"
          value={dailyPrice}
          onChange={(e) => setDailyPrice(e.target.value)}
        />{" "}
        {/* Controlled input for daily price */}
        <Autocomplete
              disablePortal
              options={["Automatic", "Manual"]}
              sx={{
                width: "25vh",
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
                <TextField {...params} label="Gear Type" />
              )}
              onInputChange={(event, newInputValue) => {
                setGearType(newInputValue);
              }}
            />
        {/* Controlled input for gear type */}
        <Autocomplete
              disablePortal
              options={Places}
              sx={{
                width: "25vh",
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
                <TextField {...params} label="Location" />
              )}
              onInputChange={(event, newInputValue) => {
                setLocation(newInputValue);
              }}
            />
        {/* Controlled input for location */}
        <Autocomplete
              disablePortal
              options={[2, 4, 5]}
              sx={{
                width: "25vh",
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
                setSeatAmount(newInputValue);
              }}
            />
        {/* Controlled input for seat amount */}
        <Input
          placeholder="Car Image Link"
          value={carImageRef}
          onChange={(e) => setCarImageRef(e.target.value)}
        />{" "}
        {/* Controlled input for car Image */}
        <Input
          placeholder="Car Plate"
          value={carPlate}
          onChange={(e) => setCarPlate(e.target.value)}
        />{" "}
        {/* Controlled input for car plate */}
        <Button
          onClick={() => {
            if (
              carModel != "" &&
              dailyPrice != "" &&
              gearType != "" &&
              location != "" &&
              seatAmount != "" &&
              carImageRef != "" &&
              carPlate != ""
            ) {
              setOpen(true);
            } else {
              setAlertType("warning");
              setErrorDetail("warning-message");
              setErrorMessage("You have to fill all the inputs.");
              setErrorStatus(true);
            }
          }}
          variant="contained"
        >
          Insert from input
        </Button>
      </Card>
    </div>
  );
}

export default AdminPanelCreateCar;
