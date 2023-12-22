import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import {GoogleOAuthProvider} from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <BrowserRouter>
  <GoogleOAuthProvider clientId='386164519039-48qp0pm438hja6ir4evi080iipb0ilch.apps.googleusercontent.com'>
    <App />
    </GoogleOAuthProvider>
  </BrowserRouter>
);
