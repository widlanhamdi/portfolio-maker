import React from "react";
import { Col, Modal, Row } from "react-bootstrap";
import useFetchAllData from "../hooks/query/useFetchAllData";

export default function ModalBg({ show, setShow, selectedBg, onSelectedBg }) {
  const backgrounds = useFetchAllData("/backgrounds");
  const { data, isLoading } = backgrounds;

  return (
    <Modal size="xl" show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton className="px-5">
        <Modal.Title>Choose Background</Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-5 py-4">
        {isLoading && <p>Loading...</p>}
        <Row className="gy-4">
          {data?.map((item, index) => (
            <Col lg={4} key={index}>
              <label className="bg d-block">
                <input
                  id={item.label}
                  type="radio"
                  value={item.value}
                  checked={selectedBg === item.value}
                  onChange={onSelectedBg}
                />
                <img src={item.value} alt={item.label} className="img-fluid" />
              </label>
            </Col>
          ))}
        </Row>
      </Modal.Body>
    </Modal>
  );
}
