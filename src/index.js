import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./styles.css";

// app.js call
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);


// バージョンの問題？React.Strictmodeではredirectが聞かない。

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './components/App';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );