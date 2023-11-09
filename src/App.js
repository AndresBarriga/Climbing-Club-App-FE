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
import Dashboard from './pages/dashboard/dashboard';

function App() {
  const [token, setToken] = useState(null);

  return (
    <ThemeProvider theme={theme}>
      <AppHeader />
      <Routes>
      <Route path="/" element={<HomePage />}  /> 
      <Route path="/auth" element={<Login setToken={setToken}/>}  />
      <Route path="/registration" element={<Registration/>}  />
      <Route path="/initial-preferences" element={<Private token={token} />}  />
      <Route path="/dashboard" element={<Dashboard token={token} />}  />
      </Routes>
      </ThemeProvider>
  );
}

export default App;