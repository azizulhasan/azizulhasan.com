import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";

export default function HeroModal() {
  const [lgShow, setLgShow] = useState(false);

  const addSocialIcon = () => {
    const icon_col = document.getElementById("social_icon_col");
    const icon_row = document
      .getElementById("social_icon_col")
      .firstChild.cloneNode(true);
    icon_col.appendChild(icon_row);
  };

  // Example POST method implementation:
  async function postHeroData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: data, // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  const heroSectionSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let iconMap = {};
    let data = {};
    data["icons"] = [];
    for (let [key, value] of formData.entries()) {
      if (key === "" || value === "") {
        alert("Please fill the value of : " + key);
        return;
      }

      if (key === "social_icon_name") {
        iconMap["icon"] = [value];
      } else if (key === "social_icon_url") {
        iconMap["icon"].push(value);
        data["icons"].push(iconMap["icon"]);
      } else {
        data[key] = value;
      }
    }

    postHeroData("http://localhost:4000/hero", data).then((data) => {
      console.log(data); // JSON data parsed by `data.json()` call
    });
  };

  return (
    <>
      <Button bsPrefix="azh_btn" onClick={(e) => setLgShow(true)}>
        Hero Content
      </Button>
      <Modal
        size="lg"
        show={lgShow}
        onHide={(e) => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Hero Section Content
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="heroForm" onSubmit={heroSectionSubmit}>
            <Form.Group className="mb-4" controlId="hero.titlle">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" placeholder="Title" />
            </Form.Group>
            <Form.Group className="mb-4" controlId="hero.profession">
              <Form.Label>Profession</Form.Label>
              <Form.Control
                type="text"
                name="profession"
                placeholder="Software Engineer, Teacher etc"
              />
            </Form.Group>

            <Row id="hero.social_row" className="mb-4">
              <Col
                xs={12}
                sm={12}
                lg={12}
                className="d-flex flex-col justify-content-start align-items-start mb-2"
              >
                <Button
                  bsPrefix="azh_btn"
                  onClick={addSocialIcon}
                  id="hero.add_social_link"
                >
                  Add Social Link
                </Button>
              </Col>
              <Col id="social_icon_col">
                <Row id="social_icon_row">
                  <Col
                    xs={12}
                    sm={6}
                    lg={5}
                    className="d-flex flex-col justify-content-start align-items-start mb-2"
                  >
                    <Form.Group className="mb-3" controlId="hero.social_icon">
                      <Form.Label>Social Icon</Form.Label>
                      <Form.Select
                        name="social_icon_name"
                        aria-label="Default select example"
                      >
                        <option>Open this select menu</option>
                        <option value="twitter">Twitter</option>
                        <option value="facebook">Fackebook</option>
                        <option value="instagram">Instagram</option>
                        <option value="github">Github</option>
                        <option value="hackerrank">HackerRank</option>
                        <option value="linkedin">LinkedIn</option>
                        <option value="skype">Skype</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col xs={12} sm={6} lg={7} className="d-flex flex-col  mb-2">
                    <Form.Group className="mb-3" controlId="hero.social_url">
                      <Form.Label>Social URL</Form.Label>
                      <Form.Control
                        type="text"
                        name="social_icon_url"
                        placeholder="URL"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Form.Group className="mb-4" controlId="hero.backgroundImage">
              <Form.Label>Background Image</Form.Label>
              <Form.Control name="backgroundImage" type="file" />
            </Form.Group>
            <Form.Group
              className="mb-4"
              controlId="hero.backgroundImageOpacity"
            >
              <Form.Label>Background Image Opacity</Form.Label>
              <Form.Control
                type="text"
                name="backgroundImageOpacity"
                placeholder=".5"
              />
            </Form.Group>
            <button className="azh_btn w-100" type="submit" id="hero.sumbit">
              Submit
            </button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
