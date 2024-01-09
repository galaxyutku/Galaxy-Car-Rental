import React, { useState, useEffect } from "react";
import "../styles.css";
import "../const/Colors";
import { auth } from "../utils/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { Route, Routes, useNavigate } from "react-router";

function PrivateRoute({ path, element }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const admincheck = onAuthStateChanged(auth, (currentUser) => {
      // Update user state based on authentication status
      setUser(currentUser);
    });
    return () => {
      admincheck();
    };
  }, [auth]);

  if (user !== null) {
    if (user?.email === "admin@gmail.com" && (String(path)).includes("/adminpanel")) {
      return (
        <Routes>
          <Route path={path} element={element} />
        </Routes>
      );
    }
    else if(user?.email != "" && path == "/profile") {
      return (
        <Routes>
          <Route path={path} element={element} />
        </Routes>
      );
    }
    else {
      return null;
    }
  } else {
    if (path == "/login") {
      return (
        <Routes>
          <Route path={path} element={element} />
        </Routes>
      );
    } else if (path == "/signup") {
      return (
        <Routes>
          <Route path={path} element={element} />
        </Routes>
      );
    }
  }
}

export default PrivateRoute;
