import React, { useEffect, useState } from "react";
import "../styles.css";
import {useNavigate} from "react-router-dom";
import { Colors } from "../Colors";
import { Box, Button, Paper, Snackbar, TextField, Typography } from "@mui/material";
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import {auth} from "../utils/firebaseConfig";
import AlertComponent from "../components/AlertComponent";

function SignupPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState({});
  const [errorStatus, setErrorStatus] = useState(false); // Changed initial state to false
  const [errorMessage, setErrorMessage] = useState("");
  const [alertType, setAlertType] = useState("error");

  useEffect(()=>{
      onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
    })
  },[])

  const handleSignup = async () => {
    try{
      const user = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
      );
      console.log(user);
      navigate('/');
    }
    catch(error){
      setErrorMessage(error.message);
      setAlertType("error");
      setErrorStatus(true); // Set errorStatus to true to trigger Snackbar display
    }
  };
  
  return (
    <div style={{ display: 'flex', alignItems:"center", justifyContent:"center", height: '100%' }}>
      <Snackbar anchorOrigin={{ vertical:"top", horizontal:"center" }} open={errorStatus} autoHideDuration={6000} onClose={() => {setErrorStatus(false)}}>
        <div>
          <AlertComponent AlertType={alertType} errorMessage={errorMessage} />
        </div>
      </Snackbar>
      <Paper elevation={3} style={{ padding: '20px', minWidth: '300px', maxWidth: '400px' }}>
        <Typography variant="h5" align="center" gutterBottom>
          Sign Up
        </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <TextField
              type="email"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              type="password"
              label="Password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleSignup}>
              Sign Up
            </Button>
          </Box>
      </Paper>
    </div>
  );
}

export default SignupPage;