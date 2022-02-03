import React from "react";


import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./components/dashboard/Dashboard";

import Front from "./components/front/Front";


function App() {
  
      if(window.location.pathname !== '/dashboard'){
       return <Front/>
      }else{
        return <Dashboard/>
      }

  
}

export default App;
