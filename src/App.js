import "./styles/App.css";
import "./styles/index.css";
import React, {useState, useEffect} from 'react';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles'; 
import HomePage from "./pages/Website/Home/Home";
import theme from "./styles/theme"
import AppHeader from "./components/reusable/HeaderWebsite";
import Login from './pages/Website/Auth/Login';
import InitialPreferences from "./pages/mainpage/scenes/firstLogin/initial-preferences";
import Dashboard from './pages/mainpage/scenes/dashboard/index';
import FAQ from './pages/mainpage/scenes/faq/index';
import ViewProfile from './pages/mainpage/scenes/profileCard/viewProfile';
import EditProfile from "./pages/mainpage/scenes/profileCard/editProfile";
import CountryIndex from "./pages/mainpage/scenes/climbingPlaces/countries/countriesIndex";
import RegionsIndex from "./pages/mainpage/scenes/climbingPlaces/regions/regionsIndex";
import AreasIndex from "./pages/mainpage/scenes/climbingPlaces/areas/areasIndex";
import RoutesIndex from "./pages/mainpage/scenes/climbingPlaces/routes/routesIndex";
import FindPartnerIndex from "./pages/mainpage/scenes/finding-Partner/find-partnerIndex";
import ActiveRequestIndex from "./pages/mainpage/scenes/finding-Partner/ActiveRequests/activeRequestIndex";
import RoutesDetailsIndex from "./pages/mainpage/scenes/climbingPlaces/routes/routeDetailsIndex";
import SeeRequestIndex from "./pages/mainpage/scenes/finding-Partner/SeeRequest/seeRequestIndex";
import InboxIndex from "./pages/mainpage/scenes/messaging/inboxIndex";
import RegistrationPlus from "./pages/Website/Auth/registrationPlus";
import CreatePassword from "./pages/Website/Auth/passwordCreationPlus";
import RestorePassword from "./pages/Website/Auth/recoverPassword";
import RecoverPasswordCreation from "./pages/Website/Auth/recoverPasswordCreation";
import NotificationSettingsIndex from "./pages/mainpage/scenes/notifications/notificationSettingsIndex";
import RequestDetailsIndex from "./pages/mainpage/scenes/requestDetails/requestDetailsIndex";
import 'react-big-calendar/lib/css/react-big-calendar.css';



function App() { 
   // State for storing the user token
  const [token, setToken] = useState(null);
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, [])
  
  
  

  return(
  <ThemeProvider theme={theme}>
  <Routes>
    <Route path="/" element={<><AppHeader /> <HomePage /></>}  /> 
    <Route path="/auth" element={<><AppHeader /><Login setToken={setToken}/></>}  />
    <Route path="/registration" element={<><AppHeader /> <RegistrationPlus/> </>}/>
    <Route path="/recover-password" element={<><AppHeader /> <RestorePassword/> </>}/>
    <Route path="/initial-preferences" element={<><AppHeader /><InitialPreferences token={token} /></>}  />
    <Route path="/dashboard" element={<Dashboard token={token} />}  />
    <Route path="/view-profile" element={<ViewProfile token={token} />}  />
    <Route path="/edit-profile" element={<EditProfile token={token} />} />
    <Route path="/faq" element={<FAQ />} />
    <Route path="/climbing-locations" element={<CountryIndex />} />
    <Route path="/climbing-locations/:country" element={<RegionsIndex />} />
    <Route path="/climbing-locations/:country/:region" element={<AreasIndex />} />
    <Route path="/climbing-locations/:country/:region/:area" element={<RoutesIndex />} />
    <Route path="/climbing-locations/:country/:region/:area/:routeName" element={<RoutesDetailsIndex />} />
    <Route path="/find-a-buddy" element={<FindPartnerIndex />} />
    <Route path="/showActiveRequest/:request" element={<ActiveRequestIndex />} />
    <Route path="/allRequests" element={<SeeRequestIndex/>} />
    <Route path="/inbox" element={<InboxIndex />} />
    <Route path="/create-password" element={<CreatePassword />} />
    <Route path="/recover-passwordCreation" element={<RecoverPasswordCreation />} />
    <Route path="/notification-settings" element={<NotificationSettingsIndex />} />
    <Route path="/request-details/:request_id" element={<RequestDetailsIndex />} />


    
  </Routes>
</ThemeProvider>
);
}

export default App;