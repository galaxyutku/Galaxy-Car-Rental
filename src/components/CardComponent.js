import React from "react";
import "../styles.css";
import {
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

function CardComponent({
  carModel,
  pickupPlace,
  seatAmount,
  gearType,
  dailyPrice,
  pickupDate,
  dropoffDate,
  carImageRef,
  choosedPickupPlace,
  carHashID,
}) {
  const navigate = useNavigate();
  return (
    <div>
      <Card
        onClick={() => {
          navigate("/details", {
            state: {
              pickupPlace: { pickupPlace },
              pickupDate: { pickupDate },
              dropoffDate: { dropoffDate },
              carModel: { carModel },
              seatAmount: { seatAmount },
              gearType: { gearType },
              dailyPrice: { dailyPrice },
              carImageRef: { carImageRef },
              choosedPickupPlace: { choosedPickupPlace },
              carHashID: { carHashID },
              carImageRef: { carImageRef },
            },
          });
        }}
        sx={{
          display: "flex",
          flexWrap: "row",
          justifyContent: "left",
          width: "120vh",
          height: "22vh",
          border: "1px gray solid",
          "&:hover": {
            boxShadow: "3px 3px gray",
            borderColor: "neutral.outlinedHoverBorder",
            cursor: "pointer",
            opacity: "0.93",
          },
        }}
      >
        <CardMedia
          component="img"
          image={carImageRef}
          alt="Car Image"
          sx={{ maxWidth: "40vh", objectFit: "cover" }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height:"100%",
            fontSize: "1vw",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <CardContent
              sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap:"wrap",
              width:"100%",
              height: "100%",
              justifyContent: "center",
              alignItems:"center",
              gap: 2,
            }}
          >
              <span style={{fontWeight:"bold"}}>Car: </span>{carModel}
              <PersonIcon />
              <span>{seatAmount} Seat</span>
              <DirectionsCarIcon />
              <span>{gearType}</span>
          </CardContent>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span style={{fontWeight:"bold"}}>Location:</span>
            <span>{pickupPlace}</span>
          </CardContent>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span style={{fontWeight:"bold"}}>Daily Price:</span>
            <span>{dailyPrice} $</span>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}

export default CardComponent;
