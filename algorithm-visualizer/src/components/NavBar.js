import { Navbar, Nav, Dropdown } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'


export default function NavBar({ loginFlag }) {

    return (
        <div id="home">
            <Navbar bg="light" expand="lg" style={{ zIndex: '500' }}>
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <NavLink className="nav-link" activeClassName="is-active" to="/home">
                            Home
                        </NavLink>
                        <Nav.Link href="#visualizer">Visulizer</Nav.Link>
                        {
                            loginFlag ?
                                <>
                                    <NavLink className="nav-link" activeClassName="is-active" to="/chat_room">
                                        Chat Room
                                    </NavLink>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="light" id="dropdown-basic">
                                            {loginFlag.user.first_name}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu style={{ left: '-50px' }}>
                                            <Dropdown.Item as="button">
                                                <NavLink to="/account" style={{ color: 'black', textDecoration: 'none' }}>My Account</NavLink>
                                            </Dropdown.Item>
                                            <Dropdown.Item as="button">
                                                <NavLink to="/logout" style={{ color: 'black', textDecoration: 'none' }}>Logout</NavLink>
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </>
                                :
                                <>
                                    <NavLink to="/signIn" className="btn btn-outline-success mr-2 mb-2 mb-0">Login</NavLink>
                                    <NavLink to="/signUp" className="btn btn-success mr-2 mb-2 mb-0">Sign Up</NavLink>
                                </>
                        }

                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}
