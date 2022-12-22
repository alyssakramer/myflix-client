import { Navbar, Container, Nav, Button, Row, Col } from "react-bootstrap"; 
import { Link } from "react-router-dom"; 
import { React } from "react"; 

export function NavigationBar(props) {
    let user = localStorage.getItem("user");

    const handleLogOut = (e) => {
    e.preventDefault();
    localStorage.clear();
    window.open("/", "_self");
    props.onLoggedOut(props.user);
     };

    const isAuth = () => {
        const user = localStorage.getItem("token") || props.user
        if (typeof window == "undefined") {
            return false; 
        }
        if (localStorage.getItem("token")) {
            return user // localStorage.getItem("token"); 
        } else {
            return false; 
        }
    }; 


    return (
        <Navbar className="bright-bg w-100" variant="light" expand="lg">
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
                 <Link className="nav-link mr-2" to={`/users/${user}`}>
                  Profile
                </Link>
                {" "}
                <Link className="nav-link" to="/registration">
                  Sign Up
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
}