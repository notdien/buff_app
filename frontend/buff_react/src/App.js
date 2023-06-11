// import logo from './logo.svg';
// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Routes, Route, Link } from 'react-router-dom';

// import home from './pages/home';
import create_list from './pages/create';
import adding from './pages/adding';
import updates from './pages/update';
import deleting from './pages/delete';
import viewing from './pages/listItems';
import prs from './pages/viewPrs';
import searching from './pages/searchID';


function App() {
  return (
  <React.Fragment>
    <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Buff!</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#create_list">Create A List</Nav.Link>
            <Nav.Link href="#adding">Add To a List</Nav.Link>
            <Nav.Link href="#updates">Update a List</Nav.Link>
            <Nav.Link href="#deleting">Delete a List</Nav.Link>

            <NavDropdown title="View Lists" id="basic-nav-dropdown">
              <NavDropdown.Item href="#viewing">View Complete List</NavDropdown.Item>
              <NavDropdown.Item href="#prs">
                View PRs of a User
              </NavDropdown.Item>
            </NavDropdown>

            <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Find your ID"
              className="me-2"
              aria-label="Find your ID"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          </Nav>
        </Container>
      </Navbar>

      <h1>
        Welcome to Buff!
      </h1>
  </React.Fragment>
  );
}

export default App;
