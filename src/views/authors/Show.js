import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { ListGroup, ListGroupItem, Row, Col } from "react-bootstrap";
import defaultAuthor from "../../default-author.jpg";

const rest_api = process.env.REACT_APP_SERVER;

//Functional Components
const Author = props => (
  <>
    <Row>
      <Col sm={6}>
        <Card.Body>
          <Card.Img src={defaultAuthor} roundedCircle />
        </Card.Body>
      </Col>
      <Col sm={6}>
        <Card.Body>
          <Card.Title>Books</Card.Title>
          <ListGroup>
            {props.author.books.map(book => {
              return <ListGroupItem>{book.title}</ListGroupItem>;
            })}
          </ListGroup>
        </Card.Body>
        <Card.Body>
          <Card.Title>Contact</Card.Title>
          <ListGroup>
            <ListGroupItem>{props.author.email}</ListGroupItem>
            <ListGroupItem>{props.author.phone}</ListGroupItem>
          </ListGroup>
        </Card.Body>
      </Col>
    </Row>
  </>
);

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
      .get(`${rest_api}/authors/${id}`)
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
      .delete(`${rest_api}/authors/${id}`)
      .then(response => {
        window.location = "/authors";
      })
      .catch(error => {
        console.log(error);
      });
    // window.location
  }

  // DELETE confirmation before hitting endpoint. Show and hide by setting state
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
        <>
          <h3>Loading...</h3>
        </>
      );
    }

    return (
      <>
        <br />
        <Card>
          {this.AlertDismissible()}
          <Card.Header as="h5">{this.state.author.name}</Card.Header>

          <Author author={this.state.author} />
          <Card.Footer>
            <span className="float-left">
              {
                <Button as={Link} to="/authors" variant="primary">
                  View all authors
                </Button>
              }
            </span>
            {/* conditional component rendering, show buttons for crud abilities if signed in */}
            {localStorage.jwtToken != null ? (
              <>
                <span className="float-left">
                  {
                    <Button
                      as={Link}
                      to={`/authors/update/${this.state.author._id}`}
                      variant="primary"
                    >
                      Update Author
                    </Button>
                  }
                </span>
                <span className="float-right">
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
                </span>
              </>
            ) : (
              <></>
            )}
          </Card.Footer>
        </Card>
      </>
    );
  }
}
