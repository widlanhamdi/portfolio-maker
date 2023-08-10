import React, { useState } from "react";
import * as htmlToImage from "html-to-image";
import jsPDF from "jspdf";
import ViewPortofolio from "../../../components/ViewPortofolio";
import { Button, Modal } from "react-bootstrap";
import { BsDownload } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function PreviewPortfolio({ data, setShow, show }) {
  const [isLoading, setIsLoading] = useState(false);

  const eksportPDF = () => {
    try {
      setIsLoading(true);
      htmlToImage.toCanvas(document.getElementById("pdf"), { quality: 1 }).then(function (canvas) {
        if (canvas.width > canvas.height) {
          const dataUrl = canvas.toDataURL("image/png");
          const pdf = new jsPDF("l", "pt", [canvas.width, canvas.height]);
          pdf.addImage(dataUrl, "PNG", 0, 0, canvas.width, canvas.height, null, "FAST");
          pdf.save("portfolio.pdf");
          setIsLoading(false);
        } else {
          const dataUrl = canvas.toDataURL("image/png");
          const pdf = new jsPDF("p", "pt", [canvas.width, canvas.height]);
          pdf.addImage(dataUrl, "PNG", 0, 0, canvas.width, canvas.height, null, "FAST");
          pdf.save("portfolio.pdf");
          setIsLoading(false);
        }
      });
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  return (
    <Modal size="xl" show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Preview Portofolio</Modal.Title>
      </Modal.Header>
      <Modal.Body id="pdf" style={{ zIndex: "0" }}>
        <ViewPortofolio data={data} />
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex gap-3 mx-auto">
          <Button
            variant="outline-primary"
            className="text-link px-5"
            as={Link}
            to={`/portfolio/${data?.user_uid}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Portfolio
          </Button>

          <Button className="px-5" onClick={eksportPDF} disabled={isLoading}>
            {isLoading ? (
              "Downloading..."
            ) : (
              <>
                <BsDownload className="me-2" />
                Eksport PDF
              </>
            )}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
