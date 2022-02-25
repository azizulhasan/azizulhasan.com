import React, { useState, useEffect } from "react";
import { Col, Row, Table } from "react-bootstrap";
import {
    DatatableWrapper,
    Filter,
    Pagination,
    PaginationOpts,
    TableBody,
    TableHeader
  } from "react-bs-datatable";
/**
 * Hooks
 */
import { getData , STORY_HEADERS} from "./MailHooks";

/**
 * Components
 */
import MailModal from "./MailModal";

// Then, use it in a component.
export default function Mail() {
  const [mail, setMail] = useState([]);
  const [updateBton, setUpdateBtn] = useState({ display: false, id: "" });

  const setMailData = (data) => {
    setMail([data]);
    setUpdateBtn({ display: true, id: data._id });
  };
  useEffect(() => {
      /**
       * Get data from and display to table.
       */
      getData("http://localhost:4000/api/contact_form").then(res=>{
        setMail(res.data);
        console.log(res.data)
        if (res.data.length > 0) {
          setTimeout(()=> setUpdateBtn({ display: true, id: res.data[0]._id }), 100)
        }
      })
  }, []);

  return (
    <DatatableWrapper
      body={mail}
      headers={STORY_HEADERS}
      paginationOptionsProps={{
        initialState: {
          rowsPerPage: 10,
          options: [5, 10, 15, 20],
        },
      }}
    >
      <Row className="mb-4 p-2">
        <Col
          xs={12}
          lg={2}
          className="d-flex flex-col justify-content-end align-items-start"
        >
          {/* <MailModal updateBton={updateBton} setMailData={setMailData} /> */}
        </Col>
        <Col
          xs={12}
          lg={10}
          className="d-flex flex-col justify-content-end align-items-end"
        >
          {/* <Filter  bsPrefix="azh_btn"  /> */}
        </Col>
      </Row>
      <Table>
        <TableHeader tableHeaders={STORY_HEADERS} />
        <TableBody />
      </Table>
      <Row className="mb-2 p-2">
        <Col
          xs={12}
          sm={6}
          lg={4}
          className="d-flex flex-col justify-content-lg-center align-items-center justify-content-sm-start mb-2 mb-sm-0"
        >
          <PaginationOpts />
        </Col>
        <Col
          xs={12}
          sm={6}
          lg={8}
          className="d-flex flex-col justify-content-end align-items-end mb-2"
        >
          <Pagination />
        </Col>
      </Row>
    </DatatableWrapper>
  );
}
