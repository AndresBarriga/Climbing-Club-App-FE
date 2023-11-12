import React, {useState} from 'react';
import "./styles/App.css";
import "./styles/index.css";
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home/Home';
import { ThemeProvider } from '@mui/material/styles'; 
import theme from "./styles/theme"
import AppHeader from './components/Header';
import Login from './pages/Auth/Login';
import Registration from './pages/Auth/Registration';
import Private from './pages/initial-preferences';
import Dashboard from './pages/mainpage/scenes/dashboard/index';
import { useLocation } from 'react-router-dom';
import Topbar from './pages/mainpage/scenes/global/Topbar';
import SideBar from './pages/mainpage/scenes/global/SideBar';
import FAQ from './pages/mainpage/scenes/faq';
import ViewProfile from './pages/mainpage/scenes/profileCard/viewProfile';
/*  import FindParners from './pages/mainpage/FindParners';
import ClimbingLocations from './pages/mainpage/ClimbingLocations';
import Events from './pages/mainpage/Events';
import EducationAndContent from './pages/mainpage/EducationAndContent'; */


function App() {
  const [token, setToken] = useState(null);
  const [isSidebar, setIsSidebar] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  return(
  <ThemeProvider theme={theme}>
  <Routes>
    <Route path="/" element={<><AppHeader /> <HomePage /></>}  /> 
    <Route path="/auth" element={<><AppHeader /><Login setToken={setToken}/></>}  />
    <Route path="/registration" element={<><AppHeader /><Registration/></>}  />
    <Route path="/initial-preferences" element={<><AppHeader /><Private token={token} /></>}  />
    <Route path="/dashboard" element={<Dashboard token={token} />}  />
    <Route path="/view-profile" element={<ViewProfile token={token} />}  />
              <Route path="/faq" element={<FAQ />} />
    {/* <Route path="/*" element={
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Topbar setIsSidebar={setIsSidebar} />
        <div style={{ display: 'flex', height: '100%' }}>
          {isSidebar && <SideBar />}
          <div className='custom-paper2' style={{ flex: 1, overflow: 'auto' }}>
            <Routes>
              <Route path="/dashboard" element={<Dashboard token={token} />}  />
              <Route path="/faq" element={<FAQ />} />
            </Routes> </div> </div>v</div>}/>*/}
          
        
      
    
  </Routes>
</ThemeProvider>
);
}

export default App;