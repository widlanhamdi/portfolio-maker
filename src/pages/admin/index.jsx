import React, { useState } from "react";
import Banner from "../../components/Banner";
import { Col, Container, Form, Row } from "react-bootstrap";
import List from "./components/List";
import Dashboard from "../../components/Dashboard";

export default function ListPortfolio() {
  // Input Search Bar
  const [inputText, setInputText] = useState("");

  const inputHandler = (e) => {
    const lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  return (
    <Container>
      <Banner content="Dashboard E-Portfolio CDC" />
      <Dashboard />

      <Row className="justify-content-center my-4">
        <Col lg={5}>
          <Form.Group className="mb-3">
            <p className="text-center" style={{ color: "#094b72" }}>
              Search Skill
            </p>
            <Form.Control type="text" placeholder="Search..." onChange={inputHandler} />
          </Form.Group>
        </Col>
      </Row>

      <List input={inputText} />
    </Container>
  );
}
