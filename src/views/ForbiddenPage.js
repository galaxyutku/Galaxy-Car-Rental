import React, { useState } from "react";
import "../styles.css";
import "../const/Colors";
import { Button, Card, CardHeader } from "@mui/material";
import { useNavigate } from "react-router";

function ForbiddenPage() {
  const navigate = useNavigate();
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
      <Card>
        <CardHeader
          title={
            "This is forbidden area for your user permissions. Please go homepage."
          }
        />
      </Card>
      <Button
        variant="contained"
        onClick={() => {
          navigate("/");
        }}
      >
        Go Home
      </Button>
    </div>
  );
}

export default ForbiddenPage;
