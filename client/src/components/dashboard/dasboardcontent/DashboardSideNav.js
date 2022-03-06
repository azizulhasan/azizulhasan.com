import React from "react";
import { Link } from "react-router-dom";
import { getUserName } from "../../context/utilities";

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
            <Link className="nav-link" to="/" target="_blank">
              <div className="sb-nav-link-icon">
                <i className="fas fa-user-alt"></i>
              </div>
              Front
            </Link>
            <Link className="nav-link" to="/dashboard/mail">
              <div className="sb-nav-link-icon">
                <i className="fas fa-envelope"></i>
              </div>
              Mail
            </Link>
            <div className="sb-sidenav-menu-heading">Interface</div>
            <a
              className="nav-link collapsed"
              href="#"
              data-bs-toggle="collapse"
              data-bs-target="#portfolioLaouts"
              aria-expanded="false"
              aria-controls="portfolioLaouts"
            >
              {/* Portfolio Menu */}
              <div className="sb-nav-link-icon">
                <i className="fas fa-book-open"></i>
              </div>
              Portfolio
              <div className="sb-sidenav-collapse-arrow">
                <i className="fas fa-angle-down"></i>
              </div>
            </a>
            <div
              className="collapse"
              id="portfolioLaouts"
              aria-labelledby="headingTwo"
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

                <a
                  className="nav-link collapsed"
                  href="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#resumeLaouts"
                  aria-expanded="false"
                  aria-controls="resumeLaouts"
                >
                  {/* Resume Menu */}
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-columns"></i>
                  </div>
                  Resume
                  <div className="sb-sidenav-collapse-arrow">
                    <i className="fas fa-angle-down"></i>
                  </div>
                </a>
                <div
                  className="collapse"
                  id="resumeLaouts"
                  aria-labelledby="headingOne"
                  data-bs-parent="#sidenavAccordion"
                >
                  <nav className="sb-sidenav-menu-nested nav accordion">
                    <Link className="nav-link" to="/dashboard/resume/summery">
                      Summery
                    </Link>
                    <Link className="nav-link" to="/dashboard/resume/education">
                      Education
                    </Link>
                    <Link
                      className="nav-link"
                      to="/dashboard/resume/experience"
                    >
                      Experience
                    </Link>
                  </nav>
                </div>
                <Link className="nav-link" to="/dashboard/contact">
                  Contact
                </Link>
              </nav>
            </div>
            {/* BLOG MENU */}
            {/* 
            <a
              className="nav-link collapsed"
              href="#"
              data-bs-toggle="collapse"
              data-bs-target="#blogLaout"
              aria-expanded="false"
              aria-controls="blogLaout"
            >
              <div className="sb-nav-link-icon">
              <i className="fas fa-blog"></i>
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
            </div> */}
            {/* Settings menu */}
            <Link className="nav-link" to="/dashboard/settings">
              <div className="sb-nav-link-icon">
                <i className="fas fa-wrench"></i>
              </div>
              Settings
            </Link>
          </div>
        </div>
        <div className="sb-sidenav-footer">
          <div className="small">Logged in as:</div>
          {getUserName()}
        </div>
      </nav>
    </div>
  );
}
