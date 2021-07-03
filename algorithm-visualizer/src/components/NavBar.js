import { Navbar, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'


export default function NavBar({ loginFlag }) {

    return (
        <div id="home">
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <NavLink className="nav-link" activeClassName="is-active" to="/home">
                            Home
                        </NavLink>
                        <Nav.Link href="#visualizer">Visulizer</Nav.Link>
                        <NavLink className="nav-link" activeClassName="is-active" to="/chat_room">
                            Chat Room
                        </NavLink>
                        {
                            loginFlag ?
                            <>
                                <NavLink to="/account" className="btn btn-outline-primary mr-2 mb-2 mb-0">My Account</NavLink>
                                <NavLink to="/logout" className="btn btn-primary mr-2 mb-2 mb-0">Logout</NavLink>
                            </>
                            :
                            <>
                                <NavLink to="/signIn" className="btn btn-outline-primary mr-2 mb-2 mb-0">Login</NavLink>
                                <NavLink to="/signUp" className="btn btn-primary mr-2 mb-2 mb-0">Sign Up</NavLink>
                            </>
                        }
                        
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}
