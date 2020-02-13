/**
 * @Date:   2020-02-05T17:51:53+00:00
 * @Last modified time: 2020-02-10T12:58:49+00:00
 */
 /**
  * @Date:   2020-01-27T12:29:12+00:00
 * @Last modified time: 2020-02-10T12:58:49+00:00
  */
 import React, {Component} from 'react';
 import {Link} from 'react-router-dom';
 import axios from 'axios';
 import Form from 'react-bootstrap/Form';
 import Row from 'react-bootstrap/Row';
 import Col from 'react-bootstrap/Col';
 import Card from 'react-bootstrap/Card';
 import Button from 'react-bootstrap/Button';
 import InputGroup from 'react-bootstrap/InputGroup';
 import Badge from 'react-bootstrap/Badge';

 export default class ShowUpdate extends Component{
   constructor(props){
     super(props);
       this.state = {
         imdb_id: '',
         name: '',
         total_episodes: ''
       };
       console.log(props);
   }
   handleInputChange = e => {
     const target = e.target;
     const value = target.type ==='checkbox' ? target.checked : target.value;
     const name = target.name;

     this.setState({
       [name]: value
     });
   }

   onSubmit = e => {
     e.preventDefault();

     const show = {
       imdb_id: this.state.imdb_id,
       name: this.state.name,
       total_episodes: this.state.total_episodes,
       episode: this.state.episode,
     }
     console.log(show);

     const { id } = this.props.match.params;
     axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
     axios.put(http://localhost:4000/shows/${id}, show)

          .then(res => {
            console.log(res.data);
            this.props.history.push("/shows");
          })
          .catch(err => {
            console.log(err);
            this.props.history.push("/login");
          });
   };

    componentDidMount(){
      const { id } = this.props.match.params;
      let that = this;
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
      axios.get(http://localhost:4000/shows/${id}).then((result) => {
        console.log(result);
        this.setState({
          imdb_id: result.data.imdb_id,
          name: result.data.name,
          total_episodes: result.data.total_episodes,
        });
      });
    }

   render(){
     return(
       <div className = "container">
         <Card className = "topSpace">
           <Card.Body>
           <h3>Edit Show</h3>
           <Form onSubmit={this.onSubmit}>
             <Form.Group as = {Row} controlId="formHorizontalIMDB">
               <Form.Label column sm = {2}>
                 IMDB ID:
               </Form.Label>
               <Col sm = {10}>
                 <Form.Control
                               type = "text"
                               placeholder = "Please enter an IMDB ID"
                               name = "imdb_id"
                               value = {this.state.imdb_id}
                               onChange = {this.handleInputChange}
                 />
               </Col>
             </Form.Group>
             <Form.Group as = {Row} controlId="formHorizontalNAME">
               <Form.Label column sm = {2}>
                 Name:
               </Form.Label>
               <Col sm = {10}>
                 <Form.Control
                               type = "text"
                               placeholder = "Please enter an name"
                               name = "name"
                               value = {this.state.name}
                               onChange = {this.handleInputChange}
                 />
               </Col>
             </Form.Group>
             <Form.Group as = {Row} controlId="formHorizontalTOTAlEPISODES">
               <Form.Label column sm = {2}>
                 Total Number of Episodes:
               </Form.Label>
               <Col sm = {10}>
                 <Form.Control
                               type = "text"
                               placeholder = "Please enter the total number of episodes"
                               name = "total_episodes"
                               value = {this.state.total_episodes}
                               onChange = {this.handleInputChange}
                 />
               </Col>
             </Form.Group>
             <Form.Group as = {Row}>
               <Col>
                 <Button type = "submit" className ="spaceRight">Save Show</Button>
                 <Link to = "/shows/"   ><Button className = "addEpisode" type = "submit" variant = "warning">Cancel</Button></Link>
               </Col>
               <Col>
                 <Link to = {"/episodes/create/" + this.props.match.params.id } >
                   <Button variant = "info"  className="btn btn-primary float-right">Click here to create an episode for this show</Button>
                 </Link>
               </Col>
             </Form.Group>
           </Form>
           </Card.Body>
         </Card>
       </div>
     )
   }

 }
