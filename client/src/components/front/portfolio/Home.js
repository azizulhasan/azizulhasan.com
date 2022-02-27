import React, { useEffect } from "react";

// import "./assets/vendor/aos/aos.css"
import "./assets/vendor/bootstrap/css/bootstrap.min.css";
import "./assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "./assets/vendor/boxicons/css/boxicons.min.css";
import "./assets/vendor/glightbox/css/glightbox.min.css";
import "./assets/vendor/swiper/swiper-bundle.min.css";
import "./assets/css/style.css";

/**
 * Utilities
 */
import { addScripts } from "../../Context/utilities";
/**
 * Sections
 */
import LeftMenu from "./sections/LeftMenu";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Facts from "./sections/Facts";
import Skills from "./sections/Skills";
import Resume from "./sections/resume/Resume";
import Portfolio from "./sections/Portfolio";
import Services from "./sections/Services";
import Testimonials from "./sections/Testimonials";
import Contact from "./sections/Contact";
import Footer from "../partials/Footer";
import ScrollToTop from "../partials/ScrollToTop";

// import 'https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Raleway:300,300i,400,400i,500,500i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i'
export default function Home() {
  useEffect(() => {
    /**
     * Load all script of portfolio. and this url is based on "public/front/assets" folder
     * @param {url} script url
     */
    addScripts([
      "assets/front/vendor/purecounter/purecounter.js",
      "assets/front/vendor/aos/aos.js",
      "assets/front/vendor/bootstrap/js/bootstrap.bundle.min.js",
      "assets/front/vendor/glightbox/js/glightbox.min.js",
      "assets/front/vendor/isotope-layout/isotope.pkgd.min.js",
      "assets/front/vendor/swiper/swiper-bundle.min.js",
      "assets/front/vendor/typed.js/typed.min.js",
      "assets/front/vendor/waypoints/noframework.waypoints.js",
      "assets/front/js/main.js",
    ]);
  });

  return (
    <React.Fragment>
      {/* Header Section*/}
      <LeftMenu />
      {/* End Header */}
      {/** Hero Section */}
      <Hero />
      {/** End Hero */}

      <main id="main">
        {/** About Section */}
        <About />
        {/** End About Section */}
        {/** Facts Section */}
        <Facts />
        {/** End Facts Section */}
        {/** Skills Section */}
        <Skills />
        {/** End Skills Section */}
        {/** Resume Section */}
        <Resume />
        {/** End Resume Section */}
        {/**   Portfolio Section */}
        <Portfolio />
        {/** End Portfolio Section */}
        {/** Services Section */}
        <Services />
        {/** End Services Section */}
        {/** Testimonials Section */}
        <Testimonials />
        {/** End Testimonials Section */}
        {/** Contact Section */}
        <Contact />
        {/** End Contact Section */}
      </main>
      {/* End #main */}

      {/** Footer */}
      <Footer />
      {/* End Footer */}

      <ScrollToTop />
    </React.Fragment>
  );
}
