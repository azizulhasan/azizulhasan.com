import React, { useState, useEffect } from "react";
import { Col, Row, Table } from "react-bootstrap";
import {
  DatatableWrapper,
  Filter,
  Pagination,
  PaginationOpts,
  TableBody,
  TableHeader,
} from "react-bs-datatable";
import axios from "axios";
/**
 * Hooks
 */
import { getData } from "../../../hooks/hooks";

/**
 * Components
 */
import HeroModal from "./HeroModal";

// Create table headers consisting of 4 columns.
const STORY_HEADERS = [
  {
    prop: "title",
    title: "Title",
    isFilterable: true,
  },
  {
    prop: "profession",
    title: "Profession",
  },
  {
    prop: "backgroundImage",
    title: "backgroundImage",
  },
  {
    prop: "backgroundImageOpacity",
    title: "backgroundImageOpacity",
  },
];

// Then, use it in a component.
export default function Hero() {
  const [hero, setHero] = useState([]);
  const [updateBton, setUpdateBtn] = useState({ display: false, id: "" });

  const setHeroData = (data) => {
    setHero([data]);
    setUpdateBtn({ display: true, id: data._id });
    console.log(data);
  };
  useEffect(() => {
    axios("http://localhost:4000/api/hero")
      .then((result) => {
        setHero(result.data.data);
        if (result.data.data.length > 0) {
          setTimeout(()=> setUpdateBtn({ display: true, id: result.data.data[0]._id }), 100)
        }

        console.log(updateBton);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <DatatableWrapper
      body={hero}
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
          <HeroModal updateBton={updateBton} setHeroData={setHeroData} />
        </Col>
        <Col
          xs={12}
          lg={10}
          className="d-flex flex-col justify-content-end align-items-end"
        >
          <Filter />
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
