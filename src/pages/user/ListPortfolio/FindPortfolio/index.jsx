import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import useFetchAllData from "../../../../hooks/query/useFetchAllData";
import PreviewPublic from "./PreviewPublic";

export default function FindPortfolio() {
  const portfolios = useFetchAllData("/portfolios");
  const { data } = portfolios;

  // Input Search Bar
  const [input, setInput] = useState("");

  const inputHandler = (e) => {
    const lowerCase = e.target.value.toLowerCase();
    setInput(lowerCase);
  };

  // Search
  const filteredData = data?.filter((item) => {
    const query = input.toLowerCase();

    return item?.skill?.toLowerCase().indexOf(query) >= 0 || item?.major?.toLowerCase().indexOf(query) >= 0;
  });

  // Modal
  const [show, setShow] = useState(false);
  const [portfolio, setPortfolio] = useState(null);

  const handleShow = (data) => {
    setShow(true);
    setPortfolio(data);
  };

  return (
    <div id="student-portofolio" className="my-5">
      <Container className="px-5">
        {/* Search Bar */}
        <Row className="justify-content-center my-3">
          <Col lg={5}>
            <Form.Group className="mb-3">
              <p className="text-center fw-semibold" style={{ color: "#094b72" }}>
                Search Skills
              </p>
              <Form.Control type="text" placeholder="Search..." onChange={inputHandler} />
            </Form.Group>
          </Col>
        </Row>

        {/* List Portfolio */}
        <Row>
          {filteredData?.map((data) => (
            <Col lg={4} className="gy-4" key={data.user_uid}>
              <Card style={{ border: "none" }}>
                <div className="stupo__wrapper">
                  <Card.Img
                    variant="top"
                    src={data.bg}
                    className="rounded"
                    style={{ objectFit: "cover", objectPosition: "bottom", height: "80px" }}
                  />
                  <div className="stupo__overlay stupo__overlay1 rounded" />
                </div>
                <Card.Body className="d-flex">
                  <div className="stupo__round-pict me-4">
                    <img
                      src={data.photo}
                      alt="profile"
                      className="rounded-circle shadow"
                      width="100px"
                      height="100px"
                      style={{ border: "solid 3px #ffffff" }}
                    />
                  </div>
                  <div>
                    <Card.Title style={{ fontSize: "14px" }}>{data?.name}</Card.Title>
                    <Card.Text style={{ fontSize: "12px" }} className="m-0">
                      <span className="fw-semibold">Skills:</span> {data?.skill}.
                    </Card.Text>
                    <Card.Text style={{ fontSize: "12px" }} className="m-0">
                      {data?.major}
                    </Card.Text>
                  </div>
                </Card.Body>
                <hr className="mx-4 mt-0" style={{ height: "2px", backgroundColor: "#ADB5BD", border: "none" }} />
                <div className="d-flex gap-3">
                  <Button className="w-100" onClick={() => handleShow(data)}>
                    Preview Portfolio
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
          <PreviewPublic show={show} setShow={setShow} data={portfolio} />
        </Row>
      </Container>
    </div>
  );
}
