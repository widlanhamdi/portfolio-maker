import React from "react";
import { Container } from "react-bootstrap";
import Stupo from "../../../assets/student-portofolio.png";

export default function StudentPortofolio() {
  return (
    <div id="student-portofolio" className="mb-5">
      <Container className="px-5">
        <h3 className="mb-4">PREVIEW PORTFOLIO</h3>

        <div className="text-center">
          <img src={Stupo} alt="" className="img-fluid" />
        </div>
      </Container>
    </div>
  );
}
