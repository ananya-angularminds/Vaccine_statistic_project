import { Component } from "react";
import "./MainComponent.css";
//import { Container, Navbar } from "react-bootstrap";

export default class MainComponent extends Component {
  render() {
    return (
      <div>
        <nav>
          <label class="logo">Vaccine Statistics </label>
          {/* <ul>
            <li>
              <a href="/#">Home</a>
            </li>
            <li>
              <a href="/#">About</a>
            </li>
          </ul> */}
        </nav>
        {this.props.children}
      </div>
    );
  }
}
