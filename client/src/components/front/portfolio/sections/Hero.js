import React, { useEffect, useState } from "react";

/**
 *
 * Utilities
 */
import { getData } from "../../../Context/utilities";

/**
 *
 * CSs
 */
const converted = {
  hero: {
    width: "100%",
    height: "100vh",
    background: 'url("../img/hero-bg.jpg") top right no-repeat',
    backgroundSize: "cover",
    position: "relative",
    zIndex: 9999,
  },
};

export default function Hero() {
  const [hero, setHero] = useState({});
  const uploadFolder = "assets/dashboard/assets/img/"

  useEffect(() => {
    /**
     * Get data from and display to table.
     */
    getData("http://localhost:4000/api/hero").then((res) => {
      setHero(res.data[0]);

      // console.log(res.data[0]);
    });
  }, []);
  return (
    <section id="hero" style={{
      width: "100%",
      height: "100vh",
      backgroundImage : `url(${uploadFolder+""+hero.backgroundImage})`,
      backgroundPosition: "top right",
      backgroundRepeat: " no-repeat",
      backgroundSize: "cover",
      position: "relative",
      zIndex: 9999,
    }} className="d-flex flex-column justify-content-center">
      <div className="container" data-aos="zoom-in" data-aos-delay="100">
        <h1>{hero.title}</h1>
        <p>
          I'm a{" "}
          <span className="typed" data-typed-items={hero.profession}></span>
        </p>
        <div className="social-links">
          {hero.icons &&
            JSON.parse(hero.icons).map((icon) => {
              return (
                <a
                  key={icon[0]}
                  href={icon[1]}
                  target="_blank"
                  className={icon[1]}
                >
                  <i className={"bx bxl-" + icon[0]}></i>
                </a>
              );
            })}
        </div>
      </div>
    </section>
  );
}
