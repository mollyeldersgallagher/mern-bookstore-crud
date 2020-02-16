import React from "react";
import { Link } from "react-router-dom";

import Card from "react-bootstrap/Card";

export default class Book extends React.Component {
  componentDidMount() {}
  render() {
    return (
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
  }
}
