import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Alert, Row, Col, ListGroupItem, ListGroup } from "react-bootstrap";
import placeholder from "../../placeholder.png";

const Genre = props => <Badge variant="light">{props.genre}</Badge>;
const Author = props => {
  return <ListGroupItem>{props.author}</ListGroupItem>;
};

export default class BookShow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      book: {},
      show: false,
      loading: true
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    axios
      .get(`http://localhost:4000/books/${id}`)
      .then(response => {
        console.log(response);
        this.setState({
          book: response.data,
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
      .delete(`http://localhost:4000/books/${id}`)
      .then(response => {
        console.log(response);
        window.location = "/";
      })
      .catch(error => {
        console.log(error);
      });
  }

  genreList() {
    return this.state.book.genre_id.map((currentGenre, index) => {
      return <Genre genre={currentGenre.name} key={index} />;
    });
  }
  authorList() {
    return this.state.book.author_id.map((currentAuthor, index) => {
      return <Author author={currentAuthor.name} key={index} />;
    });
  }
  AlertDismissible() {
    return (
      <>
        <Alert show={this.state.show} variant="secondary">
          <Alert.Heading>Confirm</Alert.Heading>
          <p>
            Are you sure you want to delete this book - {this.state.book.title}
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
    const { book, loading, show } = this.state;

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
          <Card.Header as="h5">
            {book.title} <span className="float-right">{this.genreList()}</span>
          </Card.Header>

          <Row>
            <Col sm={6}>
              <Card.Body>
                <Card.Img src={placeholder} roundedCircle />
              </Card.Body>
            </Col>
            <Col sm={6}>
              <Card.Body>
                <Card.Title>Synopsis</Card.Title>
                <Card.Text>{this.state.book.description}</Card.Text>
              </Card.Body>
              <Card.Body>
                <Card.Title>Authors</Card.Title>
                <ListGroup>{this.authorList()}</ListGroup>
              </Card.Body>
            </Col>
          </Row>
          <Card.Footer>
            <span className="float-left">
              {
                <Button as={Link} to="/" variant="primary">
                  View all books
                </Button>
              }
            </span>
            {localStorage.jwtToken != null ? (
              <>
                <span className="float-left">
                  {
                    <Button
                      as={Link}
                      to={`/books/update/${this.state.book._id}`}
                      variant="primary"
                    >
                      Update Book
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
      </div>
    );
  }
}
