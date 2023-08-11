import React from "react";
import Ilustration from "../assets/ilustration-dashboard.png";
import useFetchAllData from "../hooks/query/useFetchAllData";
import { Col, Row } from "react-bootstrap";
import { AiOutlineFileText, AiOutlineUser } from "react-icons/ai";

export default function VisualData() {
  const users = useFetchAllData("/users");
  const { data: user } = users;

  const informaticsEngineeringUser = user?.filter((item) => {
    return (
      item?.program_studi?.indexOf("Teknik Informatika (S1)") >= 0 ||
      item?.program_studi?.indexOf("T. Informatika") >= 0
    );
  });

  const civilEngineeringUser = user?.filter((item) => {
    return item?.program_studi?.indexOf("Teknik Sipil (S1)") >= 0 || item?.program_studi?.indexOf("T. Sipil") >= 0;
  });

  const industrialEngineeringUser = user?.filter((item) => {
    return (
      item?.program_studi?.indexOf("Teknik Industri (S1)") >= 0 || item?.program_studi?.indexOf("T. Industri") >= 0
    );
  });

  const architectureUser = user?.filter((item) => {
    return item?.program_studi?.indexOf("Arsitektur (S1)") >= 0 || item?.program_studi?.indexOf("Arsitektur") >= 0;
  });

  const informationSystemsUser = user?.filter((item) => {
    return (
      item?.program_studi?.indexOf("Sistem Informasi (S1)") >= 0 ||
      item?.program_studi?.indexOf("Sistem Informasi") >= 0
    );
  });

  const portfolios = useFetchAllData("/portfolios");
  const { data: portfolio } = portfolios;

  const informaticsEngineeringPortfolio = portfolio?.filter((item) => {
    return item?.major?.indexOf("Teknik Informatika (S1)") >= 0 || item?.major?.indexOf("T. Informatika") >= 0;
  });

  const civilEngineeringPortfolio = portfolio?.filter((item) => {
    return item?.major?.indexOf("Teknik Sipil (S1)") >= 0 || item?.major?.indexOf("T. Sipil") >= 0;
  });

  const industrialEngineeringPortfolio = portfolio?.filter((item) => {
    return item?.major?.indexOf("Teknik Industri (S1)") >= 0 || item?.major?.indexOf("T. Industri") >= 0;
  });

  const architecturePortfolio = portfolio?.filter((item) => {
    return item?.major?.indexOf("Arsitektur (S1)") >= 0 || item?.major?.indexOf("Arsitektur") >= 0;
  });

  const informationSystemsPortfolio = portfolio?.filter((item) => {
    return item?.major?.indexOf("Sistem Informasi (S1)") >= 0 || item?.major?.indexOf("Sistem Informasi") >= 0;
  });

  return (
    <>
      {/* By Major */}
      <Row className="d-flex justify-content-center mt-5">
        <Col lg={2}>
          <p style={{ color: "#525665" }} className="fw-semibold">
            Informatics Engineering
          </p>
          <hr />
          <p className="text-primary-color">
            <AiOutlineUser className="me-2 mb-1" /> {informaticsEngineeringUser.length} Users
          </p>
          <p className="text-primary-color">
            <AiOutlineFileText className="me-2 mb-1" /> {informaticsEngineeringPortfolio.length} E-portfolios
          </p>
        </Col>
        <Col lg={2}>
          <p style={{ color: "#525665" }} className="fw-semibold">
            Civil Engineering
          </p>
          <hr />
          <p className="text-primary-color">
            <AiOutlineUser className="me-2 mb-1" /> {civilEngineeringUser.length} Users
          </p>
          <p className="text-primary-color">
            <AiOutlineFileText className="me-2 mb-1" /> {civilEngineeringPortfolio.length} E-portfolios
          </p>
        </Col>
        <Col lg={2}>
          <p style={{ color: "#525665" }} className="fw-semibold">
            Industrial Engineering
          </p>
          <hr />
          <p className="text-primary-color">
            <AiOutlineUser className="me-2 mb-1" /> {industrialEngineeringUser.length} Users
          </p>
          <p className="text-primary-color">
            <AiOutlineFileText className="me-2 mb-1" /> {industrialEngineeringPortfolio.length} E-portfolios
          </p>
        </Col>
        <Col lg={2}>
          <p style={{ color: "#525665" }} className="fw-semibold">
            Architecture
          </p>
          <hr />
          <p className="text-primary-color">
            <AiOutlineUser className="me-2 mb-1" /> {architectureUser.length} Users
          </p>
          <p className="text-primary-color">
            <AiOutlineFileText className="me-2 mb-1" /> {architecturePortfolio.length} E-portfolios
          </p>
        </Col>
        <Col lg={2}>
          <p style={{ color: "#525665" }} className="fw-semibold">
            Information Systems
          </p>
          <hr />
          <p className="text-primary-color">
            <AiOutlineUser className="me-2 mb-1" /> {informationSystemsUser.length} Users
          </p>
          <p className="text-primary-color">
            <AiOutlineFileText className="me-2 mb-1" /> {informationSystemsPortfolio.length} E-portfolios
          </p>
        </Col>
      </Row>

      {/* All Major */}
      <div className="d-flex justify-content-center align-items-center gap-5 my-5">
        <img src={Ilustration} alt="ilustration" className="img-fluid" width="150px" />
        <div className="text-center" style={{ color: "#094b72" }}>
          <p className="display-3">{users?.data?.length}</p> {/* fetching data */}
          <p className="fw-semibold">Total Users</p>
        </div>
        <div className="text-center" style={{ color: "#094b72" }}>
          <p className="display-3">{portfolios?.data?.length}</p> {/* fetching data */}
          <p className="fw-semibold">Already Created E-Portfolio</p>
        </div>
      </div>
      <hr />
    </>
  );
}
