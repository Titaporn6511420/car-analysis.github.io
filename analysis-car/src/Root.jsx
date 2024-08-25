import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

function Root() {
  return (
    <>
      <Navbar>
        <Container>
          <Navbar.Brand as={Link} to="/">Dashboard</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/Hightlight">Hightlighted Cars</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

export default Root;