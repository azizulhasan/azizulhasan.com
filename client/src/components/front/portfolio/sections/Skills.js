import React, { useEffect, useState } from "react";

/**
 *
 * Utilities
 */
import { getData } from "../../../context/utilities";
export default function Skills() {
  const [skills, setSkills] = useState({
    _id: "",
    section_title: "",
    top_details: "",
    skills: [],
    skill_name: "",
    skill_proficiency: "",
  });
  useEffect(() => {
    /**
     * Get data from and display to table.
     */
    getData(process.env.REACT_APP_API_URL + "/api/skills").then((res) => {
      if (res.data.length) {
        setSkills(res.data[0]);
      }
    });
  }, []);

  /**
   *
   * @param {skills} len skills length
   * @returns
   */
  const devideSkillsInTowColumn = (len) => {
    if (len === 1) {
      return [len];
    } else {
      let perCol = Math.floor(len / 2);
      return len % 2 === 0 ? [perCol, perCol] : [perCol + 1, perCol + 1];
    }
  };

  return (
    <section id="skills" className="skills section-bg">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>{skills.section_title ? skills.section_title : "Skills"}</h2>
          <p>{skills.top_details ? skills.top_details : ""}</p>
        </div>

        <div className="row skills-content">
          {/**
           * 1. If skills length is 1 then column length will be "col-lg-12" otherwise
           * coumn lenght will be "col-lg-6".
           *
           * 2. `devideSkillsInTowColumn()` length is more then 2 column will be 2
           *
           */}
          {skills.skills.length &&
          devideSkillsInTowColumn(skills.skills.length).length > 1 ? (
            devideSkillsInTowColumn(skills.skills.length).map(
              (columnLen, columnIndex) => {
                return (
                  <div
                    className="col-lg-6"
                    data-id={Math.random() + 1 + columnIndex}
                    key={Math.random() + 1 + columnIndex}
                  >
                    {skills.skills &&
                      skills.skills.length > 0 &&
                      skills.skills.map((skill, index) => {
                        return (
                          <>
                            {/* Render first column if 'columnIndex == 0 && index < columnLen' */}
                            {columnIndex === 0 && index < columnLen ? (
                              <ProgressBar
                                key={index}
                                skill={skill}
                                index={index}
                              />
                            ) : columnIndex === 1 && index >= columnLen ? (
                              <>
                                {/* Render 2nd column if 'columnIndex == 1 && index >= columnLen' */}
                                <ProgressBar
                                  key={index}
                                  skill={skill}
                                  index={index}
                                />
                              </>
                            ) : (
                              ""
                            )}
                          </>
                        );
                      })}
                  </div>
                );
              }
            )
          ) : (
            <SingleSkill key="0" skills={skills} />
          )}
        </div>
      </div>
    </section>
  );
}
/**
 * Render if skills lenght is 1
 * @param {skills} skills
 * @returns
 */
function SingleSkill({ skills }) {
  return (
    <div className="col-lg-12">
      {skills.skills &&
        skills.skills.length > 0 &&
        skills.skills.map((skill, index) => {
          return <ProgressBar key={index} skill={skill} index={index} />;
        })}
    </div>
  );
}

/**
 * Progressbar
 * @param {skill}
 * @returns
 */
function ProgressBar({ skill, index }) {
  return (
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
  );
}
