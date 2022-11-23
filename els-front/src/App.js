import React from "react";
import { BrowserRouter } from "react-router-dom"
import DefaultRoutes from "./plugins/Router/index"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useUser from "./hooks/useUser";

function App() {
  const [user] = useUser();
  return (
     <>
      <BrowserRouter>
        <DefaultRoutes user={user} />
      </BrowserRouter>
      <ToastContainer />
     </>
  );
}

export default App;
