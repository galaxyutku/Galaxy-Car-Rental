import React, { useState } from "react";
import "../../styles.css";
import { useNavigate } from "react-router-dom";
import "../../Colors";
import { Button, Card } from "@mui/material";

function AdminPanelUpdateCar() {
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
            Update Car
      </Card>
    </div>
  );
}

export default AdminPanelUpdateCar;
