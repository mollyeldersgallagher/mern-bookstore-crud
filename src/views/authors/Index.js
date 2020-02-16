import React, { Component } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import defaultAuthor from "../../default-author.jpg";

import {
  Card,
  Image,
  ListGroup,
  ListGroupItem,
  CardColumns,
  Button,
  Col,
  Row,
  InputGroup,
  FormControl
} from "react-bootstrap";
import defaultCover from "../../placeholder.png";

const Author = props => (
  <Card>
    {/* <Card.Img variant="top" src={defaultCover} /> */}
    <Card.Body>
      <Card.Img src={defaultAuthor} roundedCircle />
      <Card.Title>{props.author.name}</Card.Title>
    </Card.Body>
    <ListGroup className="list-group-flush">
      {props.author.books.map(book => {
        return <ListGroupItem>{book.title}</ListGroupItem>;
      })}
    </ListGroup>
    <Card.Body>
      <Card.Link href={`authors/${props.author._id}`}>Show Author</Card.Link>
    </Card.Body>

    <Card.Footer>
      <small className="text-muted">{props.author.email}</small>
    </Card.Footer>
  </Card>
);

export default class AuthorIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authors: [],

      search: ""
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/authors/")
      .then(response => {
        console.log(response);
        this.setState({
          authors: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  handleInputChange = e => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    });
  };

  render() {
    let filteredAuthors = this.state.authors.filter(author => {
      return author.name.indexOf(this.state.search) !== -1;
    });

    return (
      <>
        <Row>
          <Col sm={12}>
            <h3>Author List</h3>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col sm={8}>
            {localStorage.jwtToken != null ? (
              <Button as={Link} to="/authors/create">
                Add Author
              </Button>
            ) : (
              <>
                <Button as={Link} to="/login">
                  Login to Create
                </Button>
              </>
            )}
          </Col>
          <Col sm={4}>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Search"
                name="search"
                aria-label="Search"
                aria-describedby="basic-addon1"
                value={this.state.search}
                onChange={this.handleInputChange}
              />
            </InputGroup>
          </Col>
        </Row>

        <CardColumns>
          {filteredAuthors.map(a => {
            return <Author author={a} key={a._id} />;
          })}
        </CardColumns>
      </>
    );
  }
}
AuthorIndex.propTypes = {
  search: propTypes.string
};
