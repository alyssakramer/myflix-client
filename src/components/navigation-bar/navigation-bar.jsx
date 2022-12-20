import { Navbar, Container, Nav, Button, Row, Col } from "react-bootstrap"; 
import { Link } from "react-router-dom"; 
import { React } from "react"; 

export function NavigationBar() {
    let user = localStorage.getItem("user");

    const handleLogOut = (e) => {
    e.preventDefault();
    localStorage.clear();
    window.open("/", "_self");
    props.onLoggedOut(user);
     };

    const isAuth = () => {
        if (typeof window == "undefined") {
            return false; 
        }
        if (localStorage.getItem("token")) {
            return localStorage.getItem("token"); 
        } else {
            return false; 
        }
    }; 


    return (
        <Navbar className="bright-bg w-100" variant="dark" expand="lg">
        <Navbar.Brand href="#">My Flix App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link className="nav-link mr-2" to="/">
              Movies
            </Link>
            {isAuth() ? (
              <>
                {" "}
                <Link className="nav-link mr-2" to={`/users/${user}`}>
                  Profile
                </Link>
                <p className="nav-link" onClick={handleLogOut}>
                  Log Out
                </p>
              </>
            ) : (
              <>
                {" "}
                <Link className="nav-link" to="/register">
                  Sign Up
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
}