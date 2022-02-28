import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function WelComeModal({ welcomeModalShow, isWelcomeModalShow }) {
  return (
    <Modal
      size="lg"
      show={isWelcomeModalShow}
      onHide={(e) => welcomeModalShow(false)}
      centered
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={(e) => welcomeModalShow(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
