import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import * as api from "../API/api";
import swal from "sweetalert";

function Delete({ customerID, handleConformRequest }) {
  const [show, setShow] = useState(false);
  const [customerDelete, setCustomerDelete] = useState("");

  const handleClose = () => {
    setShow(false);
    if (customerDelete) {
      //console.log(customerDelete, "check");
      api
        .deleteUser(customerDelete)
        .then((result) => {
          //console.log(result);
          swal({
            title: result,
            icon: "success",
            buttons: true,
          }).then(() => {
            handleConformRequest();
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const handleShow = () => setShow(true);

  useEffect(() => {
    setCustomerDelete(customerID);
  }, [customerID]);

  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        style={{
          color: "#343a40",
          backgroundColor: "unset",
          borderColor: "white",
        }}
      >
        <FontAwesomeIcon icon={faTrash} />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, do you really want to delete this user!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Delete;
