import React from "react";
import { BrowserRouter } from "react-router-dom"
import DefaultRoutes from "./plugins/Router/index"
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
      <BrowserRouter>
        <DefaultRoutes />
      </BrowserRouter>
  );
}

export default App;
