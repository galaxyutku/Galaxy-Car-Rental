import React, { useEffect, useState } from "react";
import "../../styles.css";
import "../../Colors";
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
import { bookingColumns } from "../../const/DataListColumns";
import { doc, collection, getDocs, deleteDoc } from "firebase/firestore";
import { auth, db } from "../../utils/firebaseConfig";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

function AdminPanelBookingManagement() {
  const apiRef = useGridApiRef();
  const [open, setOpen] = useState(false);
  const [carData, setCarData] = useState(null);
  const [rentData, setRentData] = useState(null);
  const [userData, setUserData] = useState(null);

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

  const rows = rentData && userData && carData
  ? rentData.map((rentItem, index) => {
      const selectedCarData = carData.find(
        (carItem) => carItem.id === rentItem.carHash
      );
      const selectedUser = userData.find(
        (user) => user.userID === rentItem.relatedUser
      );
      return {
        rentHash: rentItem.id,
        id: index,
        firstName: selectedUser.userName, // Replace these fields with your actual rentData properties
        lastName: selectedUser.userSurname,
        userMail: selectedUser.userMail,
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


    const deleteBooking = async (id) => {
      try {
        await deleteDoc(doc(db, "rent-status", id));
        window.location.reload(false);
      } catch (error) {
        console.log(error.message);
      }
    };
  
    const handleBookingDeletion = () => {
      const selectedRows = apiRef.current.getSelectedRows();
      const iterSet = new Set(selectedRows.entries()).values();
      for (const v of iterSet) {
        deleteBooking(v[1].rentHash);
      }
      setOpen(false);
    };

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
            Are you sure you want to delete bookings.
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
          <Button
            variant="contained"
            color="success"
            onClick={handleBookingDeletion}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <h3>Booking Details</h3>
      <div style={{ width: "fit-content", height: "fit-content" }}>
        {rentData && carData && userData && (
          <>
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
        DELETE BOOKING
      </Button>
    </div>
  );
}

export default AdminPanelBookingManagement;
