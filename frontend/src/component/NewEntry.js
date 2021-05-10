import axios from "axios";
import { Component } from "react";
import { Button, Col, Dropdown, Form, Row } from "react-bootstrap";
import swal from "sweetalert";
import * as api from "../API/api";

export default class NeewEntry extends Component {
  constructor() {
    super();
    this.state = {
      fname: "",
      lname: "",
      bio: "",
      dob: "",
      status: "",
      org: "",
      profileImg: "",
      /* image response */
      imageId: "",
      imageUploadstatus: false,
    };
  }

  //onchange handler
  onChange = (e) => {
    //console.log(e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  //onSelect handler for radio button
  onSelect = (data) => {
    console.log(data.occupation, data);
    if (data.occupation) {
      this.setState({
        org: data.occupation,
      });
    } else {
      this.setState({
        status: data,
      });
    }
  };

  //submit handler
  onSubmit = () => {
    console.log(this.state, "submit data");
    const { lname, fname, bio, dob, status, org, imageId } = this.state;
    if (fname && lname && bio && dob && org && status) {
      const payload = {
        fname: fname,
        lname: lname,
        bio: bio,
        dob: dob,
        status: status,
        org: org,
        _id: imageId,
      };
      api.createUser(payload).then((result) => {
        // console.log(result, "data from post api");
        this.setState({ imageUploadstatus: false });
        swal({
          title: result,
          icon: "success",
          buttons: true,
        }).then((willDelete) => {
          this.props.history.push("/");
        });
      });
    } else {
      swal("Please fill all fields");
    }
  };

  imageUploader = () => {
    console.log("hi i am clicked");
    const formData = new FormData();
    formData.append("profileImg", this.state.profileImg);
    axios
      .post("http://localhost:3000/user-profile", formData, {})
      .then((res) => {
        console.log(res);
        this.setState({
          imageId: res.data.userCreated._id,
          imageUploadstatus: true,
        });
      });
  };

  deleteData = () => {
    if (this.state.imageId) {
      api
        .deleteUser(this.state.imageId)
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  //render
  render() {
    return (
      <div
        className="container"
        style={{ textAlign: "left", paddingTop: "5%" }}
      >
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              name="fname"
              value={this.state.fname}
              onChange={this.onChange}
              required
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
              value={this.state.lname}
              onChange={this.onChange}
              required
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
          {/* occupation */}
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Occupation</Form.Label>
            {/* <Form.Control
              type="text"
              placeholder="Enter occupation"
              name="org"
              value={this.state.org}
              onChange={this.onChange}
            /> */}
            <Dropdown>
              <Dropdown.Toggle variant="info" id="dropdown-basic">
                Occupation{"    "}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  key="1"
                  href="#/action-1"
                  onSelect={() => this.onSelect({ occupation: "Employed" })}
                >
                  Employed
                </Dropdown.Item>
                <Dropdown.Item
                  key="2"
                  href="#/action-2"
                  onSelect={() => this.onSelect({ occupation: "Business" })}
                >
                  Business
                </Dropdown.Item>
                <Dropdown.Item
                  key="3"
                  href="#/action-3"
                  onSelect={() => this.onSelect({ occupation: "Student" })}
                >
                  Student
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
          {/* date of birth */}
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Date of birth</Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter last name"
              name="dob"
              value={this.state.dob}
              onChange={this.onChange}
              required
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
              value={this.state.bio}
              onChange={this.onChange}
              required
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
          {/* file */}
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Upload image</Form.Label>
            <div>
              <Form.Control
                type="file"
                name="myImage"
                //value={this.state.bio}
                onChange={(e) => {
                  this.setState({ profileImg: e.target.files[0] });
                }}
                required
              />
              <Form.Text className="text-muted"></Form.Text>

              <Button onClick={this.imageUploader}>Upload</Button>
            </div>
            {this.state.imageUploadstatus === true ? (
              <p style={{ color: "green", paddingTop: "5px" }}>
                Image uploaded!
              </p>
            ) : (
              <p style={{ color: "red", paddingTop: "5px" }}>
                Please select image of png,jpg or jpeg extension!
              </p>
            )}
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
                  name="formHorizontalRadios2"
                  id="formHorizontalRadios2"
                  onClick={() => this.onSelect("Active")}
                />
                <Form.Check
                  type="radio"
                  label="No"
                  name="formHorizontalRadios2"
                  id="formHorizontalRadios1"
                  onClick={() => this.onSelect("Inactive")}
                />
              </Col>
            </Form.Group>
          </fieldset>
          <div style={{ display: "flex" }}>
            <div style={{ padding: "10px" }}>
              <Button
                variant="secondary"
                onClick={() => {
                  this.props.history.push("/");
                  this.deleteData();
                }}
              >
                Back
              </Button>
            </div>
            <div style={{ padding: "10px" }}>
              <Button variant="primary" onClick={this.onSubmit}>
                Save Changes
              </Button>
            </div>
          </div>
        </Form>
      </div>
    );
  }
}
