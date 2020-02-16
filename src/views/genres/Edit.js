/**
 * @Date:   2020-01-28T01:14:02+00:00
 * @Last modified time: 2020-02-11T19:36:07+00:00
 */

import React, { Component } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Badge from "react-bootstrap/Badge";

export default class GenreEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: ""
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "jwtToken"
    );
    axios.get(`http://localhost:4000/authors/${id}`).then(result => {
      console.log(result);
      this.setState({
        name: result.data.name,
        description: result.data.description
      });
    });
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
    const { id } = this.props.match.params;

    const author = {
      name: this.state.name,
      description: this.state.description
    };

    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "jwtToken"
    );
    axios
      .put(`http://localhost:4000/authors/${id}`, author)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <>
        <h3>Update Genre</h3>
        <Form onSubmit={this.onSubmit}>
          <Form.Group as={Row} controlId="formHorizontalName">
            <Form.Label column sm={2}>
              Name
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
              <Button type="submit">Update Genre</Button>
            </Col>
          </Form.Group>
        </Form>
      </>
    );
  }
}
