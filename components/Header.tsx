import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Header() {
  return (
    <Navbar bg="light" expand="lg">
        <Navbar.Brand style={{marginLeft: 20}} href="#">Bucket-Solver</Navbar.Brand>
    </Navbar>
  );
}

export default Header;