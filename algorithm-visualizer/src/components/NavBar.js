import { Navbar, Nav, Dropdown } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import logo from '../assets/img/logo.png'


export default function NavBar({ userDetails }) {

    return (
        <div id="home">
            <Navbar bg="light" expand="lg" style={{ zIndex: '500' }}>
                <NavLink to="/home">
                    <Navbar.Brand ><img src={logo} style={{ height: '50px', width: '60px', objectFit: 'cover' }} /></Navbar.Brand>
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <NavLink className="nav-link" activeClassName="is-active" to="/home">
                            Home
                        </NavLink>
                        <Nav.Link href="#visualizer">Visulizer</Nav.Link>
                        {
                            userDetails ?
                                <>
                                    <NavLink className="nav-link" activeClassName="is-active" to="/chat_room">
                                        Chat Room
                                    </NavLink>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="light" id="dropdown-basic">
                                            {userDetails.user.first_name}
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
