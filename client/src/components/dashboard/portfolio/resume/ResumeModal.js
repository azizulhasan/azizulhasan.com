import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import {
  getData,
  postData,
  getIframeContent
} from "./ResumeHooks";
import { Editor } from "@tinymce/tinymce-react";
/**
 * Css
 */
import "./resume.css";

export default function ResumeModal({ setAboutData, updateBton }) {
  const [lgShow, setLgShow] = useState(false);
  const [resume, setData] = useState({
    _id: "",
    details: "",
    name: "",
    summery: ""
  });


  /**
   * Handle content change value.
   * @param {event} e
   */
  const handleChange = (e) => {
    setData({ ...resume, ...{ [e.target.name]: e.target.value } });
  };
  /**
   * Handle resume content form submission
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
        value === ""
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

    formData.append("summery", getIframeContent());
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    return;

    /**
     * Update data if "_id" exists. else save form data.
     */
    if (data._id !== undefined) {
      postData("http://localhost:4000/api/resume/" + data._id, formData)
        .then((res) => {
          setAboutData(res);
          setLgShow(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      postData("http://localhost:4000/api/resume", formData)
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
  const getResumeContent = (id) => {
    getData("http://localhost:4000/api/resume/" + id).then((res) => {
      setData(res);
      setLgShow(true);
    });
  };
  return (
    <>
      {updateBton.display ? (
        <Button
          bsPrefix="azh_btn"
          onClick={(e) => getResumeContent(updateBton.id)}
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
              ? "Update Section Content"
              : "Resume Section Content"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {updateBton.display && (
              <Form.Control
                type="text"
                id="_id"
                onChange={handleChange}
                value={resume._id}
                name="_id"
                placeholder="id"
                hidden
              />
            )}
            <Form.Group className="mb-4" controlId="resume.details">
              <Form.Label>Details</Form.Label>
              <Form.Control
                as="textarea"
                row={2}
                name="details"
                onChange={handleChange}
                value={resume.details}
                placeholder="Details"
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="resume.name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                onChange={handleChange}
                value={resume.name}
                placeholder="name"
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="resume.summery">
              <Form.Label>Summery</Form.Label>
              <Editor
               initialValue={resume.summery}
               name = "summery"
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
                }}
              />
            </Form.Group>
            <button className="azh_btn w-100" type="submit" id="resume.sumbit">
              {updateBton.display ? "Update" : "Submit"}
            </button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
