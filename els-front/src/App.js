import React from "react";
import { useState,useEffect } from "react";
import { BrowserRouter } from "react-router-dom"
import DefaultRoutes from "./plugins/Router/index"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from './plugins/axios'

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
      const type = localStorage.getItem('access_type')

      const checkUser = async () => {
          const response = await api.get(`${type}/details`)
          setUser(response.data)
      }

      checkUser()
  },[]);

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
