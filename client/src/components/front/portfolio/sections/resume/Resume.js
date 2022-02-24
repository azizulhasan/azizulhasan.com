import React, { useEffect, useState } from "react";
import Education from "./Education";
import Experience from "./Experience";
/**
 *
 * Utilities
 */
import { getData } from "../../../../Context/utilities";
export default function Resume() {
  const [summery, setSummery] = useState({});
  useEffect(() => {
    /**
     * Get data from and display to table.
     */
    getData(process.env.REACT_APP_API_URL + "/api/summery").then((res) => {
      setSummery(res.data[0]);
    });
  }, []);
  return (
    <section id="resume" className="resume">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>{summery.section_title ? summery.section_title : "Resume"}</h2>
          <p>{summery.top_details}</p>
        </div>

        <div className="row">
          <div className="col-lg-6">
            <h3 className="resume-title">
              {summery.summery_title ? summery.summery_title : "Summery"}
            </h3>
            <div className="resume-item pb-0">
              <h4>{summery.name}</h4>
              <div dangerouslySetInnerHTML={{ __html: summery.summery }}></div>
            </div>
            <Education education_title={summery.education_title} />
          </div>
          <Experience experience_title={summery.experience_title} />
        </div>
      </div>
    </section>
  );
}