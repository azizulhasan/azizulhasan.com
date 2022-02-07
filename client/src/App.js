import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
  Navigate,
} from "react-router-dom";
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

  // <Router>
  //   <Routes>
  //     <Route path="/" element={<Front />}>
  //       <Route path="blogs" element={<Blogs />}>
  //         <Route path=":blogId" element={<SingleBlog />} />
  //       </Route>
  //       <Route path="/login" element={<Login />} />
  //       <Route path="/dashboard" element={<Dashboard />} />
  //     </Route>
  //   </Routes>
  // </Router>
}

function Login() {
  return (
    <div>
      <nav>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

// function Front() {
//   return (
//     <div>
//       <nav>
//         <Link to="/blogs">Blogs</Link> | <Link to="/login">Login</Link>
//       </nav>
//       <div className="content">
//         <Outlet />
//       </div>
//     </div>
//   );
// }

function Blogs() {
  return (
    <>
      <h1>Invoices</h1>
      <Link to="/blogs/12">Single blog</Link>
    </>
  );
}

function SingleBlog(blogId) {
  return <h1>SingleBlog</h1>;
}

// function Dashboard() {
//   return <h1>Dashboard</h1>;
// }
