import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import CDC from "../../../assets/cdc.png";

export default function About() {
  return (
    <div id="about" style={{ backgroundColor: "#F2F2F2" }}>
      <Container className="py-5">
        <p className="fw-bold stripe">
          <span>ABOUT</span>
        </p>

        <Row className="justify-content-md-center gy-4 align-items-center">
          <Col lg={6}>
            Welcome to the Career Development Center. We help you prepare for the career of your dreams. We assist you
            in building an attractive and professional online portfolio.
          </Col>
          <Col lg={4}>
            <img src={CDC} alt="cdc" width="400px" />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
