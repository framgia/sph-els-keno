import React from "react";
import { BrowserRouter } from "react-router-dom"
import DefaultRoutes from "./plugins/Router/index"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
     <>
      <BrowserRouter>
        <DefaultRoutes />
      </BrowserRouter>
      <ToastContainer />
     </>
  );
}

export default App;
