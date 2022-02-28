import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";

import { Editor } from "@tinymce/tinymce-react";

import { getData, postData, getIframeContent } from "./MailHooks";
import { sliceComponentName } from "../../Context/utilities";
// import { sliceComponentName } from "../../../Context/utilities";

export default function MailModal({
  setMailData,
  updateBtn,
  modalShow,
  lgShow,
}) {
  const [mail, setData] = useState({
    _id: "",
    name: "",
    email: "",
    subject: "",
    message: "",
    address: {
      continent : "",
      countryName: "",
      locality: "",
      principalSubdivision: "",
      city: ""
    }
  });

  useEffect(() => {
    if (lgShow === true) {
      if (updateBtn.id !== "") {
        getMailContent(updateBtn.id);
      } else {
        setData({
          _id: "",
          name: "",
          email: "",
          subject: "",
          message: "",
          address: {
            continent : "",
            countryName: "",
            locality: "",
            principalSubdivision: "",
            city: ""
          }
        });
      }
    }
  }, [lgShow]);

  /**
   * get mail content by id.
   * @param {id} id
   */
  const getMailContent = (id) => {
    getData(process.env.REACT_APP_API_URL + "/api/contact_form/" + id)
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  /**
   * Handle content change value.
   * @param {event} e
   */
  const handleChange = (e) => {
    setData({ ...mail, ...{ [e.target.name]: e.target.value } });
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
      if (key === "" || value === "") {
        alert("Please fill the value of : " + key);
        return;
      }
      data[key] = value;
    }
    data["details"] = getIframeContent();

    // console.log(data)
    // return
    /**
     * Update data if "_id" exists. else save form data.
     */
    if (data._id !== undefined) {
      postData(process.env.REACT_APP_API_URL + "/api/mail/" + data._id, data)
        .then((res) => {
          setMailData(res.data);
          modalShow(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      postData(process.env.REACT_APP_API_URL + "/api/mail", data)
        .then((res) => {
          setMailData(res.data);
          modalShow(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <>
      <Modal
        size="lg"
        show={lgShow}
        onHide={(e) => modalShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >

        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            {updateBtn.display
              ? `Update ${sliceComponentName()} Section Content`
              : `${sliceComponentName()} Section Content`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
              <h4>Sender : {mail.name}{" "}{mail.address !== undefined ?+ " From : "+ mail.address.locality +", "+ mail.address.city + ", "+ mail.address.countryName : ""}</h4> 
              <h4>Email : {mail.email}</h4>
              <h4>Subject : {mail.subject}</h4> 
              <div>
              <h4>Message : </h4>
              <p>{mail.message}</p>
              </div>

        </Modal.Body>
      </Modal>
    </>
  );
}
