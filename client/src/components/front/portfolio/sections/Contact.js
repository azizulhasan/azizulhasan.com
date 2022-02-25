import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
/**
 *
 * Utilities
 */
import { getData } from "../../../Context/utilities";

export default function Contact() {
  const [contact, setContact] = useState({});
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  useEffect(() => {
    /**
     * Get data from and display to table.
     */
    getData(process.env.REACT_APP_API_URL + "/api/contact").then((res) => {
      setContact(res.data[0]);
      console.log(res.data[0]);
    });
  }, []);

  /**
   * Create a subjects object from given string which is seperated by "|"
   * @param {subjects} subjects
   * @returns subjectsObj
   */
  const setFormSubjects = (subjects) => {
    let subjectsObj = [];
    if (subjects.indexOf("|") > 0) {
      let stringArr = subjects.trim().split("|");

      for (let i = 0; i < stringArr.length; i++) {
        let key = stringArr[i].trim().replace(/\s/g, "_");
        subjectsObj[key] = stringArr[i];
      }
    } else {
      let key = subjects.trim().replace(/\s/g, "_");
      subjectsObj[key] = subjects;
    }

    return subjectsObj;
  };

  /**
   * Handle content change value.
   * @param {event} e
   */
  const handleChange = (e) => {
    setContactForm({ ...contactForm, ...{ [e.target.name]: e.target.value } });
  };

  const setUpContactTypeData
   = (value) => {
    let contactData = {}
    contactData.className = value.toLowerCase()
    contactData.title = value.charAt(0).toUpperCase()+""+value.slice(1)
    contactData.icon = value === 'Address'? 'geo-alt' : value === 'Email' ? "envelope" : value.toLowerCase()

    return contactData
  }
  return (
    <section id="contact" className="contact">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>{contact.section_title ? contact.section_title : "Contact"}</h2>
        </div>

        <div className="row mt-1">
          <div className="col-lg-4">
            <div className="info">
              {contact.contacts &&
                contact.contacts.map((contact, i) => {
                  return (
                    <div className={setUpContactTypeData
                    (contact[0]).className}>
                      <i className={"bi bi-"+setUpContactTypeData(contact[0]).icon}></i>
                      <h4>{setUpContactTypeData(contact[0]).title}:</h4>
                      <p>{contact[1]}</p>
                    </div>
                  );
                })}
              {/* <div className="address">
                <i className="bi bi-geo-alt"></i>
                <h4>Location:</h4>
                <p>A108 Adam Street, New York, NY 535022</p>
              </div>

              <div className="email">
                <i className="bi bi-envelope"></i>
                <h4>Email:</h4>
                <p>info@example.com</p>
              </div>

              <div className="phone">
                <i className="bi bi-phone"></i>
                <h4>Call:</h4>
                <p>+1 5589 55488 55s</p>
              </div> */}
            </div>
          </div>

          <div className="col-lg-8 mt-5 mt-lg-0">
            <form
              action="forms/contact.php"
              method="post"
              role="form"
              className="php-email-form"
            >
              <div className="row">
                <div className="col-md-6 form-group">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div className="col-md-6 form-group mt-3 mt-md-0">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    placeholder="Your Email"
                    required
                  />
                </div>
              </div>
              <div className="form-group mt-3">
                <Form.Select name="subject" aria-label="Default select example">
                  <option disabled>Open this select menu</option>
                  {contact.subjects &&
                    Object.keys(setFormSubjects(contact.subjects)).map(
                      (subject_key) => {
                        return (
                          <option key={subject_key} value={subject_key}>
                            {setFormSubjects(contact.subjects)[subject_key]}
                          </option>
                        );
                      }
                    )}
                </Form.Select>
              </div>

              <div className="form-group mt-3">
                <textarea
                  className="form-control"
                  name="message"
                  rows="5"
                  placeholder="Message"
                  required
                ></textarea>
              </div>
              <div className="my-3">
                <div className="loading">Loading</div>
                <div className="error-message"></div>
                <div className="sent-message">
                  Your message has been sent. Thank you!
                </div>
              </div>
              <div className="text-center">
                <button type="submit">Send Message</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
