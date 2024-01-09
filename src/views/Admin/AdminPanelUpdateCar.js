import React, { useEffect, useState } from "react";
import "../../styles.css";
import "../../const/Colors";
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
  Snackbar,
  Stack,
} from "@mui/material";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import { carColumns, editableCarColumns } from "../../const/DataListColumns";
import { db } from "../../utils/firebaseConfig";
import { doc, collection, getDocs, updateDoc  } from "firebase/firestore";
import { auth } from "../../utils/firebaseConfig";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import AlertComponent from "../../components/AlertComponent";
import UpgradeIcon from '@mui/icons-material/Upgrade';

function AdminPanelUpdateCar() {
  const apiRef = useGridApiRef();
  const [open, setOpen] = useState(false);
  const [carData, setCarData] = useState();
  const [rentData, setRentData] = useState();
  const [errorStatus, setErrorStatus] = useState(false); // Changed initial state to false
  const [errorMessage, setErrorMessage] = useState("");
  const [alertType, setAlertType] = useState("error");
  const [errorDetail, setErrorDetail] = useState("");

  const carCollectionRef = collection(db, "car-data");

  useEffect(() => {
    const getCarData = async () => {
      const data = await getDocs(carCollectionRef);
      setCarData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getCarData();
  }, []);
  
  const rows =
  carData 
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

  const updateCar = async (newValue) => {
    try {
      await updateDoc(doc(db, "car-data", newValue.carHash), {
        carModel: newValue.carModel,
        carPlate: newValue.carPlate,
        dailyPrice: newValue.dailyPrice,
        gearType: newValue.gearType,
        location: newValue.location,
        seatAmount: newValue.seatAmount,
        carImageRef: newValue.carImageRef,
      });
      window.location.reload(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleUpdateCar = async () => {
    const selectedRows = apiRef.current.getSelectedRows();
    console.log(apiRef.current.getRowWithUpdatedValues());
    const iterSet = new Set(selectedRows.entries()).values();
    const iterArray = Array.from(iterSet);
    if(iterArray.length == 0)
     {
      setAlertType("warning");
      setErrorDetail("warning-message");
      setErrorMessage("You have to select only one element.");
      setErrorStatus(true);
    } else {
      iterArray.map((item) => {
        updateCar(apiRef.current.getRowWithUpdatedValues(item[1].id));
      })
    }
  };

  const checkIfDataSelected = () => {
    console.log(apiRef.current.getRowWithUpdatedValues());
    const selectedRows = apiRef.current.getSelectedRows();
    const iterSet = new Set(selectedRows.entries()).values();
    const iterArray = Array.from(iterSet);
    if(iterArray.length == 0){
      return false;
    }
    else{
      return true;
    }
  }

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
      {/* <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Car Update Confirm"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to update car?
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
            onClick={handleUpdateCar}
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog> */}
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
      <h3>Car Details</h3>
      <div style={{ width: "fit-content", height: "fit-content" }}>
        {carData && (
          <>
            <Divider />
            <DataGrid
              rows={rows}
              columns={editableCarColumns}
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
        startIcon={<UpgradeIcon />}
        // onClick={() => {
        //   if(checkIfDataSelected()){
        //     setOpen(true);
        //   }
        //   else{
        //     setErrorDetail("warning-message");
        //     setErrorMessage("You have to select something to interact!");
        //     setAlertType("warning");
        //     setErrorStatus(true);
        //   }
        // }}
        onClick={() => {
          if(checkIfDataSelected()){
            handleUpdateCar();
          }
          else{
            setErrorDetail("warning-message");
            setErrorMessage("You have to select something to interact!");
            setAlertType("warning");
            setErrorStatus(true);
          }
        }}
      >
        UPDATE CAR
      </Button>
    </div>
  );
}

export default AdminPanelUpdateCar;
