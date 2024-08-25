import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import './App.css';

function Root() {
  return (
    <>
      <Navbar>
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/" exact activeClassName="active">
              Dashboard
              </Nav.Link>
              <Nav.Link as={NavLink} to="/hightlight" activeClassName="active">
                Highlighted Cars
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="mt-3">
        <Outlet />
      </Container>
    </>
  );
}

export default Root;
