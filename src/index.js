import React from 'react';
import './styles/index.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const root = document.getElementById('root');
const rootInstance = ReactDOM.createRoot(root);

rootInstance.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);