import React from "react";


import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./components/dashboard/Dashboard";

import Front from "./components/front/Front";
import Dashboard2 from "./components/dashboard/Dashboard2";
import Dashboard3 from "./components/dashboard/Dashboard3";



function App() {
  
      if(window.location.pathname !== '/dashboard'){
       return <Front/>
      }else{
        return <Dashboard3/>

      }

  
}

export default App;
