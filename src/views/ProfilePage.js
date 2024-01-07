import React, { useEffect, useState } from "react";
import "../styles.css";
import "../Colors";
import {
  Button,
  Card,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
} from "@mui/material";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import { bookingColumns } from "../const/DataListColumns";
import { db } from "../utils/firebaseConfig";
import { doc, collection, getDocs, deleteDoc } from "firebase/firestore";
import { auth } from "../utils/firebaseConfig";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const apiRef = useGridApiRef();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false); // Changed initial state to false
  const [errorMessage, setErrorMessage] = useState("");
  const [alertType, setAlertType] = useState("error");
  const [errorDetail, setErrorDetail] = useState("");

  const [carData, setCarData] = useState(null);
  const [rentData, setRentData] = useState(null);
  const [userData, setUserData] = useState(null);

  const [currentUserData, setCurrentUserData] = useState(null);
  const [currentRentData, setCurrentRentData] = useState(null);

  const carCollectionRef = collection(db, "car-data");
  const rentCollectionRef = collection(db, "rent-status");
  const userCollectionRef = collection(db, "user-data");

  useEffect(() => {
    const getCarData = async () => {
      const data = await getDocs(carCollectionRef);
      setCarData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    const getBookingData = async () => {
      const data = await getDocs(rentCollectionRef);
      setRentData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    const getUserData = async () => {
      const data = await getDocs(userCollectionRef);
      setUserData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getCarData();
    getBookingData();
    getUserData();
  }, []);
  useEffect(() => {
    handleCurrentUserData();
  }, [userData]);

  const deleteUser = async (id) => {
    try {
      await deleteDoc(doc(db, "rent-status", id));
      window.location.reload(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleRentCancellation = () => {
    const selectedRows = apiRef.current.getSelectedRows();
    const iterSet = new Set(selectedRows.entries()).values();
    for (const v of iterSet) {
      deleteUser(v[1].rentHash);
    }
    setOpen(false);
  };

  // Handle the current user informations from database and find according rent data on database.
  const handleCurrentUserData = () => {
    if (rentData != null) {
      // Filter rentData array to find elements matching auth.currentUser.uid
      const filteredRentData = rentData.filter(
        (rentItem) => rentItem.relatedUser == auth.currentUser.uid
      );
      // Set the filtered rentData to currentRentData state
      setCurrentRentData(filteredRentData);
    }
    if (userData != null) {
      // Find the userData that matches auth.currentUser.uid
      const currentUser = userData.find(
        (userItem) => userItem.userID === auth.currentUser.uid
      );
      // Set the currentUserData state to the found user data
      setCurrentUserData(currentUser);
    }
  };
  
  const rows = currentRentData
  ? currentRentData.map((rentItem, index) => {
      const selectedCarData = carData.find(
        (carItem) => carItem.id === rentItem.carHash
      );
      return {
        rentHash: rentItem.id,
        id: index,
        firstName: currentUserData.userName, // Replace these fields with your actual rentData properties
        lastName: currentUserData.userSurname,
        userMail: currentUserData.userMail,
        pickupDate: String(rentItem.rentBetween).split("-")[0],
        dropoffDate: String(rentItem.rentBetween).split("-")[1],
        location: selectedCarData ? selectedCarData.location : '', // Check if selectedCarData is not null
        pricePaid: rentItem.pricePaid,
        carModel: selectedCarData ? selectedCarData.carModel : '', // Check if selectedCarData is not null
        gearType: selectedCarData ? selectedCarData.gearType : '', // Check if selectedCarData is not null
        seatAmount: selectedCarData ? selectedCarData.seatAmount : '', // Check if selectedCarData is not null
        carPlate: selectedCarData ? selectedCarData.carPlate : '', // Check if selectedCarData is not null
      };
    })
  : [];

  return (
    <div
      style={{
        marginTop: "4vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
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
          {"Booking Cancel Confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to cancel your car renting booking.
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
            Disagree
          </Button>
            <Button variant="contained" color="success" onClick={handleRentCancellation} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <div style={{width:"fit-content", height:"fit-content", maxHeight:"80%"}}>
        {currentUserData && carData && userData && ( // Check if currentUserData is not null
          <>
            <CardHeader
              title={`Bookings Details of ${
                currentUserData.userName + " " + currentUserData.userSurname
              }`}
            />
            <Divider />
            <DataGrid
              rows={rows}
              columns={bookingColumns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              apiRef={apiRef}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </>
        )}
        </div>
      <Button
        variant="contained"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={() => {
          setOpen(true);
        }}
      >
        CANCEL RENT
      </Button>
    </div>
  );
}

export default ProfilePage;
