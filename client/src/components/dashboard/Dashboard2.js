import React from "react";
import {Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import Sidebar from "./Sidebar";
import './assets/css/Dashboard.css'
const Dashboard2 = props => {
    return (
        <>
         <Container >
                <Row>
                    <Col xs={2} id="sidebar-wrapper">      
                      <Sidebar />
                    </Col>
                    <Col  xs={10} id="page-content-wrapper">
                        this is a test
                    </Col> 
                </Row>

            </Container>
        </>
        );
  };

  export default Dashboard2