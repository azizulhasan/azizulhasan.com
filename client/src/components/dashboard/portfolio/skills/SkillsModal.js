import React, { useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { getData, postData } from "../../../Context/utilities";
import { deleteSkill, addSkill } from "./SkillsHooks";
/**
 * Css
 */
import "./skills.css";

export default function AboutModal({ setAboutData, updateBton }) {
  const [lgShow, setLgShow] = useState(false);
  const [skills, setData] = useState({
    _id: "",
    details: "",
    skills: [],
    skill_name: '',
    skill_proficiency:''
  });
  /**
   * Handle content change value.
   * @param {event} e
   */
  const handleChange = (e) => {
    setData({ ...skills, ...{ [e.target.name]: e.target.value } });
  };

  /**
   * Handle skills content form submission
   * @param {event} e
   * @returns
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    /**
     * Get full form data and modify them for saving to database.
     */
     let form = new FormData(e.target);
     let skillMap = {};
     let data = {};
     data["skill"] = [];
     for (let [key, value] of form.entries()) {
       if (
         key === "" ||
         value === ""
       ) {
        //  alert("Please fill the value of : " + key);
        //  return;
       }
 
       if (key === "skill_name") {
         skillMap["skill"] = [value];
       } else if (key === "skill_proficiency") {
         skillMap["skill"].push(value);
         data["skill"].push(skillMap["skill"]);
       } else {
         data[key] = value;
       }
     }

    /**
     * format form data.
     */
    let formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "_id") {
      } else {
        formData.append(key, data[key]);
      }
    });

    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    return;

    /**
     * Update data if "_id" exists. else save form data.
     */
    if (data._id !== undefined) {
      postData("http://localhost:4000/api/about/" + data._id, formData)
        .then((res) => {
          setAboutData(res);
          setLgShow(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      postData("http://localhost:4000/api/about", formData)
        .then((res) => {
          setAboutData(res);
          setLgShow(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  /**
   * get hero content by id.
   * @param {id} id
   */
  const getAboutContent = (id) => {
    getData("http://localhost:4000/api/about/" + id).then((res) => {

    //   setData(res);
      setLgShow(true);
    });
  };
  return (
    <>
      {updateBton.display ? (
        <Button
          bsPrefix="azh_btn"
          onClick={(e) => getAboutContent(updateBton.id)}
        >
          Update Content
        </Button>
      ) : (
        <Button bsPrefix="azh_btn" onClick={(e) => setLgShow(true)}>
          Add Content
        </Button>
      )}
      <Modal
        size="lg"
        show={lgShow}
        onHide={(e) => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            {updateBton.display
              ? "Update Skills Section Content"
              : "Sills Section Content"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {updateBton.display && (
              <Form.Control
                type="text"
                id="_id"
                onChange={handleChange}
                value={skills._id}
                name="_id"
                placeholder="id"
                hidden
              />
            )}
            <Form.Group className="mb-4" controlId="skills.details">
              <Form.Label>Sills Details</Form.Label>
              <Form.Control
                as="textarea"
                row={2}
                name="details"
                onChange={handleChange}
                value={skills.details}
                placeholder="Type here skills details"
              />
            </Form.Group>
            <Row id="skills.skill_row" className="mb-4">
              <Col
                xs={12}
                sm={12}
                lg={12}
                className="d-flex flex-col justify-content-start align-items-start mb-2"
              >
                <Button
                  bsPrefix="azh_btn"
                  onClick={addSkill}
                  id="skills.add_skill"
                >
                  Add Skill
                </Button>
              </Col>
              <Col id="skill_col">
                {skills.skills.length > 0 ? (
                  JSON.parse(skills.skills).map((skill, i) => {
                    return (
                      <Row key={i}>
                        <Col
                          xs={12}
                          sm={6}
                          lg={5}
                          className="d-flex flex-col justify-content-start align-items-start mb-2"
                        >
                          <Form.Group
                            className="mb-3"
                            controlId="hero.skill_name"
                          >
                            <Form.Label>Skill Name</Form.Label>
                            <Form.Control
                              type="text"
                              name="skill_name"
                              value={skill[0]}
                              onChange={handleChange}
                              placeholder="Skill Name"
                            />
                          </Form.Group>
                        </Col>
                        <Col
                          xs={12}
                          sm={6}
                          lg={5}
                          className="d-flex flex-col  mb-2"
                        >
                          <Form.Group className="mb-3">
                            <Form.Label>Sill Proficiency (%)</Form.Label>
                            <Form.Control
                              type="text"
                              name="skill_proficiency"
                              value={skill[1]}
                              onChange={handleChange}
                              placeholder="proficiency (%)"
                            />
                          </Form.Group>
                          <button
                            type="button"
                            className="azh_btn btn-danger azh_btn_delete deleteSocialIcon"
                            onClick={deleteSkill}
                          >
                            Delete
                          </button>
                        </Col>
                      </Row>
                    );
                  })
                ) : (
                  <Row>
                    <Col
                      xs={12}
                      sm={6}
                      lg={5}
                      className="d-flex flex-col justify-content-start align-items-start mb-2"
                    >
                      <Form.Group className="mb-3">
                        <Form.Label>Skill Name </Form.Label>
                        <Form.Control
                          type="text"
                          name="skill_name"
                          value={skills.skill_name}
                          onChange={handleChange}
                          placeholder="proficiency name"
                        />
                      </Form.Group>
                    </Col>
                    <Col
                      xs={12}
                      sm={6}
                      lg={7}
                      className="d-flex flex-col  mb-2"
                    >
                      <Form.Group className="mb-3">
                        <Form.Label>Skill Proficiency (%) </Form.Label>
                        <Form.Control
                          type="text"
                          name="skill_proficiency"
                          value={skills.skill_proficiency}
                          onChange={handleChange}
                          placeholder="proficiency (%)"
                        />
                      </Form.Group>
                      <button
                            type="button"
                            className="azh_btn btn-danger azh_btn_delete deleteSocialIcon"
                            onClick={deleteSkill}
                          >
                            Delete
                          </button>
                    </Col>
                  </Row>
                )}
              </Col>
            </Row>

            <button className="azh_btn w-100" type="submit" id="skills.sumbit">
              {updateBton.display ? "Update" : "Submit"}
            </button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
