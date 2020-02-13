/**
 * @Date:   2020-02-03T10:14:00+00:00
 * @Last modified time: 2020-02-10T12:53:54+00:00
 */



import React, { Component } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom';

const Book = props => (
  <tr>
    <td><Link to={`/books/${props.book._id}`}>{props.book.isbn}</Link></td>
    <td><Link to={`/books/${props.book._id}`}>{props.book.title}</Link></td>
    <td><Link to={`/books/update/${props.book._id}`}>Update</Link></td>
    <td><Link to={`/books/delete/${props.book._id}`}>Delete</Link></td>
  </tr>
)

export default class BookIndex extends Component {

  constructor(props) {
    super(props);

    this.state = {
      books: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:4000/books/')
    .then(response => {
      console.log(response);
      this.setState({
        books: response.data
      })
    })
    .catch((error) => {
      console.log(error);
    })
  }

  bookList() {
    return this.state.books.map(b => {
      return <Book book={b} key={b.isbn} />;
    })
  }

  render() {
    return (
      <div>
        <h3>Book List</h3>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>ISBN</th>
              <th>Title</th>
              <th>Action</th>

            </tr>
          </thead>
          <tbody>
            { this.bookList() }
          </tbody>
        </Table>
      </div>
    );
  }
}
