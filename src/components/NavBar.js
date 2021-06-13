import { Navbar, Nav, Button } from 'react-bootstrap'


export default function NavBar() {

    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Visulizer</Nav.Link>
                        <Nav.Link href="#link">Chat Room</Nav.Link>
                        <Button href="#" variant="outline-primary mr-2 mb-2 mb-0">Login</Button>
                        <Button href="#" variant="primary mr-2 mb-2 mb-0">Sign Up</Button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}
