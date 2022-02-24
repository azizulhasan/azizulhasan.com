import React, { useEffect, useState } from "react";

/**
 *
 * Utilities
 */
import { getData } from "../../../Context/utilities";
export default function Skills() {
  const [skills, setSkills] = useState({});
  useEffect(() => {
    /**
     * Get data from and display to table.
     */
    getData(process.env.REACT_APP_API_URL + "/api/skills").then((res) => {
      setSkills(res.data[0]);
      setTimeout(() => console.log(res.data[0]), 3);
    });
  }, []);

  const devideSkillsInToRow = (len) => {
    /**
      @todo: if skill length is 1 what to do
    **/
    let perCol = Math.floor(len / 2);
    // let secondCol = Math.floor(Math.random() * (len - perCol + 1)) + perCol;
    console.log(perCol + 1);
    return len % 2 === 0 ? perCol : perCol + 1;
  };

  const openingDiv = () =>{
    return (
      <div className="col-lg-6"></div>
    )
  }

  return (
    <section id="skills" className="skills section-bg">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>{skills.section_title ? skills.section_title : "About"}</h2>
          <p>{skills.top_details ? skills.top_details : ""}</p>
        </div>

        <div className="row skills-content">
          {/* <div className="col-lg-6"> */}
            {/* {skills.skills && devideSkillsInToRow(5)} */}
            {skills.skills &&
              skills.skills.length > 0 &&
              skills.skills.map((skill, index) => {
                return (
                  <>
                    {/* {index == 0 ||
                      (devideSkillsInToRow(skills.skills.length) === index &&
                      <></>)} */}

                    <div className="progress" key={index}>
                      <span className="skill">
                        {skill[0]} <i className="val">{skill[1]}%</i>
                      </span>
                      <div className="progress-bar-wrap">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          aria-valuenow={skill[1]}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                    {/* {index == 0 ||
                      (devideSkillsInToRow(skills.skills.length) === index &&
                      <></>)} */}
                  </>
                );
              })}
          {/* </div> */}

          {/* <div className="col-lg-6">
            <div className="progress">
              <span className="skill">
                PHP <i className="val">80%</i>
              </span>
              <div className="progress-bar-wrap">
                <div
                  className="progress-bar"
                  role="progressbar"
                  aria-valuenow="80"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>

            <div className="progress">
              <span className="skill">
                WordPress/CMS <i className="val">90%</i>
              </span>
              <div className="progress-bar-wrap">
                <div
                  className="progress-bar"
                  role="progressbar"
                  aria-valuenow="90"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>

            <div className="progress">
              <span className="skill">
                Photoshop <i className="val">55%</i>
              </span>
              <div className="progress-bar-wrap">
                <div
                  className="progress-bar"
                  role="progressbar"
                  aria-valuenow="55"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}
