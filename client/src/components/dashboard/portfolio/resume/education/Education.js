import React, { useState, useEffect, useContext } from "react";
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
import { getData, deletePost,STORY_HEADERS } from "./EducationHooks";

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
  // const Env = useContext(EnvContext)

  const setEducationData = (data) => {
    setEducation(data);
  };
/**
 * 
 * @param {value} value true or false.
 * @param {id} id get id if want to edit specific education.
 */
  const modalShow = (value, id = null) => {
    setLgShow(value);
    if (id !== null) {
      setUpdateBtn({ display: true, id: id });
    }else{
      setUpdateBtn({ display: false, id: "" });
    }
  };
/**
 * 
 * @param {id} id get the specific id which want to be deleted.
 */
  const deleteEducation = (id) => {
    alert("Are you sure? It will be permanently deleted.")
    deletePost("http://localhost:4000/api/education/"+id).then(res=>{
      setEducation(res.data);
    }).catch(err=>{
      console.log(err)
    })
  }

  
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
                  className="mr-2"
                    bsPrefix="azh_btn azh_btn_edit"
                    
                    onClick={(e) =>
                      modalShow(true, educations[index]["_id"])
                    }
                  >
                    Edit
                  </Button>
                  <Button
                    bsPrefix="azh_btn btn-danger azh_btn_education"
                    onClick={(e) =>
                      deleteEducation(educations[index]["_id"])
                    }
                  >
                    Delete
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
