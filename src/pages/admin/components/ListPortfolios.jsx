import React, { useState } from "react";
import PreviewPortfolio from "./PreviewPortfolio";
import Swal from "sweetalert2";
import { Button, Card, Col, Row } from "react-bootstrap";
import { db } from "../../../config/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { RiDeleteBinLine } from "react-icons/ri";
import useFetchAllData from "../../../hooks/query/useFetchAllData";

export default function ListPortfolios({ input }) {
  const portfolios = useFetchAllData("/portfolios");
  const { data, isLoading } = portfolios;

  // Modal
  const [show, setShow] = useState(false);
  const [portfolio, setPortfolio] = useState(null);

  const handleShow = (data) => {
    setShow(true);
    setPortfolio(data);
  };

  // Delete Data
  const deleteData = (uid) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(doc(db, "portfolios", uid));
        Swal.fire("Deleted!", "File has been deleted.", "success");
      }
    });
  };

  // Search
  const filteredData = data.filter((item) => {
    if (input === "") {
      return item;
    } else {
      return item.skill.toLowerCase().includes(input);
    }
  });

  return (
    <div>
      {isLoading && <h2 className="text-center mt-5">Loading...</h2>}

      <Row className="justify-content-md-center gy-4 mb-5">
        {filteredData?.map((data) => (
          <Col lg={5} key={data.user_uid}>
            <Card style={{ border: "none" }}>
              <div className="stupo__wrapper">
                <Card.Img
                  variant="top"
                  src={data.bg}
                  className="rounded"
                  style={{ objectFit: "cover", objectPosition: "bottom", height: "80px" }}
                />
                <div className="stupo__overlay stupo__overlay1 rounded" />
              </div>
              <Card.Body className="d-flex">
                <div className="stupo__round-pict me-4">
                  <img
                    src={data.photo}
                    alt="profile"
                    className="rounded-circle shadow"
                    width="100px"
                    height="100px"
                    style={{ border: "solid 3px #ffffff" }}
                  />
                </div>
                <div>
                  <Card.Title style={{ fontSize: "14px" }} className="fw-bold">
                    {data?.name}
                  </Card.Title>
                  <Card.Text style={{ fontSize: "12px" }} className="m-0">
                    <span className="fw-semibold">Skills:</span> {data?.skill}.
                  </Card.Text>
                  <Card.Text style={{ fontSize: "12px" }} className="m-0">
                    {data?.major}
                  </Card.Text>
                </div>
              </Card.Body>
              <hr className="mx-4 mt-0" style={{ height: "2px", backgroundColor: "#ADB5BD", border: "none" }} />
              <div className="d-flex gap-3">
                <Button className="w-100" onClick={() => handleShow(data)}>
                  Preview Portfolio
                </Button>
                <Button variant="danger w-100" onClick={() => deleteData(data.user_uid)}>
                  <RiDeleteBinLine className="mb-1" /> Delete
                </Button>
              </div>
            </Card>
          </Col>
        ))}
        <PreviewPortfolio show={show} setShow={setShow} data={portfolio} />
      </Row>
    </div>
  );
}
