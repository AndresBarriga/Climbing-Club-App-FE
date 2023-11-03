import React from 'react';
import "./styles/App.css";
import "./styles/index.css";
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home/Home';
import { ThemeProvider } from '@mui/material/styles'; 
import theme from "./styles/theme"
import AppHeader from './components/Header';
import Login from './pages/Auth/Login';
import Registration from './pages/Auth/Registration';
import Private from './pages/private';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppHeader />
      <Routes>
      <Route path="/" element={<HomePage />}  /> 
      <Route path="/auth" element={<Login />}  />
      <Route path="/registration" element={<Registration/>}  />
      <Route path="/private" element={<Private/>}  />
      </Routes>
      </ThemeProvider>
  );
}

export default App;