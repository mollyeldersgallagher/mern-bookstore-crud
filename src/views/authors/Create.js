import React, { Component } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Badge from "react-bootstrap/Badge";

export default class AuthorCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      phone: ""
    };
  }

  componentDidMount() {
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "jwtToken"
    );
  }

  handleInputChange = e => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const author = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone
    };

    console.log(author);
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "jwtToken"
    );

    axios
      .post("http://localhost:4000/authors", author)
      .then(res => {
        console.log(res.data);
        window.location = "/";
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <h3>Add an Author</h3>
        <Form onSubmit={this.onSubmit} encType="multipart/form-data">
          <Form.Group as={Row} controlId="formHorizontalName">
            <Form.Label column sm={2}>
              Name
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                required
                type="text"
                placeholder="Name"
                name="name"
                value={this.state.name}
                onChange={this.handleInputChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Email
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                required
                type="email"
                placeholder="Email"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChange}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Phone
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                required
                type="text"
                placeholder="Phone"
                name="phone"
                value={this.state.phone}
                onChange={this.handleInputChange}
              />
            </Col>
          </Form.Group>

          <br />
          <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
              <Button type="submit">Add author</Button>
            </Col>
          </Form.Group>
        </Form>
      </div>
    );
  }
}
