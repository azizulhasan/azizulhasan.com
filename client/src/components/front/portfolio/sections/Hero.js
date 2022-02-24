import React, { useEffect, useState } from "react";

/**
 *
 * Utilities
 */
import { getData } from "../../../Context/utilities";

export default function Hero() {
  const [hero, setHero] = useState({});
  const uploadFolder = "assets/dashboard/assets/img/";

  const styles = {
    hero: {
      width: "100%",
      height: "100vh",
      backgroundImage: `url(${
        process.env.REACT_APP_IMAGE_FOLDER + "" + hero.backgroundImage
      })`,
      backgroundPosition: "top right",
      backgroundRepeat: " no-repeat",
      backgroundSize: "cover",
      position: "relative",
      zIndex: 9999,
    },
  };

  useEffect(() => {
    /**
     * Get data from and display to table.
     */
    getData(process.env.REACT_APP_API_URL + "/api/hero").then((res) => {
      setHero(res.data[0]);
    });
  }, []);
  return (
    <React.Fragment>
      <style
        dangerouslySetInnerHTML={{
          __html: [
            "#hero:before {",
            ' content: "";',
            `background: rgba(255, 255, 255, ${hero.backgroundImageOpacity});`,
            "position: absolute;",
            "bottom: 0;",
            "top: 0px;",
            "left: 0;",
            "right: 0;",
            "z-index: -1",
            "}",
          ].join("\n"),
        }}
      ></style>
      <section
        id="hero"
        style={styles.hero}
        className="d-flex flex-column justify-content-center"
      >
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
    </React.Fragment>
  );
}
