import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom';

import Home from './pages/home';
import Create from './pages/create';
import Adding from './pages/adding';
import Update from './pages/update';
import DeleteList from './pages/deleteList';
import ListItems from './pages/listItems';
import ViewPrs from './pages/viewPrs';
import SearchID from './pages/searchID';


function App() {
  return (
  <React.Fragment>
    <BrowserRouter>

    <Navbar id ="navbar-whole" collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        {/* <Navbar.Brand>
            <img
              src=""
              width="30"
              height="30"
              className="d-inline-block align-top"
              // alt="React Bootstrap logo"
            />
          </Navbar.Brand> */}
        <Navbar.Brand>BUFF!</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as ={Link} to='/'>Home</Nav.Link>
            <Nav.Link as ={Link} to='/create'>Create List</Nav.Link>
            <Nav.Link as ={Link} to='/adding'>Add to List</Nav.Link>
            <Nav.Link as ={Link} to='/update'>Update a List</Nav.Link>
            <Nav.Link as ={Link} to='/deleteList'>Delete a List</Nav.Link>
            <NavDropdown title="View" id="collasible-nav-dropdown">
              <NavDropdown.Item as ={Link} to='/listItems'>
                View An Entire List</NavDropdown.Item>
              <NavDropdown.Item as ={Link} to='/viewPrs'>
                View PRs
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Enter name to find ID"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<Create />} />
      <Route path="/adding" element={<Adding />} />
      <Route path="/update" element={<Update />} />
      <Route path="/deleteList" element={<DeleteList />} />
      <Route path="/listItems" element={<ListItems />} />
      <Route path="/viewPrs" element={<ViewPrs />} />
    </Routes>

    </BrowserRouter>
  </React.Fragment>
  );
}

export default App;
