import React, { Component } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import {
  Card,
  ListGroup,
  ListGroupItem,
  CardColumns,
  Button
} from "react-bootstrap";
import defaultCover from "../../placeholder.png";

const Book = props => (
  <Card style={{ width: "18rem" }}>
    <Card.Img variant="top" src={defaultCover} />
    <Card.Body>
      <Card.Title>{props.book.title}</Card.Title>
      <Card.Text>
        Some quick example text to build on the card title and make up the bulk
        of the card's content.
      </Card.Text>
    </Card.Body>
    <Card.Body>
      <Card.Link href={`books/${props.book._id}`}>Show Book</Card.Link>
      {/* <Card.Link href="#">Another Link</Card.Link> */}
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">{props.book.lastUpdated}</small>
    </Card.Footer>
  </Card>
);

export default class BookIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/books/")
      .then(response => {
        console.log(response);
        this.setState({
          books: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  bookList() {
    return this.state.books.map(b => {
      return <Book book={b} key={b.isbn} />;
    });
  }

  render() {
    return (
      <>
        <h3>Book List</h3>
        <>
          {localStorage.jwtToken != null ? (
            <Button>Add Book</Button>
          ) : (
            <>
              <Button as={Link} to="/register">
                Login to Create
              </Button>
            </>
          )}

          <CardColumns>{this.bookList()}</CardColumns>
        </>
      </>
    );
  }
}
