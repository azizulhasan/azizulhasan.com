import React  from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/**
 * Scripts
 */
import './assets/css/styles.css'
import "./assets/js/scripts.js"
import {addScripts}  from '../Context/utilities'

/**
 * Dashboard Components
 */
import DashboardContent from "./dasboardcontent/DashboardContent";
import DashboardTopNav from "./dasboardcontent/DashboardTopNav";
import DashboardSideNav from "./dasboardcontent/DashboardSideNav";
// import DataTable from "./dasboardcontent/DataTable";

/**
 * Portfolio components
 */
import Hero from "./portfolio/hero/Hero";
import About from "./portfolio/About";
import Facts from './portfolio/Facts'
import Skills from "./portfolio/Skills";
import Resume from "./portfolio/Resume";
import Portfolio from "./portfolio/Portfolio";
import Services from "./portfolio/Services";
import Contact from "./portfolio/Contact";
import Testimonials from "./portfolio/Testimonials";
/**
 * Blog components
 * 
 */
 import CreateBlog from "./blogs/blogcontent/CreateBlog";
 import CreateCategory from "./blogs/categorycontent/CreateCategory";

export default function Dashboard() {

    addScripts(['https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/js/all.min.js'])
  return (
    <React.Fragment>
        <Router>
        <DashboardTopNav/>
        <div id="layoutSidenav">
        
            <DashboardSideNav/>
            <div id="layoutSidenav_content">
                <main>
                    <div className="container-fluid px-4">
                        <h1 className="mt-4">Dashboard</h1>
                        <ol className="breadcrumb mb-4">
                            <li className="breadcrumb-item active">Dashboard</li>
                        </ol>
                        <Routes>
                          <Route path="/dashboard" element={<DashboardContent/>}/>
                          <Route path="/dashboard/hero" element={<Hero/>}/>
                          <Route path="/dashboard/about" element={<About/>}/>
                          <Route path="/dashboard/facts" element={<Facts/>}/>
                          <Route path="/dashboard/skills" element={<Skills/>}/>
                          <Route path="/dashboard/resume" element={<Resume/>}/>
                          <Route path="/dashboard/portfolio" element={<Portfolio/>}/>
                          <Route path="/dashboard/services" element={<Services/>}/>
                          <Route path="/dashboard/testimonials" element={<Testimonials/>}/>
                          <Route path="/dashboard/contact" element={<Contact/>}/>
                          <Route path="/dashboard/blogs" element={<CreateBlog/>}/>
                          <Route path="/dashboard/category" element={<CreateCategory/>}/>
                        </Routes>
                        {/* <DataTable/> */}
                    </div>
                </main>
                <footer className="py-4 mt-auto footer_bg">
                    <div className="container-fluid px-4">
                        <div className="d-flex align-items-center justify-content-between small">
                            <div className="text-muted">Copyright &copy; Your Website 2021</div>
                        </div>
                    </div>
                </footer>
            </div>
           
        </div>
        </Router>
    </React.Fragment>
  );
}
