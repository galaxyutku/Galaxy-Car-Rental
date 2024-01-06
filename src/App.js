import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import HomePage from './views/HomePage';
import Template from './views/Template';
import NavigationBar from './components/NavigationBar';
import ResultPage from './views/ResultPage';
import './styles.css';
import DetailsPage from './views/DetailsPage';
import LoginPage from './views/LoginPage';
import SignupPage from './views/SignupPage';
import AdminPanel from './views/AdminPanel';
import {auth} from "./utils/firebaseConfig";
import {onAuthStateChanged } from "firebase/auth";

import FAQPage from './views/FAQPage';

function App() {
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

  return (
    <div className="mainStyling">
      <Router>
      <NavigationBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/results" element={<ResultPage />} />
          <Route path="/details" element={<DetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/template" element={<Template />} />
          <Route path="/FAQPage" element={<FAQPage />} />
          {
            (user != null) ? (
              (user?.email == "admin@gmail.com")
              ?
              (
                <Route path="/adminpanel" element={<AdminPanel />} />
              )
              :
              (
                null
              )
            )
            :
            null
          }
        </Routes>
      </Router>
    </div>
  );
}

export default App;
