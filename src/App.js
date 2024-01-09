import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import HomePage from './views/HomePage';
import NavigationBar from './components/NavigationBar';
import ResultPage from './views/ResultPage';
import './styles.css';
import DetailsPage from './views/DetailsPage';
import LoginPage from './views/LoginPage';
import SignupPage from './views/SignupPage';
import FAQPage from './views/FAQPage';
import PrivateRoute from './components/PrivateRoute';
import ForbiddenPage from './views/ForbiddenPage';
import ProfilePage from './views/ProfilePage';
import AdminPanelCreateCar from './views/Admin/AdminPanelCreateCar';
import AdminPanel from './views/Admin/AdminPanel';
import AdminPanelDeleteCar from './views/Admin/AdminPanelDeleteCar';
import AdminPanelUpdateCar from './views/Admin/AdminPanelUpdateCar';
import AdminPanelBookingManagement from './views/Admin/AdminPanelBookingManagement';
import AdminPanelUserManagement from './views/Admin/AdminPanelUserManagement';

function App() {
  return (
    <div className="mainStyling">
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/results" element={<ResultPage />} />
          <Route path="/details" element={<DetailsPage />} />
          <Route path="/FAQPage" element={<FAQPage />} />
          <Route path="/forbidden" element={<ForbiddenPage />} />
        </Routes>
        <PrivateRoute path="/profile" element={<ProfilePage />} />
        <PrivateRoute path="/login" element={<LoginPage />} />
        <PrivateRoute path="/signup" element={<SignupPage />} />
        <PrivateRoute path="/adminpanel/createcar" element={<AdminPanelCreateCar />}/>
        <PrivateRoute path="/adminpanel/deletecar" element={<AdminPanelDeleteCar />}/>
        <PrivateRoute path="/adminpanel/updatecar" element={<AdminPanelUpdateCar />}/>
        <PrivateRoute path="/adminpanel/usermanagement" element={<AdminPanelUserManagement />}/>
        <PrivateRoute path="/adminpanel/bookingmanagement" element={<AdminPanelBookingManagement />}/>
        <PrivateRoute path="/adminpanel" element={<AdminPanel />}/>
      </Router>
    </div>
  );
}

export default App;
