import "./Dashboard3.css";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
export default function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
      </Router>
      <main>TEST MAIN</main>
    </div>
  );
}