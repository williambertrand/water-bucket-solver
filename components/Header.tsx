import Navbar from 'react-bootstrap/Navbar'

function Header() {
  return (
    <Navbar bg="light" expand="lg">
        <Navbar.Brand style={{ marginLeft: 20 }} href="#">Bucket Solver</Navbar.Brand>
    </Navbar>
  );
}

export default Header;