import React from "react";
/**
 * Stypes and scripts
 */
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

/**
 * Components
 */
import Dashboard from "./components/dashboard/Dashboard";
import Front from "./components/front/Front";

export default function App() {
  if (window.location.pathname !== "/dashboard") {
    return <Front />;
  } else {
    return <Dashboard />;
  }
}
