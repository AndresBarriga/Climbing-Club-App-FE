import "./styles/App.css";
import "./styles/index.css";
import React, {useState} from 'react';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles'; 
import HomePage from "./pages/Website/Home/Home";
import theme from "./styles/theme"
import AppHeader from "./components/reusable/HeaderWebsite";
import Login from './pages/Website/Auth/Login';
import Registration from './pages/Website/Auth/Registration';
import InitialPreferences from "./pages/mainpage/scenes/firstLogin/initial-preferences";
import Dashboard from './pages/mainpage/scenes/dashboard/index';
import FAQ from './pages/mainpage/scenes/faq/index';
import ViewProfile from './pages/mainpage/scenes/profileCard/viewProfile';
import EditProfile from "./pages/mainpage/scenes/profileCard/editProfile";
import CountryIndex from "./pages/mainpage/scenes/climbingPlaces/countries/countriesIndex";
import RegionsIndex from "./pages/mainpage/scenes/climbingPlaces/regions/regionsIndex";
import AreasIndex from "./pages/mainpage/scenes/climbingPlaces/areas/areasIndex";
import RoutesIndex from "./pages/mainpage/scenes/climbingPlaces/routes/routesIndex";



function App() { 
   // State for storing the user token
  const [token, setToken] = useState(null);
  return(
  <ThemeProvider theme={theme}>
  <Routes>
    <Route path="/" element={<><AppHeader /> <HomePage /></>}  /> 
    <Route path="/auth" element={<><AppHeader /><Login setToken={setToken}/></>}  />
    <Route path="/registration" element={<><AppHeader /><Registration/></>}  />
    <Route path="/initial-preferences" element={<><AppHeader /><InitialPreferences token={token} /></>}  />
    <Route path="/dashboard" element={<Dashboard token={token} />}  />
    <Route path="/view-profile" element={<ViewProfile token={token} />}  />
    <Route path="/edit-profile" element={<EditProfile token={token} />} />
    <Route path="/faq" element={<FAQ />} />
    <Route path="/climbing-locations" element={<CountryIndex />} />
    <Route path="/climbing-locations/:country" element={<RegionsIndex />} />
    <Route path="/climbing-locations/:country/:region" element={<AreasIndex />} />
    <Route path="/climbing-locations/:country/:region/:area" element={<RoutesIndex />} />
  </Routes>
</ThemeProvider>
);
}

export default App;