import React, { useState } from "react";
import { BiEdit, BiLockOpenAlt } from "react-icons/bi";
import { BsDownload, BsFiles, BsUpload } from "react-icons/bs";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import * as htmlToImage from "html-to-image";
import Cookies from "js-cookie";
import jsPDF from "jspdf";
import Swal from "sweetalert2";
import ViewPortofolio from "../../components/ViewPortofolio";
import useFetchDataById from "../../hooks/query/useFetchDataById";
import ModalChangePassword from "../../components/ModalChangePassword";

export default function Profile() {
  const navigate = useNavigate();
  const uid = Cookies.get("uid");

  // get data
  const portfolio = useFetchDataById("portfolios", uid);
  const { data, isLoading } = portfolio;

  const [isLoadingEksport, setIsLoadingEksport] = useState(false);

  // export
  const eksportPDF = () => {
    try {
      setIsLoadingEksport(true);
      htmlToImage.toCanvas(document.getElementById("pdf"), { quality: 1 }).then(function (canvas) {
        if (canvas.width > canvas.height) {
          const dataUrl = canvas.toDataURL("image/png");
          const pdf = new jsPDF("l", "pt", [canvas.width, canvas.height]);
          pdf.addImage(dataUrl, "PNG", 0, 0, canvas.width, canvas.height, null, "FAST");
          pdf.save("portofolio.pdf");
          setIsLoadingEksport(false);
        } else {
          const dataUrl = canvas.toDataURL("image/png");
          const pdf = new jsPDF("p", "pt", [canvas.width, canvas.height]);
          pdf.addImage(dataUrl, "PNG", 0, 0, canvas.width, canvas.height, null, "FAST");
          pdf.save("portofolio.pdf");
          setIsLoadingEksport(false);
        }
      });
    } catch (err) {
      setIsLoadingEksport(false);
      console.log(err);
    }
  };

  // toast
  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-start",
    showConfirmButton: false,
  });

  // copy clip to clip board
  const copyToClipboard = () => {
    try {
      navigator.clipboard.writeText(`https://cdc-e-portfolio-maker.netlify.app/portfolio/${uid}`);
      Toast.fire({
        title: "Link Portfolio Copied",
        color: "#ffffff",
        background: "#1e1e1e",
        timer: 2000,
      });
    } catch (err) {
      Toast.fire({
        title: "Failed to Copy!",
        timer: 3000,
      });
    }
  };

  // Modal
  const [show, setShow] = useState(false);

  return (
    <>
      <hr className="mt-0 mb-4" />
      <Container>
        <Row>
          <Col lg={3}>
            <h5 className="fw-bold mb-4">PROFILE</h5>
            <div className="mb-4">
              <p className="m-0">Hi, {Cookies.get("name")}</p>
              <p style={{ fontSize: "14px" }}>{Cookies.get("email")}</p>
            </div>
            <Button
              className="d-block text-white mb-3 py-2 w-100"
              onClick={() =>
                navigate("/edit-portfolio", {
                  state: data,
                })
              }
              disabled={data === undefined || isLoading}
            >
              <BiEdit size={20} className="me-2" />
              Edit Portfolio
            </Button>

            <Button
              variant="outline-primary mb-3 py-2 w-100"
              onClick={() => copyToClipboard()}
              disabled={data === undefined}
            >
              <BsFiles size={20} className="me-2" />
              Copy Link Portfolio
            </Button>

            <Button variant="outline-primary py-2 w-100" onClick={() => setShow(true)}>
              <BiLockOpenAlt size={20} className="me-2" />
              Change Password
            </Button>
          </Col>
          <Col lg={9}>
            <h5 className="fw-bold mb-4">PREVIEW PORTFOLIO</h5>
            {data === undefined ? (
              <div className="text-center my-5">
                <p>You haven't created a portfolio yet</p>
                <Button as={Link} to="/create-portfolio" className="text-white">
                  + Create Portfolio
                </Button>
              </div>
            ) : (
              <>
                {isLoading ? (
                  <p className="text-center my-5">Loading...</p>
                ) : (
                  <>
                    <div className="shadow mb-4" id="pdf">
                      <ViewPortofolio data={data} />
                    </div>

                    <div className="d-flex gap-4 mx-5 mb-3">
                      <Button
                        className="py-2 w-100 text-white"
                        as={Link}
                        to={`/portfolio/${uid}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <BsUpload className="me-2" />
                        View Yours Portfolio
                      </Button>
                      <Button variant="outline-primary py-2 w-100" onClick={eksportPDF} disabled={isLoadingEksport}>
                        {isLoadingEksport ? (
                          "Downloading..."
                        ) : (
                          <>
                            <BsDownload className="me-2" />
                            Export to PDF
                          </>
                        )}
                      </Button>
                    </div>
                  </>
                )}
              </>
            )}
          </Col>
        </Row>
      </Container>
      <ModalChangePassword show={show} setShow={setShow} />

      <hr />
      <p className="text-center text-black-50">© 2023 Career Development Center ITG</p>
    </>
  );
}
