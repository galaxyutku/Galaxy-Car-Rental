import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Snackbar, Box, Button, Paper, TextField, Typography } from "@mui/material";
import { auth } from "../utils/firebaseConfig";
import AlertComponent from "../components/AlertComponent";


function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorStatus, setErrorStatus] = useState(false); // Changed initial state to false
  const [errorMessage, setErrorMessage] = useState("");
  const [alertType, setAlertType] = useState("error");

  const handleLogin = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      console.log(user);
      navigate('/');
    } catch (error) {
      setErrorMessage(error.message);
      setAlertType("error");
      setErrorStatus(true); // Set errorStatus to true to trigger Snackbar display
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Snackbar anchorOrigin={{ vertical:"top", horizontal:"center" }} open={errorStatus} autoHideDuration={6000} onClose={() => {setErrorStatus(false)}}>
        <div>
          <AlertComponent AlertType={alertType} errorMessage={errorMessage} />
        </div>
      </Snackbar>
      <Paper elevation={3} style={{ padding: '20px', minWidth: '300px', maxWidth: '400px' }}>
        <Typography variant="h5" align="center" gutterBottom>
          Login
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
          <Button onClick={handleLogin} variant="contained" color="primary">
            Login
          </Button>
        </Box>
      </Paper>
    </div>
  );
}

export default LoginPage;
