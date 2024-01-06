import React from 'react';
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

function App() {
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
          {
            (auth.currentUser.email != "admin@gmail.com")
            ?
            (
              null
            )
            :
            (
              <Route path="/adminpanel" element={<AdminPanel />} />
            )
          }
        </Routes>
      </Router>
    </div>
  );
}

export default App;
