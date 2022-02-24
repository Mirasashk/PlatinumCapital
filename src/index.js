import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase/compat/app';

import { firebaseConfig } from './apis/firebase';
import { BrowserRouter } from 'react-router-dom';

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <BrowserRouter>
    <App style={{ width: '100vw' }} />
  </BrowserRouter>,
  document.querySelector('#root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
