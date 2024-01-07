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
import { userColumns } from "../../const/DataListColumns";
import { db } from "../../utils/firebaseConfig";
import { doc, collection, getDocs, deleteDoc } from "firebase/firestore";
import { auth } from "../../utils/firebaseConfig";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

function AdminPanelUserManagement() {
  const apiRef = useGridApiRef();
  const [open, setOpen] = useState(false);
  const [rentData, setRentData] = useState();
  const [userData, setUserData] = useState(null);
  const userCollectionRef = collection(db, "user-data");
  const rentCollectionRef = collection(db, "rent-status");

  useEffect(() => {
    const getBookingData = async () => {
      const data = await getDocs(rentCollectionRef);
      setRentData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    const getUserData = async () => {
      const data = await getDocs(userCollectionRef);
      setUserData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getBookingData();
    getUserData();
  }, []);

  const rows =
    userData && rentData
      ? userData.map((user, index) => {
          return {
            userHash: user.userID,
            id: index + 1,
            userName: user.userName,
            userSurname: user.userSurname,
            userMail: user.userMail,
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
      <h3>User Details</h3>
      <div style={{ width: "fit-content", height: "fit-content" }}>
        {userData && rentData && (
          <>
            <Divider />
            <DataGrid
              rows={rows}
              columns={userColumns}
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
    </div>
  );
}

export default AdminPanelUserManagement;
