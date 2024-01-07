import React, { useState } from "react";
import "../../styles.css";
import { useNavigate } from "react-router-dom";
import "../../Colors";
import { Button, Card } from "@mui/material";

function AdminPanel() {
  const navigate = useNavigate();
  return (
    <div style={{width:"100%", height:"100%", justifyContent:"center", alignItems:"center", display:"flex"}}>
      <Card sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 3,
          padding: "4vh",
        }}>
        <Button sx={{width:"100%", height:"100%"}} color="success" variant="contained" onClick={() => {navigate("/adminpanel/createcar")}}>Create Car</Button>
        <Button sx={{width:"100%", height:"100%"}} color="error" variant="contained" onClick={() => {navigate("/adminpanel/deletecar")}}>Delete Car</Button>
        <Button sx={{width:"100%", height:"100%"}} color="warning" variant="contained" onClick={() => {navigate("/adminpanel/updatecar")}}>Update Car</Button>
        <Button sx={{width:"100%", height:"100%", backgroundColor:"blue"}} variant="contained" onClick={() => {navigate("/adminpanel/usermanagement")}}>Users</Button>
        <Button sx={{width:"100%", height:"100%", backgroundColor:"purple"}} variant="contained" onClick={() => {navigate("/adminpanel/bookingmanagement")}}>Booking Management</Button>
      </Card>
    </div>
  );
}

export default AdminPanel;
