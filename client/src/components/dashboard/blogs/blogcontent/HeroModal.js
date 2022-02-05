import React, {useState} from "react";
import { Button , Modal, } from "react-bootstrap";


export default function HeroModal(props) {
    const [lgShow, setLgShow] = useState(false);
  
    return (
      <>
        <Button bsPrefix="azh_btn" onClick={() => setLgShow(true)}>Add Blog</Button>
        <Modal
          size="lg"
          show={lgShow}
          onHide={() => setLgShow(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              Large Modal
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>...</Modal.Body>
        </Modal>
      </>
    );
  }

