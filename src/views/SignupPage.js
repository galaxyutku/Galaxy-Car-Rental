import React, { useEffect, useState } from "react";
import "../styles.css";
import { useNavigate } from "react-router-dom";
import { Colors } from "../const/Colors";
import {
  Box,
  Button,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth, db } from "../utils/firebaseConfig";
import AlertComponent from "../components/AlertComponent";
import { collection, getDocs, addDoc } from "firebase/firestore";

function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});
  const [errorStatus, setErrorStatus] = useState(false); // Changed initial state to false
  const [errorMessage, setErrorMessage] = useState("");
  const [alertType, setAlertType] = useState("error");
  const [errorDetail, setErrorDetail] = useState("");

  const userCollectionRef = collection(db, "user-data");

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const handleSignup = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user);
      setUser(user);
      addUsersDB(user);
      setErrorMessage("Signup success! Redirecting...");
      setAlertType("success");
      setErrorDetail("success-message");
      setErrorStatus(true);
      navigate("/")
    } catch (error) {
      console.log(error.message);
      setErrorMessage(error.message);
      setAlertType("error");
      setErrorDetail("auth-error");
      setErrorStatus(true); // Set errorStatus to true to trigger Snackbar display
    }
  };

  const addUsersDB = async (currentUser) => {
    try {
      await addDoc(userCollectionRef, {
        userID: currentUser.user.uid,
        userName: name,
        userSurname: surname,
        userMail: email,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Stack>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={errorStatus}
          autoHideDuration={2400}
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
      <Paper
        elevation={3}
        style={{ padding: "20px", minWidth: "300px", maxWidth: "400px" }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Sign Up
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <TextField
            type="name"
            label="Name*"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            type="surname"
            label="Surname*"
            variant="outlined"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
          <TextField
            type="email"
            label="Email*"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            type="password"
            label="Password*"
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
