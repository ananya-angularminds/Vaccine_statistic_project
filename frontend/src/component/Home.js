import { Component } from "react";
import Delete from "../UIComponent/Delete";
import Edit from "../UIComponent/Edit";
import * as api from "../API/api";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      isHover: false,
      /* all data of customer */
      allCustomer: null,
      singleCustomer: null,
      count: 1,
    };
  }

  //rout function to go to edit page
  routePage = () => {
    this.props.history.push("/createuser");
  };

  getRequest = () => {
    api.getData().then((res) => {
      //console.log(res);
      this.setState({
        allCustomer: res,
      });
    });
  };

  //componentDidMount function
  componentDidMount = () => {
    //console.log("hiii i just mounted");
    this.getRequest();
  };

  dateParser = (data) => {
    //console.log(data, "date");
    const date = new Date(data);
    const finalDate =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    return finalDate;
  };

  //edit handler
  handleEdit = (data) => {
    //console.log(data, "id check");

    let { count } = this.state;
    this.setState({
      count: count + 1,
    });
    if (count === 1) {
      api
        .getSingleData(data)
        .then((result) => {
          //console.log(result);
          const payload = {
            _id: data,
            data: result,
          };
          this.setState({
            singleCustomer: result,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  handleConformRequest = (data) => {
    //console.log(data);
    if (data === "UPDATED") {
      this.getRequest();
    } else {
      this.getRequest();
    }
    this.setState({
      count: 1,
    });
  };

  //render
  render() {
    return (
      <div className="conatiner">
        <div className="customerCard">
          <div className="cards">
            <div
              className="card"
              onMouseEnter={() => {
                this.setState({
                  isHover: true,
                });
              }}
              onMouseLeave={() => {
                this.setState({
                  isHover: false,
                });
              }}
            >
              {this.state.isHover === false ? (
                <div className="card__contentAdd" style={{ paddingTop: "45%" }}>
                  <h3>Create User</h3>
                </div>
              ) : (
                <div
                  className="card__contentAdd1"
                  onClick={() => {
                    this.routePage();
                  }}
                  style={{ paddingTop: "38%" }}
                >
                  <img
                    src="https://www.pngkey.com/png/full/334-3347042_icon-add-user-icon.png"
                    alt="Girl in a jacket"
                    style={{ width: "40%" }}
                  />
                </div>
              )}
            </div>
            {this.state.allCustomer
              ? this.state.allCustomer.map((item) => {
                  return (
                    <div className="card" key={item._id} id={item.status}>
                      <div className="card__content">
                        <ul>
                          <li
                            style={{
                              borderBottom: "1px solid black",
                              paddingTop: "10px",
                              paddingBottom: "10px",
                              display: "flex",
                            }}
                          >
                            <img
                              src={item.profileImg}
                              alt="Avatar"
                              className="avatar"
                            />
                            <h5
                              style={{ color: "#3333cc", paddingLeft: "15px" }}
                            >
                              {item.fname + " " + item.lname}
                            </h5>
                          </li>
                          <li>
                            <b>Occupation: </b> {item.org}
                          </li>
                          <li>
                            <b>Date of Birth: </b> {this.dateParser(item.dob)}
                          </li>
                          <li>
                            <b>Bio: </b> {item.bio}
                          </li>
                          <li>
                            <span
                              onClick={() => {
                                this.handleEdit(item._id);
                              }}
                              className={item._id}
                            >
                              <Edit
                                singleCustomer={this.state.singleCustomer}
                                handleConformRequest={this.handleConformRequest}
                              />
                            </span>
                            <span>
                              <Delete
                                customerID={item._id}
                                handleConformRequest={this.handleConformRequest}
                              />
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>
    );
  }
}
