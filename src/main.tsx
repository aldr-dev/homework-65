import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {SnackbarProvider} from 'notistack';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <SnackbarProvider/>
    <App/>
  </BrowserRouter>
);