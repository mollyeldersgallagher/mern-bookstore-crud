import React, { Component } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export default class GenreCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: ""
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

    const genre = {
      name: this.state.name,
      description: this.state.description
    };

    console.log(genre);
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "jwtToken"
    );

    axios
      .post("http://localhost:4000/genres", genre)
      .then(res => {
        console.log(res.data);
        window.location = "/genres";
      })
      .catch(err => {
        console.log(err);
        window.location = "/genres/create";
      });
  };

  render() {
    return (
      <div>
        <h3>Add an genre</h3>
        <Form onSubmit={this.onSubmit} encType="multipart/form-data">
          <Form.Group as={Row} controlId="formHorizontalName">
            <Form.Label column sm={2}>
              Genre Name
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                placeholder="Name"
                name="name"
                value={this.state.name}
                onChange={this.handleInputChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalDescription">
            <Form.Label column sm={2}>
              Description
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                placeholder="Description"
                name="description"
                value={this.state.description}
                onChange={this.handleInputChange}
              />
            </Col>
          </Form.Group>

          <br />
          <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
              <Button type="submit">Add genre</Button>
            </Col>
          </Form.Group>
        </Form>
      </div>
    );
  }
}
