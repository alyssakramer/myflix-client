import React, { useState, useEffect } from "react"; 
import { Form, Button, Container, Card, Row, Col } from "react-bootstrap"; 
import axios from "axios"; 
import { Link } from "react-router-dom"; 
import { Figure } from "react-bootstrap"; 

export class ProfileView extends React.Component {
    constructor() {
        super(); 
        this.state = {
            Name: null, 
            Username: null, 
            Password: null, 
            Email: null, 
            Birthday: null, 
            FavoritesMovies: [],
        }; 
    }

    componentDidMount() {
        const accessToken = localStorage.getItem("token"); 
        this.getUser(accessToken);
    }

    // display user information
    getUser = (token) => {
        const Username = localStorage.getItem("user")
        axios
            .get(`https://my-flix.onrender.com/users/${Username}`, {
                headers: { Authorization: `Bearer ${token}` }, 
            })
            .then((response) => {
                this.setState({
                    Name: response.data.Name,
                    Username: response.data.Username,
                    Password: response.data.Password,
                    Email: response.data.Email,
                    Birthday: response.data.Birthday,
                    FavoriteMovies: response.data.FavoriteMovies,  
                }); 
            })
            .cath(function (error) {
                console.log(error); 
            }); 
    }; 

    // allow user to update their info
    editUser = (e) => {
        e.preventDefault();
        const Username = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        axios
          .put(
            `https://my-flix.onrender.com/users/${Username}`,
            {
                Name: this.state.Name, 
              Username: this.state.Username,
              Password: this.state.Password,
              Email: this.state.Email,
              Birthday: this.state.Birthday,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          .then((response) => {
            console.log(response)
            this.setState({
                Name: response.data.Name, 
              Username: response.data.Username,
              Password: response.data.Password,
              Email: response.data.Email,
              Birthday: response.data.Birthday,
            });
    
            localStorage.setItem("user", this.state.Username);
            const data = response.data;
            console.log(data);
            console.log(this.state.Username);
            alert("Profile is updated!");
            window.open(`/users/${Username}`, "_self");
          })
          .catch(function (error) {
            console.error(error);
          });
      };

      // allow user to deregister
      onDeleteUser() {
        const Username = localStorage.getItem("user");
        const token = localStorage.getItem("token");
    
        axios
          .delete(`https://my-flix.onrender.com/users/${Username}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            console.log(response);
            alert("Profile has been deleted!");
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            window.open(`/`, "_self");
          })
          .catch(function (error) {
            console.log(error);
          });
      }

      onRemoveFavorite = (movie) => {
        const username = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        console.log(movie)
        axios
          .delete(
            `https://my-flix.onrender.com/users/${username}/movies/${movie}`,
            { headers: { Authorization: `Bearer ${token}` } }
          )
          .then((response) => {
            console.log(response);
            alert("Movie was removed from favorites.");
            this.componentDidMount();
          })
          .catch(function (error) {
            console.log(error);
          });
      };
        onLoggedOut() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        this.setState({
          user: null,
        });
        window.open("/", "_self");
      }; 

     // Set user values

     setName(value) {
        this.setState({
          Name: value,
        });
        this.Name = value;
      }

  setUsername(value) {
    this.setState({
      Username: value,
    });
    this.Username = value;
  }

  setPassword(value) {
    this.setState({
      Password: value,
    });
    this.Password = value;
  }

  setEmail(value) {
    this.setState({
      Email: value,
    });
    this.Email = value;
  }

  setBirthday(value) {
    console.warn("setBirthday", value);
    this.setState({
      Birthday: value,
    });
    this.Birthday = value;
  }
  test(){
    alert('works')
  }
  render() {
    const { movies } = this.props;
    const { FavoriteMovies, Username, Email, Birthday, Password, Name } = this.state;

    return (
      <Container>
        <Row>
          <Col>
            <Card className="user-profile">
              <Card.Header>User Profile</Card.Header>
              <Card.Body>
                <>
                  <p>Name: {Name}</p>
                  <p>Username: {Username}</p>
                  <p>Email: {Email}</p>
                  <p>Birthday: {Birthday}</p>
                </>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="update-inputs">
              <Card.Header>Update Profile</Card.Header>
              <Card.Body>
                <Card.Text>
                  <Form
                    className="update-form"
                    onSubmit={(e) =>
                      this.editUser(
                        e,
                        this.Name, 
                        this.Username,
                        this.Password,
                        this.Email,
                        this.Birthday
                      )
                    }
                  >
                    <Form.Group>
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="Name"
                        placeholder="New Name"
                        onChange={(e) => this.setName(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        type="text"
                        name="Username"
                        placeholder="New Username"
                        onChange={(e) => this.setUsername(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="Password"
                        placeholder="New Password"
                        onChange={(e) => this.setPassword(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="Email"
                        placeholder="New Email"
                        onChange={(e) => this.setEmail(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Birthday</Form.Label>
                      <Form.Control
                        type="date"
                        name="Birthday"
                        onChange={(e) => this.setBirthday(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Button
                        variant="warning"
                        type="submit"
                        onClick={(e) => this.editUser(e)}
                      >
                        Update User
                      </Button>
                      <Button
                        className="delete-button"
                        variant="danger"
                        onClick={() => this.onDeleteUser()}
                      >
                        Delete User
                      </Button>
                    </Form.Group>
                  </Form>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Card className="favmov-inputs">
          <Card.Body>
            <Row>
              <Col xs={12}>
                <h4>Favorite Movies</h4>
              </Col>
            </Row>
            <Row>
              {FavoritesMovies.map((movie) => (
                <Col key={movie._id} className="fav-movie">
                  <Figure>
                    <Link to={`/movies/${movie._id}`}>
                      <Figure.Image src={movie.ImagePath} alt={movie.Title} />
                      <Figure.Caption>{movie.Title}</Figure.Caption>
                    </Link>
                  </Figure>
                  <Button
                    className="remove"
                    variant="secondary"
                    onClick={()=>{this.onRemoveFavorite(movie._id)}}
                  >
                    Remove from the list
                  </Button>
                </Col>
              ))}
            </Row>
          </Card.Body>
        </Card>
      </Container>
    );
  } 
}
