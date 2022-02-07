import React, { useState, useEffect } from "react";
import Blogs from "./blogs/Blogs";
import Home from "./portfolio/Home";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./portfolio/Login";
import { Navbar, Container, Nav, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import BlogDetails from "./blogs/BlogDetails";

function Front() {
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    /**
     * Display or hide portfolio menus.
     */
    const displayMunu = () => {
      let menus = document.getElementsByClassName("scrollto2");
      if (window.innerWidth > 991) {
        [...menus].forEach((menu) => {
          menu.style.display = "none";
        });
      } else {
        [...menus].forEach((menu) => {
          menu.style.display = "block";
        });
      }
    };
    displayMunu();
    /**
     * Display some menus on mobile
     */
    window.addEventListener("resize", () => {
      if (window.innerWidth > 991) {
        displayMunu();
      } else if (window.innerWidth < 991 && window.innerWidth > 989) {
        window.location.reload(false);
        displayMunu();
      }
    });
  });
  return (
    <Router>
      <Navbar style={{zIndex: '99999'}} sticky="top" bg="light" expand="lg">
        <Container>
          <Link className="navbar-brand" to="/">
            Hajar Zellal
          </Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <a href="#hero" className="nav-link scrollto2 active">
                <span>Home</span>
              </a>

              <a href="#about" className="nav-link scrollto2">
                <span>About</span>
              </a>

              <a href="#resume" className="nav-link scrollto2">
                <span>Resume</span>
              </a>
              <a href="#portfolio" className="nav-link scrollto2">
                <span>Portfolio</span>
              </a>
              <a href="#services" className="nav-link scrollto2">
                <span>Services</span>
              </a>
              <a href="#contact" className="nav-link scrollto2">
                <span>Contact</span>
              </a>
              <Link className="nav-link" to="/blogs">
                Blogs
              </Link>
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Row>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/blogs" element={<Blogs />}></Route>
            <Route path="/blogs/:blogTitle" element={<BlogDetails />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </Routes>
        </Row>
      </Container>
    </Router>
  );
}

export default Front;
