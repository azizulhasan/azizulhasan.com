import React, { useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import axios from "axios";


/**
 * Css
 */
import './hero.css'

export default function HeroModal({ setHeroData, updateBton }) {
  const [lgShow, setLgShow] = useState(false);
  const [hero, setData] = useState({
    _id: "",
    title: "",
    profession: "",
    social_icon_name: "",
    social_icon_url: "",
    backgroundImage: "",
    backgroundImageOpacity: "",
    icons: [],
  });
  const socialIcons = [
    "facebook",
    "linkedin",
    "github",
    "twitter",
    "instagram",
    "hackerrank",
    "stackoverflow",
    "leetcode",
    "skype",
    "zoom",
  ];



  /**
   * Handle content change value.
   * @param {event} e
   */
  const handleChange = (e) => {
    // console.log(e.target)
    setData({ ...hero, ...{ [e.target.name]: e.target.value } });
  };

  /**
   * Handle hero content form submission
   * @param {event} e
   * @returns
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    /**
     * Get full form data and modify them for saving to database.
     */
    let form = new FormData(e.target);
    let iconMap = {};
    let data = {};
    data["icons"] = [];
    for (let [key, value] of form.entries()) {
      if (key === "" || value === "" || (key === 'backgroundImage' && value.name === '')) {
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

    let formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "icons") {
        formData.append(key, JSON.stringify(data[key]));
      }else if(key === '_id'){

      } else {
        formData.append(key, data[key]);
      }
    });

    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    // return;
    if(data._id !== undefined){
      axios
      .post("http://localhost:4000/api/hero/"+data._id, formData)
      .then((res) => {
        setHeroData(res.data);
        setLgShow(false);
      })
      .catch((err) => {
        console.log(err);
      });
    }else{
      axios
      .post("http://localhost:4000/api/hero", formData)
      .then((res) => {
        setHeroData(res.data);
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
  const getHeroContent = (id) => {
    axios
      .get("http://localhost:4000/api/hero/" + id)
      .then((res) => {
        setData(res.data);
        setTimeout(() => console.log(hero), 10);
        setLgShow(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  /**
   * Preveiw Image
   */
  const previewImage = (e) => {
    let imgUrl = document.getElementById("previewImage");
    const url = URL.createObjectURL(e.target.files[0]);
    imgUrl.src = url;
  };
    /**
   * Add another social icon with url
   */
     const addSocialIcon = () => {
      const icon_col = document.getElementById("social_icon_col");
      const icon_row = document
        .getElementById("social_icon_col")
        .firstChild.cloneNode(true);
      icon_col.appendChild(icon_row);
      let iconNodes = document
      .getElementById("social_icon_col").childNodes;
      let lastDatId = iconNodes[iconNodes.length-2].getAttribute('data-id')
      iconNodes[iconNodes.length-1].setAttribute('data-id', ++lastDatId)
      console.log(lastDatId)
    };

  /**
   * Delete social icon
   */
  const deleteSocialIcon = (e) => {
   
    let row = e.target.parentElement.parentElement;
    e.target.parentElement.parentElement.parentElement.removeChild(row)
  }

  return (
    <>
      {updateBton.display ? (
        <Button
          bsPrefix="azh_btn"
          onClick={(e) => getHeroContent(updateBton.id)}
        >
          Update Content
        </Button>
      ) : (
        <Button bsPrefix="azh_btn" onClick={(e) => setLgShow(true)}>
          Hero Content
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
              ? "Update Section Content"
              : "Hero Section Content"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            id="heroForm"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <Form.Group className="mb-4" controlId="hero.titlle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                onChange={handleChange}
                value={hero.title}
                placeholder="Title"
              />
            </Form.Group>
            {updateBton.display && (
              <Form.Control
                type="text"
                id="_id"
                onChange={handleChange}
                value={hero._id}
                name="_id"
                placeholder="id"
                hidden
              />
            )}
            <Form.Group className="mb-4" controlId="hero.profession">
              <Form.Label>Profession</Form.Label>
              <Form.Control
                type="text"
                name="profession"
                onChange={handleChange}
                value={hero.profession}
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
                {hero.icons.length > 0 ? (
                  JSON.parse(hero.icons).map((icon, i) => {
                    return (
                      <Row key={i} data-id={++i}>
                        <Col
                          xs={12}
                          sm={6}
                          lg={5}
                          className="d-flex flex-col justify-content-start align-items-start mb-2"
                        >
                          <Form.Group
                            className="mb-3"
                            controlId="hero.social_icon"
                          >
                            <Form.Label>Social Icon</Form.Label>
                            <Form.Select
                              name="social_icon_name"
                              onChange={handleChange}
                              aria-label="Default select example"
                            >
                              <option>Open this select menu</option>
                              {socialIcons.map((item) => {
                                return (
                                  <option
                                    key={item}
                                    value={item}
                                    selected={icon[0] === item ? "selected" : ""}
                                  >
                                    {item[0].toUpperCase() + item.slice(1)}
                                  </option>
                                );
                              })}
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col
                          xs={12}
                          sm={6}
                          lg={5}
                          className="d-flex flex-col  mb-2"
                        >
                          <Form.Group
                            className="mb-3"
                          >
                            <Form.Label>Social URL</Form.Label>
                            <Form.Control
                              type="text"
                              name="social_icon_url"
                              value={icon[1]}
                              onChange={handleChange}
                              placeholder="URL"
                            />
                          </Form.Group>
                          <button type="button" className="azh_btn btn-danger azh_btn_delete deleteSocialIcon" onClick={deleteSocialIcon} 
                            >Delete</button>
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
                      <Form.Group className="mb-3" controlId="hero.social_icon">
                        <Form.Label>Social Icon</Form.Label>
                        <Form.Select
                          name="social_icon_name"
                          onChange={handleChange}
                          aria-label="Default select example"
                        >
                          <option>Open this select menu</option>
                          {socialIcons.map((item) => {
                            return (
                              <option key={item} value={item}>
                                {item[0].toUpperCase() + item.slice(1)}
                              </option>
                            );
                          })}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col
                      xs={12}
                      sm={6}
                      lg={7}
                      className="d-flex flex-col  mb-2"
                    >
                      <Form.Group className="mb-3">
                        <Form.Label>Social URL</Form.Label>
                        <Form.Control
                          type="text"
                          name="social_icon_url"
                          value={hero.social_icon_url}
                          onChange={handleChange}
                          placeholder="URL"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                )}
              </Col>
            </Row>
            <Row>
              <Col xs={12} sm={6} lg={6}>
                <Form.Group className="mb-4" controlId="hero.backgroundImage">
                  <Form.Label>Background Image</Form.Label>
                  <Form.Control
                    accept=".png, .jpg, .jpeg"
                    name="backgroundImage"
                    onChange={previewImage}
                    type="file"
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={6} lg={6}>
                <Form.Group
                  className="mb-4"
                  controlId="hero.backgroundImagePreview"
                >
                  <img
                    id="previewImage"
                    height="100"
                    width="100"
                    alt={hero.backgroundImage}
                    src={hero.backgroundImage}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group
              className="mb-4"
              controlId="hero.backgroundImageOpacity"
            >
              <Form.Label>Background Image Opacity</Form.Label>
              <Form.Control
                type="text"
                name="backgroundImageOpacity"
                placeholder=".5"
                onChange={handleChange}
                value={hero.backgroundImageOpacity}
              />
            </Form.Group>
            <button className="azh_btn w-100" type="submit" id="hero.sumbit">
            {updateBton.display ? 'Update' : 'Submit'}
            </button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
