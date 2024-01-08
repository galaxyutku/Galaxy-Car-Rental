import React, { useEffect, useState } from "react";
import "../styles.css";
import { Colors } from "../Colors";
import {
  Grid,
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
  Divider,
  Snackbar,
  Stack,
} from "@mui/material";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import DoneOutlineOutlinedIcon from "@mui/icons-material/DoneOutlineOutlined";
import SouthOutlinedIcon from "@mui/icons-material/SouthOutlined";
import { useLocation, useNavigate } from "react-router";
import { db, auth } from "../utils/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function DetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [errorStatus, setErrorStatus] = useState(false); // Changed initial state to false
  const [errorMessage, setErrorMessage] = useState("");
  const [alertType, setAlertType] = useState("error");
  const [day1, month1, year1] = location.state.pickupDate.pickupDate
    .split("/")
    .map(Number);
  const [day2, month2, year2] = location.state.dropoffDate.dropoffDate
    .split("/")
    .map(Number);

  const date1 = new Date(year1, month1 - 1, day1);
  const date2 = new Date(year2, month2 - 1, day2);

  // Calculate the difference in milliseconds
  const differenceInTime = date2.getTime() - date1.getTime();

  // Convert the difference from milliseconds to days
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

  const calculateDays = Math.abs(differenceInDays); // Absolute value of the difference in days

  const [user, setUser] = useState(auth.currentUser);
  const rentCollectionRef = collection(db, "rent-status");

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const handleBooking = async () => {
    console.log(user);
    if (user != null) {
      try {
        const rent = await addDoc(rentCollectionRef, {
          carHash: location.state.carHashID.carHashID,
          relatedUser: user.uid,
          rentBetween:
            location.state.pickupDate.pickupDate +
            "-" +
            location.state.dropoffDate.dropoffDate,
          pricePaid: calculateDays * location.state.dailyPrice.dailyPrice + 30,
        });
        setErrorMessage("Booking success! Redirecting...");
        setAlertType("success");
        setErrorStatus(true); // Set errorStatus to true to trigger Snackbar display
        console.log(rent);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="detailsPage">
      <Stack>
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={errorStatus}
            autoHideDuration={1500}
            onClose={() => {
              setErrorStatus(false);
              navigate("/profile");
            }}
          >
            <Alert severity={alertType} sx={{ width: "100%" }}>
              {errorMessage}
            </Alert>
          </Snackbar>
        </Stack>
      <div className="detailsContainer">
        <div className="leftItems">
          <div className="leftUpItems">
            <Grid>
              <Card className="carCard">
                <CardContent className="carDetails">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{ fontWeight: "bold", fontSize: "140%" }}
                      className="carName"
                    >
                      {location.state.carModel.carModel.split(" ")[0]}
                      <Divider />
                    </Typography>
                    <img
                      src={location.state.carImageRef.carImageRef}
                      className="carPicture"
                    ></img>
                  </div>
                  <div className="carFeatures">
                    <div className="upFeatures">
                      <Typography
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                      >
                        <DirectionsCarFilledOutlinedIcon fontSize="large" />
                        <span className="carFeaturesName">Car Model:</span>{" "}
                        {location.state.carModel.carModel}
                      </Typography>
                      <Typography
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "left",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                      >
                        <Person2OutlinedIcon fontSize="large" />
                        <span className="carFeaturesName">Seats:</span>{" "}
                        {location.state.seatAmount.seatAmount}
                      </Typography>
                      <Typography
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "left",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                      >
                        <SettingsOutlinedIcon fontSize="large" />
                        <span className="carFeaturesName">Gear Type:</span>{" "}
                        {location.state.gearType.gearType}
                      </Typography>
                    </div>
                    <div className="downFeatures">
                      <Typography
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "left",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                      >
                        <PaidOutlinedIcon fontSize="large" />
                        <span className="carFeaturesName">
                          Daily Price:
                        </span>{" "}
                        {location.state.dailyPrice.dailyPrice} $
                      </Typography>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </div>
          <div className="leftMiddleItems">
            <Grid>
              <Card className="extraDetails">
                <CardContent>
                  <Typography
                    className="extraDetailsHeader"
                    sx={{ fontWeight: "bold" }}
                  >
                    Great Choice
                  </Typography>
                  <div className="upExtra">
                    <ul className="listExtraContainer">
                      <li>
                        <DoneOutlineOutlinedIcon color="success" />
                        Most popular fuel condition
                      </li>
                      <li>
                        <DoneOutlineOutlinedIcon color="success" />
                        Easy to find pickup point
                      </li>
                      <li>
                        <DoneOutlineOutlinedIcon color="success" />
                        Free cancellation
                      </li>
                      <li>
                        <DoneOutlineOutlinedIcon color="success" />
                        Helpful staff at the pick-up point
                      </li>
                    </ul>
                    <img
                      src={require("../assets/good_choice.png")}
                      className="extrasPicture"
                    ></img>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </div>
          <div className="leftDownItems">
            <Grid>
              <Card className="extraDetails">
                <CardContent>
                  <Typography
                    className="extraDetailsHeader"
                    sx={{ fontWeight: "bold" }}
                  >
                    Included In The Price
                  </Typography>
                  <div className="downExtra">
                    <ul className="listExtraContainer">
                      <li>
                        <DoneOutlineOutlinedIcon color="success" />
                        Free cancellation up to 48 hours before hotel pick-up
                      </li>
                      <li>
                        <DoneOutlineOutlinedIcon color="success" />0 $ excess
                        Damage Liability Assurance
                      </li>
                      <li>
                        <DoneOutlineOutlinedIcon color="success" />0 $ excess
                        Theft Protection
                      </li>
                      <li>
                        <DoneOutlineOutlinedIcon color="success" />
                        1,500 kilometers per rental
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </div>
        </div>

        <div className="rightItems">
          <div className="rightUpItems">
            <Grid>
              <Card className="pickupInformationContainer">
                <CardContent className="pickupReturn">
                  <Typography sx={{ fontWeight: "bold", fontSize: "140%" }}>
                    Pick-up and Return Information
                    <Divider sx={{ marginTop: "10px", marginBottom: "10px" }} />
                  </Typography>
                  <div className="pickupInformation">
                    <Typography>
                      <span className="pickupHeader">Pick-up Date:</span>{" "}
                      {location.state.pickupDate.pickupDate}
                    </Typography>
                    <Typography>
                      <span className="pickupHeader">Pick-up Location:</span>{" "}
                      {location.state.pickupPlace.pickupPlace}
                    </Typography>
                  </div>
                  <div className="arrow">
                    <SouthOutlinedIcon sx={{ fontSize: 40 }} />
                  </div>
                  <div className="returnInformation">
                    <Typography>
                      <span className="pickupHeader">Return Date:</span>{" "}
                      {location.state.dropoffDate.dropoffDate}
                    </Typography>
                    <Typography>
                      <span className="pickupHeader">Return Location:</span>{" "}
                      {location.state.pickupPlace.pickupPlace}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </div>
          <div className="rightMiddleItems">
            <Grid>
              <Card className="paymentContainer">
                <CardContent className="paymentItems">
                  <div className="paymentHeader">
                    <Typography sx={{ fontWeight: "bold", fontSize: "140%" }}>
                      Car Price Details
                      <Divider
                        sx={{ marginTop: "10px", marginBottom: "10px" }}
                      />
                    </Typography>
                  </div>
                  <Typography
                    className="rentPayment"
                    sx={{ fontWeight: "bold" }}
                  >
                    <span>Car rental fee:</span> 30 $
                  </Typography>
                  <Typography
                    className="rentPayment"
                    sx={{ fontWeight: "bold" }}
                  >
                    <span>{calculateDays} day price:</span>{" "}
                    {calculateDays * location.state.dailyPrice.dailyPrice} $
                  </Typography>
                  <Divider sx={{ marginTop: "10px", marginBottom: "10px" }} />
                  <Typography
                    className="rentPayment"
                    sx={{ fontWeight: "bold" }}
                  >
                    <span>Total price: </span>{" "}
                    {calculateDays * location.state.dailyPrice.dailyPrice + 30}{" "}
                    $
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </div>
          <div className="bookButton">
            {auth.currentUser ? <Button
              variant="contained"
              sx={{
                backgroundColor: "#ffa42c",
                color: "black",
                ":hover": {
                  bgcolor: "#ffa42c",
                  color: "white",
                  transition:
                    "background-color 0.4s ease-in-out, color 0.4s ease-in-out",
                },
                width: "50%",
              }}
              onClick={handleBooking}
              className="bookButton"
            >
              BOOK NOW
            </Button>
            :
            null}
          </div>
          <div className="rightDownItems"></div>
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
