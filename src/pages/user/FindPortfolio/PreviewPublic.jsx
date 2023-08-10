import React from "react";
import { Button, Modal } from "react-bootstrap";
import { AiOutlineWhatsApp } from "react-icons/ai";
import ViewPublic from "./ViewPublic";
import { Link } from "react-router-dom";

export default function PreviewPortfolio({ data, show, setShow }) {
  return (
    <Modal size="xl" show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Preview Portofolio</Modal.Title>
      </Modal.Header>
      <Modal.Body id="pdf">
        <ViewPublic data={data} />
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex gap-3 mx-auto p-3">
          <Button
            className="text-link px-5"
            as={Link}
            to={`https://wa.me/${data?.phone}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiOutlineWhatsApp className="mb-1 me-3" size="20px" />
            Contact the owner for more details
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
