import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles.css";
import { Colors } from "../Colors";
import Button from '@mui/material/Button';
import { signOut, onAuthStateChanged } from "firebase/auth";
import {auth} from "../utils/firebaseConfig";

function NavigationBar() {
    const [user, setUser] = useState(null);
    const logout = async () => {
        console.log(auth.currentUser);
        await signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            // Update user state based on authentication status
            setUser(currentUser);
        });

        return () => {
            unsubscribe();
        };
    }, [auth]);

    const handleSignOut = async () => {
        await signOut(auth)
            .then(() => {
                // Sign-out successful.
                setUser(null);
            })
            .catch((error) => {
                // Handle errors here
                console.error("Error signing out: ", error);
            });
    };
    return (
        <div className="navbarStyling">
            <Link to="/" className="logoStyling">GalaxyRental</Link>
            <div style={{ display: "flex", justifyContent: "right", width: "100%", marginRight: 30 }}>
                {(auth.currentUser != null) ? ( // If user is authenticated, show sign-out button
                    (auth.currentUser.email != "admin@gmail.com")
                    ?
                    (
                        <Button onClick={handleSignOut} variant="text" style={{ color: "white" }}>
                            SIGN OUT
                        </Button>
                    )
                    :
                    (
                    <>
                        <Button variant="text" style={{ color: "white", marginRight: 20 }}>
                            <Link to="/adminpanel" style={{ textDecoration: 'none', color: 'inherit' }}>ADMIN PANEL</Link>
                        </Button>
                        <Button onClick={handleSignOut} variant="text" style={{ color: "white" }}>
                            SIGN OUT
                        </Button>
                    </>
                    )
                ) : ( // If user is not authenticated, show login and signup buttons
                    <>
                        <Button variant="text" style={{ color: "white", marginRight: 20 }}>
                            <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>LOGIN</Link>
                        </Button>
                        <Button variant="text" style={{ color: "white" }}>
                            <Link to="/signup" style={{ textDecoration: 'none', color: 'inherit' }}>SIGNUP</Link>
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
}

export default NavigationBar;
