import React, { useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { getData, postData, previewImage } from "./MailHooks";
import { sliceComponentName } from "../../Context/utilities";

import { Editor } from "@tinymce/tinymce-react";
/**
 * Css
 */
import "./mail.css";

export default function MailModal({ setAboutData, updateBton }) {
  const [lgShow, setLgShow] = useState(false);
  const [mail, setData] = useState({
    _id: "",
    section_title: "",
    top_details: "",
    profession: "",
    details: "",
    portfolioImage: "",
  });
  /**
   * Handle content change value.
   * @param {event} e
   */
  const handleChange = (e) => {
    setData({ ...mail, ...{ [e.target.name]: e.target.value } });
  };

  const handleDetailsChange = (ed) => {
    ed.on("change", function (e) {
      mail.details = ed.getContent();
      console.log(mail);
    });
  };

  /**
   * Handle mail content form submission
   * @param {event} e
   * @returns
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    /**
     * Get full form data and modify them for saving to database.
     */
    let form = new FormData(e.target);
    let data = {};
    for (let [key, value] of form.entries()) {
      if (
        key === "" ||
        value === "" ||
        (key === "portfolioImage" && value.name === "")
      ) {
        alert("Please fill the value of : " + key);
        return;
      }

      data[key] = value;
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
    formData.append("details", mail.details);

    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    // return;

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
      setData(res);
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
              ? `Update ${sliceComponentName()} Section Content`
              : `${sliceComponentName()} Section Content`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            {updateBton.display && (
              <Form.Control
                type="text"
                id="_id"
                onChange={handleChange}
                value={mail._id}
                name="_id"
                placeholder="id"
                hidden
              />
            )}
            <Form.Group className="mb-4" controlId="mail.section_title">
              <Form.Label>Section Title</Form.Label>
              <Form.Control
                type="text"
                name="section_title"
                onChange={handleChange}
                value={mail.section_title}
                placeholder="About"
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="mail.top_details">
              <Form.Label>Top Details</Form.Label>
              <Form.Control
                as="textarea"
                row={2}
                name="top_details"
                onChange={handleChange}
                value={mail.top_details}
                placeholder="Type here mail top_details"
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="mail.profession">
              <Form.Label>Profession Title</Form.Label>
              <Form.Control
                type="text"
                name="profession"
                onChange={handleChange}
                value={mail.profession}
                placeholder="Software Engineer, Teacher etc"
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="mail.details">
              <Form.Label>Profession Details</Form.Label>
              <Editor
                initialValue={mail.details}
                name="details"
                init={{
                  height: 200,
                  menubar: true,
                  plugins: [
                    "a11ychecker advcode advlist anchor autolink codesample fullscreen help  tinydrive",
                    " lists link media noneditable powerpaste preview",
                    " searchreplace table template tinymcespellchecker visualblocks wordcount",
                  ],
                  toolbar:
                    "insertfile a11ycheck undo redo | bold italic | forecolor backcolor | template codesample | alignleft aligncenter alignright alignjustify | bullist numlist | link image tinydrive",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  setup: handleDetailsChange,
                }}
              />
            </Form.Group>
            <Row>
              <Col xs={12} sm={6} lg={6}>
                <Form.Group className="mb-4" controlId="mail.portfolioImage">
                  <Form.Label>Portfolio Image</Form.Label>
                  <Form.Control
                    accept=".png, .jpg, .jpeg"
                    name="portfolioImage"
                    onChange={previewImage}
                    type="file"
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={6} lg={6}>
                <Form.Group
                  className="mb-4"
                  controlId="mail.portfolioImagePreview"
                >
                  <img
                    id="previewImage"
                    height="100"
                    width="100"
                    alt={mail.backgroundImage}
                    src={mail.backgroundImage}
                  />
                </Form.Group>
              </Col>
            </Row>
            <button className="azh_btn w-100" type="submit" id="mail.sumbit">
              {updateBton.display ? "Update" : "Submit"}
            </button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
