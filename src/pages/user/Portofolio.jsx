import React from "react";
import useFetchDataById from "../../hooks/query/useFetchDataById";
import { BsTelephone } from "react-icons/bs";
import { Col, Container, Row } from "react-bootstrap";
import { FaInstagram } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { useParams } from "react-router-dom";

export default function Portofolio() {
  const { id } = useParams();

  const portfolio = useFetchDataById("portfolios", id);
  const { data, isLoading } = portfolio;

  const {
    bg,
    photo,
    name,
    skill,
    about_me,
    email,
    phone,
    socmed,
    achievments,
    work,
    education,
    organization,
    projects,
  } = data;

  // isEmpty
  const isEmpty = (value) => value?.every((item) => Object.values(item).every((x) => x === null || x === ""));

  return (
    <Container>
      {isLoading ? (
        <h1 className="text-center mt-5">Loading...</h1>
      ) : (
        <div className="shadow">
          <div>
            <img src={bg} alt="" width="100%" />
          </div>

          <div className="d-flex ms-5">
            <div className="editporto__round-pict">
              <img
                src={photo}
                alt=""
                className="rounded-circle shadow"
                width="150px"
                height="150px"
                style={{ border: "solid 5px #ffffff" }}
              />
            </div>
            <div className="mt-3 ms-3">
              <h4>{name}</h4>
              <p>{skill}</p>
            </div>
          </div>

          <div className="px-5 pb-2">
            <hr />

            <Row className="mb-4">
              <Col lg={3}>
                <h5>About Me</h5>
              </Col>
              <Col lg={9}>{about_me}</Col>
            </Row>

            <Row>
              <Col>
                <FiMail className="me-2" />
                {email}
              </Col>
              <Col>
                <BsTelephone className="me-2" />
                {phone}
              </Col>
              <Col>
                <FaInstagram className="me-2" />
                {socmed}
              </Col>
            </Row>

            {isEmpty(work) ? null : (
              <>
                <hr />

                <h4 className="mb-4">Work Experience</h4>

                {work?.map((item, index) => (
                  <div key={index} className="mb-4">
                    <div className="d-flex justify-content-between">
                      <p className="fw-bold">{item.name}</p>
                      <p>{item.year}</p>
                    </div>

                    <div className="d-flex justify-content-between">
                      <p>
                        {item.company} | {item.location}
                      </p>
                    </div>
                  </div>
                ))}
              </>
            )}

            {isEmpty(education) ? null : (
              <>
                <hr />

                <h4 className="mb-4">Education</h4>

                {education?.map((item, index) => (
                  <div key={index} className="mb-4">
                    <div className="d-flex justify-content-between">
                      <p className="fw-bold">{item.name}</p>
                      <p>{item.year}</p>
                    </div>

                    <div className="d-flex justify-content-between">
                      <p>{item.study}</p>
                    </div>
                  </div>
                ))}
              </>
            )}

            {isEmpty(organization) ? null : (
              <>
                <hr />

                <h4 className="mb-4">Organization</h4>

                {organization?.map((item, index) => (
                  <div key={index} className="mb-4">
                    <div className="d-flex justify-content-between">
                      <p className="fw-bold">{item.name}</p>
                      <p>{item.year}</p>
                    </div>

                    <div className="d-flex justify-content-between">
                      <p>{item.role}</p>
                    </div>
                  </div>
                ))}
              </>
            )}

            {isEmpty(achievments) ? null : (
              <>
                <hr />

                <h4 className="mb-4">Achievment</h4>

                {achievments?.map((item, index) => (
                  <div key={index} className="mb-4">
                    <img src={item.file.url} alt="" width="100%" style={{ objectFit: "cover" }} />
                    <div className="d-flex justify-content-between mt-3">
                      <p>{item.name}</p>
                      <p>{item.year}</p>
                    </div>
                  </div>
                ))}
              </>
            )}

            {isEmpty(projects) ? null : (
              <>
                <hr />

                <h4 className="mb-4">Projects</h4>

                {projects?.map((item, index) => (
                  <div key={index} className="mb-4">
                    <img src={item.file.url} alt="" width="100%" style={{ objectFit: "cover" }} />

                    <div className="d-flex justify-content-between mt-3">
                      <p>{item.name}</p>
                      <p>{item.year}</p>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </Container>
  );
}
