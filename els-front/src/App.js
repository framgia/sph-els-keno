import React from "react";
import { BrowserRouter} from "react-router-dom"
import DefaultRoutes from "./plugins/Router/index"

function App() {
  return (
      <BrowserRouter>
        <DefaultRoutes></DefaultRoutes>
      </BrowserRouter>
  );
}

export default App;
