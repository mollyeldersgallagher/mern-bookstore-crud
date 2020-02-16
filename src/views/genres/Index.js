import React, { Component } from "react";
import axios from "axios";
import propTypes from "prop-types";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

import {
  Card,
  Container,
  ListGroup,
  ListGroupItem,
  CardColumns,
  Button,
  Col,
  Row,
  InputGroup,
  FormControl
} from "react-bootstrap";

const Genre = props => (
  <Card>
    {/* <Card.Img variant="top" src={defaultCover} /> */}
    <Card.Body>
      <Card.Title>{props.genre.name}</Card.Title>
    </Card.Body>
    <Card.Body>
      <Card.Link href={`genres/${props.genre._id}`}>View Genre</Card.Link>
    </Card.Body>
    <Card.Footer variant="primary">
      <small className="text-muted">{props.genre.email}</small>
    </Card.Footer>
  </Card>
);

export default class GenreIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      genres: [],
      search: ""
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/genres/")
      .then(response => {
        console.log(response);
        this.setState({
          genres: response.data
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
    let filteredGenres = this.state.genres.filter(genre => {
      return genre.name.indexOf(this.state.search) !== -1;
    });
    return (
      <>
        <Row>
          <Col sm={12}>
            <h3>Genre List</h3>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col sm={8}>
            {localStorage.jwtToken != null ? (
              <Button as={Link} to="/genres/create">
                Add Genre
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
          {filteredGenres.map(g => {
            return <Genre genre={g} key={g._id} />;
          })}
        </CardColumns>
      </>
    );
  }
}

GenreIndex.propTypes = {
  search: propTypes.string
};
