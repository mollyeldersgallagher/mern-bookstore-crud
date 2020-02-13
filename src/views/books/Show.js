/**
 * @Date:   2020-02-03T10:14:00+00:00
 * @Last modified time: 2020-02-11T20:00:08+00:00
 */



import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

const Genre = props => (
  <Badge variant="light">{props.genre}</Badge>
)
const Author = props => (
  <Badge variant="light">{props.author}</Badge>
)



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

    axios.get(`http://localhost:4000/books/${id}`)
    .then(response => {
      console.log(response);
      this.setState({
        book: response.data,
        loading: false
      })

    })
    .catch((error) => {
      console.log(error);
    })
  }
  delete() {
    const { id } = this.props.match.params;

    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios.delete(`http://localhost:4000/books/${id}`)
    .then(response => {
      console.log(response);
      this.setState({
        book: response.data,
        loading: false
      })
      
    })
    .catch((error) => {
      console.log(error);
    })
    window.location = '/'
  }

  genreList() {
    return this.state.book.genre_id.map((currentGenre, index) => {
      return <Genre genre={currentGenre.name} key={index} />;
    })
  }
  authorList() {
    console.log(this.state.author);
    console.log(this.state.book.author);
      return this.state.book.author_id.map((currentAuthor, index) => {
        return <Author author={currentAuthor.name} key={index} />;
      })
    }
   AlertDismissible (){
     return(
      <>
        <Alert show={this.state.show} variant="secondary">
          <Alert.Heading>Confirm</Alert.Heading>
          <p>Are you sure you want to delete this book - {this.state.book.title}</p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={() => {
              this.setState({ show: false})
              this.delete()
          }} 
          variant="outline-danger">
              Delete
            </Button>
          </div>
        </Alert>
  
        
      </>
     )
   }
 

  render() {

    const { book, loading, show } = this.state;

    if (loading) {
      return (
      <div>
        <h3>Loading...</h3>
      </div>
      )
    }

    return (
    <div>
    <br/>
      <Card>
      {this.AlertDismissible()}
      <Card.Header as="h5">{book.title} <span className="float-right">{ this.genreList() }</span></Card.Header>

        <Card.Body>
          <Card.Title>Synopsis</Card.Title>
          <Card.Text>

            There is no synopsis in the DB
          </Card.Text>
          <Button as={Link} to="/" variant="primary">View all books</Button>
          <Button as={Link} onClick={ ()=>{
            this.setState({
              show: true
            })
          }} variant="danger">Delete</Button>
        </Card.Body>
        <Card.Footer><span className="float-right">{ this.authorList() }</span></Card.Footer>
      </Card>

    </div>
    )
  }
}
