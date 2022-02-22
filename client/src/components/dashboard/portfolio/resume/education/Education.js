import React, { useState, useEffect } from "react";
import { Col, Row, Table, Button } from "react-bootstrap";
import {
  DatatableWrapper,
  Filter,
  Pagination,
  PaginationOpts,
  TableBody,
  TableHeader,
} from "react-bs-datatable";
/**
 * Hooks
 */
import { getData, STORY_HEADERS } from "./EducationHooks";

/**
 * Components
 */
import EducationModal from "./EducationModal";
import "./education.css";

// Then, use it in a component.
export default function Education() {
  const [educations, setEducation] = useState([]);
  const [updateBtn, setUpdateBtn] = useState({ display: false, id: "" });
  const [lgShow, setLgShow] = useState(false);

  const setEducationData = (data) => {
    setEducation([data]);
    setUpdateBtn({ display: true, id: data._id });
  };

  const modalShow = (value, id = null) => {
    setLgShow(value);
    console.log(id)
    if (id !== null) {
      setUpdateBtn({ display: true, id: id });
    }
  };

  useEffect(() => {
    /**
     * Get data from and display to table.
     */
    getData("http://localhost:4000/api/education").then((res) => {
      setEducation(res.data);
    });
  }, []);

  return (
    <React.Fragment>
      <Row className="mb-4 p-2">
        <Col
          xs={12}
          lg={2}
          className="d-flex flex-col justify-content-end align-items-start"
        >
          <EducationModal
            updateBtn={updateBtn}
            modalShow={modalShow}
            lgShow={lgShow}
            setEducationData={setEducationData}
          />
        </Col>
        <Col
          xs={12}
          lg={10}
          className="d-flex flex-col justify-content-end align-items-end"
        >
          Filter
        </Col>
      </Row>
      <Table bordered>
        <thead>
          <tr>
            {STORY_HEADERS.map((hearder) => (
              <th key={hearder.prop}>{hearder.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {educations.length &&
            educations.map((education, index) => (
              <tr key={index}>
                {Object.keys(education).map((key) => {
                  if (
                    key === "address" ||
                    key === "degree" ||
                    key === "institution"
                  ) {
                    return (
                      <td
                        key={key}
                        dangerouslySetInnerHTML={{ __html: education[key] }}
                      ></td>
                    );
                  }
                })}
                <td>
                  <Button
                    bsPrefix="azh_btn"
                    onClick={(e) =>
                      modalShow(true, educations[index]["_id"])
                    }
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <Row className="mb-2 p-2">
        <Col
          xs={12}
          sm={6}
          lg={4}
          className="d-flex flex-col justify-content-lg-center align-items-center justify-content-sm-start mb-2 mb-sm-0"
        >
          PaginationOpts{" "}
        </Col>
        <Col
          xs={12}
          sm={6}
          lg={8}
          className="d-flex flex-col justify-content-end align-items-end mb-2"
        >
          Pagination
        </Col>
      </Row>
    </React.Fragment>
  );
}
