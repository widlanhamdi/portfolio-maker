import React from "react";
import { Col, Row } from "react-bootstrap";
import { FiMail } from "react-icons/fi";
import { BsTelephone } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";
import moment from "moment";
import Watermark from "../assets/watermark.png";

export default function ViewPortofolio({ data }) {
  const {
    bg,
    photo,
    name,
    skill,
    major,
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

  const isEmpty = (value) => value?.every((item) => Object.values(item).every((x) => x === null || x === ""));

  return (
    <div>
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
          <h4 className="fw-bold">{name}</h4>
          <p className="m-0">
            <span className="fw-semibold">Skills:</span> {skill}
          </p>
          <p className="m-0">{major}</p>
        </div>
      </div>

      <div className="mt-5 px-5 pb-2">
        <div style={{ position: "relative" }}>
          <img src={Watermark} alt="Institut Teknologi Garut" className="watermark" />

          <Row>
            <Col lg={4}>
              <div className="mb-5">
                <h4>About Me</h4>
                <hr />
                <p>{about_me}</p>
              </div>
              <div>
                <h4>Social</h4>
                <hr />
                <p>
                  <FiMail className="me-2" />
                  {email}
                </p>
                <p>
                  <BsTelephone className="me-2" />
                  {phone}
                </p>
                <p>
                  <FaInstagram className="me-2" />
                  {socmed}
                </p>
              </div>
            </Col>
            <Col lg={8}>
              {isEmpty(work) ? null : (
                <>
                  <h4>Work Experience</h4>
                  <hr />

                  {work?.map((item, index) => (
                    <div key={index} className="mb-4">
                      <div className="d-flex justify-content-between">
                        <p className="fw-bold">{item.name}</p>
                        <div className="d-flex gap-2">
                          <p>{moment(item.year_starts).format("MMM YYYY")}</p>
                          <p>-</p>
                          <p>{moment(item.year_ends).format("MMM YYYY")}</p>
                        </div>
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
                  <h4>Education</h4>
                  <hr />

                  {education?.map((item, index) => (
                    <div key={index} className="mb-4">
                      <div className="d-flex justify-content-between">
                        <p className="fw-bold">{item.name}</p>
                        <div className="d-flex gap-2">
                          <p>{moment(item.year_starts).format("MMM YYYY")}</p>
                          <p>-</p>
                          <p>{moment(item.year_ends).format("MMM YYYY")}</p>
                        </div>
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
                  <h4>Organization</h4>
                  <hr />

                  {organization?.map((item, index) => (
                    <div key={index} className="mb-4">
                      <div className="d-flex justify-content-between">
                        <p className="fw-bold">{item.name}</p>
                        <div className="d-flex gap-2">
                          <p>{moment(item.year_starts).format("MMM YYYY")}</p>
                          <p>-</p>
                          <p>{moment(item.year_ends).format("MMM YYYY")}</p>
                        </div>
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
                  <h4>Achievments</h4>
                  <hr />

                  {achievments?.map((item, index) => (
                    <div key={index} className="mb-4">
                      <div className="d-flex justify-content-between">
                        <p className="fw-bold">{item.name}</p>
                        <div className="d-flex gap-2">
                          <p>{moment(item.year).format("MMM YYYY")}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {isEmpty(projects) ? null : (
                <>
                  <h4>Projects</h4>
                  <hr />

                  {projects?.map((item, index) => (
                    <div key={index}>
                      <div className="d-flex justify-content-between">
                        <p className="fw-bold">{item.name}</p>
                        <div className="d-flex gap-2">
                          <p>{moment(item.year).format("MMM YYYY")}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </Col>
          </Row>
        </div>

        {isEmpty(achievments) ? null : (
          <>
            <hr />

            <h4 className="mb-4">Achievment</h4>

            {achievments?.map((item, index) => (
              <div key={index} className="mb-4">
                <img src={item.file.url} alt="" width="100%" style={{ objectFit: "cover" }} />
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
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
