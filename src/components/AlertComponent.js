import React, { useState, useEffect } from "react";
import "../styles.css";
import MuiAlert from '@mui/material/Alert';
import { authErrors } from "../const/authErrors"; // Update the path accordingly

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AlertComponent({ AlertType, errorMessage, errorDetail }) {
  const [message, setMessage] = useState('');
  useEffect(() => {
    if(errorDetail == "auth-error"){
      const errorCode = errorMessage.match(/auth\/([^)]+)/)[1]; // Extract the error code from the errorMessage

      // Find the corresponding message from authErrors object
      const foundError = authErrors[errorCode];

      // Set the message based on whether the error was found or not
      setMessage(foundError || "Unknown error occurred");
    }
    else{
      setMessage(errorMessage);
    }
  },[errorMessage]);

  return (
    <div>
      <Alert severity={AlertType} sx={{ width: '100%', }}>
        {message}
      </Alert>
    </div>
  );
}

export default AlertComponent;
