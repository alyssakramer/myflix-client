import React from "react";
import axios from "axios";
import PropTypes from "prop-types"; 
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import { RegistrationView } from "../registration-view/registration-view"; 
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null, 
      showRegisterView: false
    };
  }

  componentDidMount() {
   axios.get("https://peaceful-plateau-95159.herokuapp.com/movies")
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

 setSelectedMovie(newSelectedMovie) {
   this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  onLoggedIn(user) {
    this.setState({
      user, 
    });
  }
  
  onRegistration(user) {
    this.setState({
      user,
      showRegisterView: false 
    });
  }

  onShowRegisterView(value) {
    this.setState({
      showRegisterView: value, 
    });
  }

  render() {
    const { movies, selectedMovie, user, showRegisterView } = this.state;

    if (showRegisterView) return <RegistrationView onRegistration={registered => this.onRegistration(registered)} onBackClick={() => this.onShowRegisterView(false)} />; 

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} 
    toRegister={() => this.onShowRegisterView(true)} />;

    <Row className="justify-content-md-center">
      <Col md={8}>
      if (selectedMovie) return <MovieView movie={selectedMovie} onBackClick={(newSelectedMovie) => {
        this.setSelectedMovie(newSelectedMovie);
    }} />;
      </Col>
    </Row>

    if (movies.length === 0) return <div className="main-view">The list is empty</div>;
    
    return (
        <Row className=" main-view justify-content-md-center">
          {movies.map((movie, i) => (
            <Col md={3}>
            <MovieCard
              key={`${i}-${movie._id}`}
              movie={movie}
              onMovieClick={(movie) => {
                this.setSelectedMovie(movie);
              }}
            />
            </Col>
          ))
        }
       </Row>
    );
  }
}


