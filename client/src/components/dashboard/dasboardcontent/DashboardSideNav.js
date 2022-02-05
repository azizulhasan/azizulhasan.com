import React from "react";
import { Link } from "react-router-dom";

export default function DashboardSideNav() {
  return (
    <div id="layoutSidenav_nav">
      <nav
        className="sb-sidenav accordion sb-sidenav-dark"
        id="sidenavAccordion"
      >
        <div className="sb-sidenav-menu">
          <div className="nav">
            <div className="sb-sidenav-menu-heading">Core</div>
            <Link className="nav-link" to="/">
              <div className="sb-nav-link-icon">
                <i className="fas fa-tachometer-alt"></i>
              </div>
              Front
            </Link>
            <Link className="nav-link" to="/dashboard">
              <div className="sb-nav-link-icon">
                <i className="fas fa-tachometer-alt"></i>
              </div>
              Dashboard
            </Link>
            <div className="sb-sidenav-menu-heading">Interface</div>
            <a
              className="nav-link collapsed"
              href="#"
              data-bs-toggle="collapse"
              data-bs-target="#collapseLayouts"
              aria-expanded="false"
              aria-controls="collapseLayouts"
            >
            {/* Portfolio Menu */}
              <div className="sb-nav-link-icon">
                <i className="fas fa-columns"></i>
              </div>
              Portfolio
              <div className="sb-sidenav-collapse-arrow">
                <i className="fas fa-angle-down"></i>
              </div>
            </a>
            <div
              className="collapse"
              id="collapseLayouts"
              aria-labelledby="headingOne"
              data-bs-parent="#sidenavAccordion"
            >
              <nav className="sb-sidenav-menu-nested nav">
                <Link className="nav-link" to="/dashboard/hero">
                  Hero 
                </Link>
                <Link className="nav-link" to="/dashboard/about">
                  About 
                </Link>
                <Link className="nav-link" to="/dashboard/facts">
                  Facts 
                </Link>
                <Link className="nav-link" to="/dashboard/skills">
                  Skills 
                </Link>
                <Link className="nav-link" to="/dashboard/resume">
                  Resume 
                </Link>
                <Link className="nav-link" to="/dashboard/portfolio">
                  Portfolio 
                </Link>
                <Link className="nav-link" to="/dashboard/services">
                  Services 
                </Link>
                <Link className="nav-link" to="/dashboard/testimonials">
                  Testimonials 
                </Link>
                <Link className="nav-link" to="/dashboard/contact">
                  Contact 
                </Link>
              </nav>
            </div>


            <a
              className="nav-link collapsed"
              href="#"
              data-bs-toggle="collapse"
              data-bs-target="#blogLaout"
              aria-expanded="false"
              aria-controls="blogLaout"
            >{/* Portfolio Menu */}
                        <div className="sb-nav-link-icon">
                <i className="fas fa-columns"></i>
              </div>
              Blogs
              <div className="sb-sidenav-collapse-arrow">
                <i className="fas fa-angle-down"></i>
              </div>
            </a>
            <div
              className="collapse"
              id="blogLaout"
              aria-labelledby="headingOne"
              data-bs-parent="#sidenavAccordion"
            >
              <nav className="sb-sidenav-menu-nested nav">
                <Link className="nav-link" to="/dashboard/blogs">
                  Blogs 
                </Link>
                <Link className="nav-link" to="/dashboard/category">
                  Category 
                </Link>
              </nav>
            </div>

          </div>
        </div>
        <div className="sb-sidenav-footer">
          <div className="small">Logged in as:</div>
          HAJAR ZELLAL
        </div>
      </nav>
    </div>
  );
}
