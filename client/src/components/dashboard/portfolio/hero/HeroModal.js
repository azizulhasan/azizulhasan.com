import React, { useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";

export default function HeroModal(props) {
  const [lgShow, setLgShow] = useState(false);

  return (
    <>
      <Button bsPrefix="azh_btn" onClick={() => setLgShow(true)}>
        Hero Content
      </Button>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Hero Section Content
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="heroSection">
            
            <Form.Group className="mb-3" controlId="hero.titlle">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Title" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="hero.profession">
              <Form.Label>Profession</Form.Label>
              <Form.Control
                type="text"
                placeholder="Software Engineer, Teacher etc"
              />
            </Form.Group>

            <Row id="hero.social_row">
              <Col
                xs={12}
                sm={12}
                lg={12}
                className="d-flex flex-col justify-content-start align-items-start mb-2"
              >
                <Button bsPrefix="azh_btn" id="hero.add_social_link">
                  Add Social Link
                </Button>
              </Col>
              <Col
                xs={12}
                sm={6}
                lg={5}
                className="d-flex flex-col justify-content-start align-items-start mb-2"
              >
                <Form.Group className="mb-3" controlId="hero.social_icon">
                  <Form.Label>Social Icon</Form.Label>
                  <Form.Select
                    multi-select={true}
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
                  <Form.Control type="text" placeholder="URL" />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3" controlId="hero.backgroundImage">
              <Form.Label>Background Image</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="hero.backgroundImageOpacity"
            >
              <Form.Label>Background Image Opacity</Form.Label>
              <Form.Control type="text" placeholder=".5" />
            </Form.Group>
            <Button bsPrefix="azh_btn w-100" id="hero.sumbit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
