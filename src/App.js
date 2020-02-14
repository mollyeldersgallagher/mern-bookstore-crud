/**
 * @Date:   2020-02-03T10:14:00+00:00
 * @Last modified time: 2020-02-10T11:40:51+00:00
 */

import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import BookIndex from "./views/books/Index";
import BookShow from "./views/books/Show";
import BookCreate from "./views/books/Create";
import BookEdit from "./views/books/Edit";

import MyNavbar from "./components/MyNavbar";
import Register from "./views/auth/Register";
import Login from "./views/auth/Login";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: localStorage.getItem("jwtToken") !== null
    };
  }
  authHandler = () => {
    this.setState((state, props) => ({
      loggedIn: state.loggedIn ? false : true
    }));
  };

  render() {
    const loggedIn = this.state.loggedIn;
    return (
      <BrowserRouter>
        <MyNavbar loggedIn={loggedIn} onLogout={this.authHandler} />
        <Container>
          <Row>
            <Col>
              <Switch>
                <Route path="/" exact component={BookIndex} />
                <Route exact path="/books/create">
                  {loggedIn ? <BookCreate /> : <Redirect to="/" />}
                </Route>
                <Route path="/books/:id" exact component={BookShow} />
                <Route path="/books/update/:id" exact component={BookEdit} />
                <Route path="/register" exact component={Register} />
                <Route
                  path="/login"
                  exact
                  component={props => (
                    <Login {...props} onLogin={this.authHandler} />
                  )}
                />
              </Switch>
            </Col>
          </Row>
        </Container>
      </BrowserRouter>
    );
  }
}

export default App;
