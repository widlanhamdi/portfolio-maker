import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import React, { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { auth } from "../config/firebase";
import Swal from "sweetalert2";

export default function ModalChangePassword({ show, setShow }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const onOldPassword = (e) => setOldPassword(e.target.value);
  const onNewPassword = (e) => setNewPassword(e.target.value);

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const credential = EmailAuthProvider.credential(auth.currentUser.email, oldPassword);

      await reauthenticateWithCredential(auth.currentUser, credential);

      await updatePassword(auth.currentUser, newPassword).then(
        Swal.fire({
          text: "Change Password Successfully",
          title: "Success!",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        })
      );
    } catch (err) {
      console.log(err);
      if (err.code === "auth/wrong-password") {
        return Swal.fire("Something Error!", "Old password is wrong!", "error");
      }
      Swal.fire("Something Error!", `${err}`, "error");
    }
  };

  return (
    <Modal size="xl" show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton className="px-5">
        <Modal.Title>Change Password</Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-5 py-5">
        <Row className="justify-content-center mb-4">
          <Form.Group as={Col} lg={4}>
            <Form.Label>Old Password</Form.Label>
            <Form.Control type="text" placeholder="Enter Old Password" onChange={onOldPassword} />
          </Form.Group>

          <Form.Group as={Col} lg={4}>
            <Form.Label>New Password</Form.Label>
            <Form.Control type="text" placeholder="Enter New Password" onChange={onNewPassword} />
          </Form.Group>
        </Row>
        <Row className="justify-content-center">
          <Col lg={4}>
            <Button className="w-100" onClick={handleClick}>
              Save Changes
            </Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}
