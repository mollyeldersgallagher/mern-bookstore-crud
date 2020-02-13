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

const Genre = props => (
  <option value={props.genre._id}> {props.genre.name} </option>
);
const Author = props => (
  <option value={props.author._id}>{props.author.name}</option>
);

export default class BookEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isbn: "",
      title: "",
      genres: [],
      genre_id: [],
      authors: [],
      authors_id: []
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    console.log(id);

    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "jwtToken"
    );
    axios.get(`http://localhost:4000/books/${id}`).then(result => {
      console.log(result);
      this.setState({
        isbn: result.data.isbn,
        title: result.data.title,
        genre_id: result.data.genre_id,
        author_id: result.data.author_id
      });
    });

    axios.get(`http://localhost:4000/authors`).then(authors => {
      console.log(authors);
      this.setState({
        authors: authors.data
      });
    });
    axios.get(`http://localhost:4000/genres`).then(genres => {
      console.log(genres);
      this.setState({
        genres: genres.data
      });
    });
  }

  handleInputChange = e => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    console.log(`Input name ${name}. Input value ${value}.`);

    this.setState({
      [name]: value
    });
  };

  onAddAuthor = e => {
    const target = e.target;
    // const value = target.as === 'selected' ? target.selected : target.value;
    const name = target.name;

    var options = target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    //  this.props.someCallback(value);

    console.log(`Input name ${name}. Input value ${value}.`);

    this.setState({
      [name]: value
    });
  };

  addGenre = e => {
    const target = e.target;
    // const value = target.as === 'selected' ? target.selected : target.value;
    const name = target.name;

    var options = target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    //  this.props.someCallback(value);

    console.log(`Input name ${name}. Input value ${value}.`);

    this.setState({
      [name]: value
    });
  };
  onSubmit = e => {
    e.preventDefault();
    const { id } = this.props.match.params;

    const book = {
      isbn: this.state.isbn,
      title: this.state.title,
      genre_id: this.state.genre_id,
      author_id: this.state.author_id
    };
    console.log(book);

    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "jwtToken"
    );

    axios
      .put(`http://localhost:4000/books/${id}`, book)
      .then(res => {
        console.log(res.data);
        window.location = "/";
        console.log(book);
      })
      .catch(err => {
        console.log(err);
        //    window.location = `/books/update/${id}`;
      });

    // window.location = '/';
  };

  genreList() {
    return this.state.genres.map((currentGenre, index) => {
      return <Genre genre={currentGenre} key={index} />;
    });
  }
  authorList() {
    return this.state.authors.map((currentAuthor, index) => {
      return <Author author={currentAuthor} key={index} />;
    });
  }
  render() {
    return (
      <div>
        <h3>Update Book</h3>
        <Form onSubmit={this.onSubmit}>
          <Form.Group as={Row} controlId="formHorizontalISBN">
            <Form.Label column sm={2}>
              ISBN
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                placeholder="ISBN"
                name="isbn"
                value={this.state.isbn}
                onChange={this.handleInputChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalTitle">
            <Form.Label column sm={2}>
              Title
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                placeholder="Title"
                name="title"
                value={this.state.title}
                onChange={this.handleInputChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalGenre">
            <Form.Label column sm={2}>
              Genre
            </Form.Label>
            <Col sm={4}>
              <InputGroup>
                <Form.Control
                  as="select"
                  placeholder="Genre"
                  name="genre_id"
                  onChange={this.addGenre}
                >
                  {this.genreList()}
                </Form.Control>
              </InputGroup>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalAuthor">
            <Form.Label column sm={2}>
              Author
            </Form.Label>
            <Col sm={4}>
              <InputGroup>
                <Form.Control
                  as="select"
                  multiple
                  placeholder="Author"
                  name="author_id"
                  onChange={this.onAddAuthor}
                >
                  {this.authorList()}
                </Form.Control>
              </InputGroup>
            </Col>
          </Form.Group>

          <br />
          <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
              <Button type="submit">Update Book</Button>
            </Col>
          </Form.Group>
        </Form>
      </div>
    );
  }
}
