import React from "react";
import { Container } from "react-bootstrap";

export default function Banner({ content }) {
  return (
    <Container>
      <div className="mb-3 text-center rounded-3 hero__bg">
        <h1 className="fw-semibold banner__spacing" style={{ color: "#094B72" }}>
          {content}
        </h1>
      </div>
    </Container>
  );
}
