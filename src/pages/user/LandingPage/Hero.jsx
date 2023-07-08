import React from "react";
import { Button, Container } from "react-bootstrap";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <Container>
      <div className="mb-5 rounded-3 hero__bg" style={{ backgroundPosition: "center" }}>
        <div className="text-center">
          <h1 className="fw-bold mb-4 hero__spacing" style={{ color: "#094B72" }}>
            Create Your Professional <br /> Portofolio Easily And Quickly
          </h1>
          <h5 className="fw-normal mb-4" style={{ color: "#094B72" }}>
            Presented By Career Development Center
          </h5>
          <Button className="px-3 py-2 text-white" style={{ marginBottom: "120px" }} as={Link} to="/login">
            Create Now <BsArrowRight className="ms-2" />
          </Button>
        </div>
      </div>
    </Container>
  );
}
