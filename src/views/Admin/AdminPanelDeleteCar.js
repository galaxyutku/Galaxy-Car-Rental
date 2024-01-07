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
import { carColumns } from "../../const/DataListColumns";
import { db } from "../../utils/firebaseConfig";
import { doc, collection, getDocs, deleteDoc } from "firebase/firestore";
import { auth } from "../../utils/firebaseConfig";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

function AdminPanelDeleteCar() {
  const apiRef = useGridApiRef();
  const [open, setOpen] = useState(false);
  const [carData, setCarData] = useState();
  const [rentData, setRentData] = useState();

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

  const rows =
    carData && rentData
      ? carData.map((carItem, index) => {
          return {
            carHash: carItem.id,
            id: index + 1,
            carModel: carItem.carModel,
            carPlate: carItem.carPlate,
            dailyPrice: carItem.dailyPrice,
            gearType: carItem.gearType,
            location: carItem.location,
            seatAmount: carItem.seatAmount,
            carImageRef: carItem.carImageRef,
          };
        })
      : [];


    const deleteCar = async (id) => {
      try {
        await deleteDoc(doc(db, "car-data", id));
        window.location.reload(false);
      } catch (error) {
        console.log(error.message);
      }
    };
  
    const handleCarDeletion = () => {
      const selectedRows = apiRef.current.getSelectedRows();
      const iterSet = new Set(selectedRows.entries()).values();
      for (const v of iterSet) {
        deleteCar(v[1].carHash);
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
          {"Car Delete Confirmation"}
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
          <Button
            variant="contained"
            color="success"
            onClick={handleCarDeletion}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <h3>Car Details</h3>
      <div style={{ width: "fit-content", height: "fit-content" }}>
        {rentData && carData && (
          <>
            <Divider />
            <DataGrid
              rows={rows}
              columns={carColumns}
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
        DELETE CARS
      </Button>
    </div>
  );
}

export default AdminPanelDeleteCar;
