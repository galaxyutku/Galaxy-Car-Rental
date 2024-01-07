import React, { useEffect, useState } from "react";
import "../styles.css";
import {
  Autocomplete,
  Button,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { Places } from "../const/Places";
import AlertComponent from "../components/AlertComponent";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function HomePage() {
  const navigate = useNavigate();
  const [pickupPlace, setPickupPlace] = useState("");
  const [pickupDate, setPickupDate] = useState(null);
  const [dropoffDate, setDropoffDate] = useState(null);
  const [errorStatus, setErrorStatus] = useState(false); // Changed initial state to false
  const [errorMessage, setErrorMessage] = useState("");
  const [alertType, setAlertType] = useState("error");
  const [errorDetail, setErrorDetail] = useState("");

  const currentDate = new Date();

  const searchHandle = () => {
    // console.log(Number(String(pickupDate).split(" ")[1]) + 1);
    // console.log(Number(String(dropoffDate).split(" ")[1]) + 1);
    // Check if pickupDate and dropoffDate is filled
    if (pickupDate === null || dropoffDate === null) {
      setErrorMessage("You have to select pick-up date and drop-off date.");
      setAlertType("warning");
      setErrorStatus(true);
      setErrorDetail("warning-error");
    }
    // Check if pickupDate and dropoffDate are on the same day
    else if (String(pickupDate) == String(dropoffDate)) {
      setErrorMessage("You can not select same day.");
      setAlertType("warning");
      setErrorStatus(true);
      setErrorDetail("warning-error");
    }
    // Check if pickupDate or dropoffDate is the current date
    else if (
      Number(String(pickupDate).split(" ")[1]) + 1 <=
        Number(String(currentDate).split(" ")[2]) ||
      Number(String(dropoffDate).split(" ")[1]) + 1 <=
        Number(String(currentDate).split(" ")[2])
    ) {
      setErrorMessage("You can not select current day or past days.");
      setAlertType("warning");
      setErrorStatus(true);
      setErrorDetail("warning-error");
    }
    // Check if pickup date is before of dropoffdate
    else if (
      Number(String(pickupDate).split(" ")[1]) + 1 >
      Number(String(dropoffDate).split(" ")[1]) + 1
    ) {
      setErrorMessage("Pickup Date can not be before Drop-off Date.");
      setAlertType("warning");
      setErrorStatus(true);
      setErrorDetail("warning-error");
    }
    // If none of the above conditions are met, navigate to "/results"
    else {
      navigate("/results", {
        state: {
          pickupPlace: { pickupPlace },
          pickupDate: { pickupDate },
          dropoffDate: { dropoffDate },
        },
      });
    }
  };

  return (
    <div className="homepage">
      {errorStatus ? (
        <Stack>
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={errorStatus}
            autoHideDuration={4500}
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
      ) : null}
      <div className="searchContainer">
        <div
          style={{
            width: "auto",
            borderRadius: "15px",
            padding: "10px",
            height: "110px",
            backgroundColor: "orange",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginRight: "30px",
            }}
          >
            <span style={{ marginBottom: 10 }}>Find a pickup place</span>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={Places}
              sx={{
                width: 600,
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
              renderInput={(params) => <TextField {...params} label="Places" />}
              onInputChange={(event, newInputValue) => {
                setPickupPlace(newInputValue);
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginRight: "30px",
            }}
          >
            <span style={{ marginBottom: 10 }}>Select a pickup date</span>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{
                  width: 300,
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
                label="Pickup Date"
                onChange={(newValue) => {
                  setPickupDate(newValue);
                }}
              />
            </LocalizationProvider>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginRight: "30px",
            }}
          >
            <span style={{ marginBottom: "10px" }}>Select a drop off date</span>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{
                  width: 300,
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
                label="Drop off Date"
                onChange={(newValue) => {
                  setDropoffDate(newValue);
                }}
              />
            </LocalizationProvider>
          </div>
          <Button
            onClick={searchHandle}
            style={{
              backgroundColor: "white",
              width: "120px",
              height: "70px",
              color: "black",
              marginTop: "15px",
            }}
          >
            Search
          </Button>
        </div>
      </div>
      <div className="featuresContainer">
        <div className="feature">
          <img src="./re1.PNG" alt="Flexible Rentals Icon" />
          <h3>Flexible rentals</h3>
          <p>
            Choose from our exclusive <br></br>collection of vehicles and enjoy
            <br></br>flexibility and peace of mind with<br></br> up to 48 hours
            of free cancellation.<br></br> We offer the best options for you!
          </p>
        </div>
        <div className="feature">
          <img src="/re2.png" alt="No Hidden Fees Icon" />
          <h3>No hidden fees</h3>
          <p>
            Transparency is our principle.<br></br> All the costs of car hire
            are presented clearly <br></br>and concisely, so you can make your
            choice<br></br> with complete confidence. There are no
            <br></br>
            surprises with us, only excellent experiences!
          </p>
        </div>
        <div className="feature">
          <img src="/re3.png" alt="Price Match Guarantee Icon" />
          <h3>Price Match Guarantee</h3>
          <p>
            With our unique Price Match Guarantee, if you <br></br>find a lower
            price elsewhere, we will match it.<br></br> Make sure you get the
            best deal - luxury <br></br>and quality have never been so
            accessible.
          </p>
        </div>
      </div>
      <div className="headerSearchContainer">
        <div className="headerTitles">
          <h1>Car Rental – Search, Compare & Save</h1>
          <div className="headerSubtitles">
            <span>✓ Free cancellations on most bookings</span>
            <span>✓ 81 City Of Turkey</span>
            <span>✓ Customer support</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
