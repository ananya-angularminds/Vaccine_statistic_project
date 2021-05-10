import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Dropdown, Form, Modal, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import * as api from "../API/api";
import swal from "sweetalert";

function Edit({ singleCustomer, handleConformRequest }) {
  const [show, setShow] = useState(false);
  const [fname, setFname] = useState("");
  const [lname, setlname] = useState("");
  const [bio, setbio] = useState("");
  const [dob, setdob] = useState("");
  const [status, setStatus] = useState("");
  const [org, setOrg] = useState("");
  const [editId, setEditId] = useState("");

  function handleClose() {
    setShow(false);
    handleConformRequest("CLOSE");
  }
  const handleShow = () => setShow(true);

  const [singleData, setSingleData] = useState("");

  useEffect(() => {
    //console.log(singleCustomer, "in UI component");
    setSingleData(singleCustomer);
    if (singleCustomer) {
      const date = new Date(singleCustomer.dob);
      const finalDate =
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      setFname(singleCustomer.fname);
      setlname(singleCustomer.lname);
      setbio(singleCustomer.bio);
      setdob(finalDate);
      setStatus(singleCustomer.status);
      setOrg(singleCustomer.org);
      setEditId(singleCustomer._id);
    }
  }, [singleCustomer]);

  const handleSubmit = () => {
    console.log(fname, lname, bio, dob, status, org, "submit handler");

    const payload = {
      fname: fname,
      lname: lname,
      bio: bio,
      dob: dob,
      org: org,
      status: status,
      id: editId,
    };
    api
      .updateUser(payload)
      .then((result) => {
        //console.log(result);
        setShow(false);

        swal({
          title: result,
          icon: "success",
          buttons: true,
        }).then((willDelete) => {
          handleConformRequest("UPDATED");
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSelectValue = (e) => {
    console.log(e.target.value);
    setOrg(e.target.value);
  };

  const selectedState = (e) => {
    setStatus(e.target.value);
  };

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
        <FontAwesomeIcon icon={faEdit} />
      </Button>

      <Modal show={show} onHide={handleClose}>
        {singleCustomer != null ? (
          <Modal.Body className={status} closeButton>
            <Modal.Title>{fname + " " + lname}</Modal.Title>
            {/* first name */}
            <Form.Group controlId="formBasicEmail">
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                value={fname}
                onChange={(e) => {
                  setFname(e.target.value);
                }}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            {/* last name */}
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                name="lname"
                value={lname}
                onChange={(e) => {
                  setlname(e.target.value);
                }}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            {/* occupation */}
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Occupation</Form.Label>

              <select
                onChange={onSelectValue}
                className="form-control"
                id="rawMaterial"
              >
                <option>{org}</option>
                <option
                  value="Employed"
                  name="Employed"
                  id="Employed"
                  key="Employed"
                >
                  Employed
                </option>
                <option
                  value="Business"
                  name="Business"
                  id="Business"
                  key="Business"
                >
                  Business
                </option>
                <option
                  value="Student"
                  name="Student"
                  id="Student"
                  key="Student"
                >
                  Student
                </option>
              </select>
            </Form.Group>

            {/* date of birth */}
            <Form.Group controlId="formBasicEmail">
              <Form.Label>
                Date of birth{" "}
                <span style={{ color: "#ff6666" }}>[selected date {dob}]</span>
              </Form.Label>
              <Form.Control
                type="date"
                placeholder={dob}
                name="dob"
                value={dob}
                onChange={(e) => setdob(e.target.value)}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            {/* bio */}
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Bio"
                name="bio"
                value={bio}
                onChange={(e) => {
                  setbio(e.target.value);
                }}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            {/* active status */}
            <fieldset>
              <Form.Group as={Row}>
                <Form.Label as="legend" column sm={2}>
                  Vaccinated
                </Form.Label>
                <Col sm={10}>
                  <Form.Check
                    type="radio"
                    label="Yes"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios1"
                    value="Active"
                    onClick={selectedState}
                  />
                  <Form.Check
                    type="radio"
                    label="No"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios2"
                    value="Inactive"
                    onClick={selectedState}
                  />
                </Col>
              </Form.Group>
            </fieldset>
          </Modal.Body>
        ) : (
          <Modal.Body>Please wait..</Modal.Body>
        )}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Edit;
