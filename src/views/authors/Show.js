import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

const Genre = props => <Badge variant="light">{props.genre}</Badge>;
const Author = props => <Badge variant="light">{props.author}</Badge>;

export default class AuthorShow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      author: {},
      show: false,
      loading: true
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    axios
      .get(`http://localhost:4000/authors/${id}`)
      .then(response => {
        console.log(response);
        this.setState({
          author: response.data,
          loading: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  delete() {
    const { id } = this.props.match.params;

    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "jwtToken"
    );
    axios
      .delete(`http://localhost:4000/authors/${id}`)
      .then(response => {
        console.log(response);
        this.setState({
          author: response.data,
          loading: false
        });
      })
      .catch(error => {
        console.log(error);
      });
    window.location = "/";
  }

  AlertDismissible() {
    return (
      <>
        <Alert show={this.state.show} variant="secondary">
          <Alert.Heading>Confirm</Alert.Heading>
          <p>
            Are you sure you want to delete this author -{" "}
            {this.state.author.name}
          </p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button
              onClick={() => {
                this.setState({ show: false });
                this.delete();
              }}
              variant="outline-danger"
            >
              Delete
            </Button>
          </div>
        </Alert>
      </>
    );
  }

  render() {
    const { author, loading, show } = this.state;

    if (loading) {
      return (
        <div>
          <h3>Loading...</h3>
        </div>
      );
    }

    return (
      <div>
        <br />
        <Card>
          {this.AlertDismissible()}
          <Card.Header as="h5">{author.name}</Card.Header>

          <Card.Body>
            <Card.Title>Synopsis</Card.Title>
            <Card.Text>There is no synopsis in the DB</Card.Text>
            <Button as={Link} to="/" variant="primary">
              View all authors
            </Button>
            <Button
              as={Link}
              onClick={() => {
                this.setState({
                  show: true
                });
              }}
              variant="danger"
            >
              Delete
            </Button>
          </Card.Body>
          <Card.Footer>
            <span className="float-right">{this.state.email}</span>
          </Card.Footer>
        </Card>
      </div>
    );
  }
}
