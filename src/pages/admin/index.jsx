import React, { useState } from "react";
import Banner from "../../components/Banner";
import ListPortfolios from "./components/ListPortfolios";
import VisualData from "../../components/VisualData";
import { Col, Container, Form, Row } from "react-bootstrap";

export default function Dashboard() {
  // Input Search Bar
  const [inputText, setInputText] = useState("");

  const inputHandler = (e) => {
    const lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  return (
    <Container>
      <Banner content="Dashboard E-Portfolio CDC" />
      <VisualData />

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

      <ListPortfolios input={inputText} />
    </Container>
  );
}
