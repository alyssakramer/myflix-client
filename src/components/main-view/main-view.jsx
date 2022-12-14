import React from "react";
import axios from "axios";
import PropTypes from "prop-types"; 
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { BrowserRouter, Routes, Route, Naviagte } from "react-router-dom"; 

import { RegistrationView } from "../registration-view/registration-view"; 
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: ([]),
      user: null, 
      showRegisterView: false
    };
  }

  componentDidMount() {
   axios.get("https://my-flix.onrender.com/movies")
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

    // <Row className="justify-content-md-center">
    //   <Col md={8}>
    //   if (selectedMovie) return <MovieView movie={selectedMovie} onBackClick={(newSelectedMovie) => {
    //     this.setSelectedMovie(newSelectedMovie);
    // }} />;
    //   </Col>
    // </Row>

    //Never write jsx without returning it...
    if (selectedMovie) {
      return (
        <Row className="justify-content-md-center">
         <Col md={8}>
          <MovieView movie={selectedMovie} onBackClick={(newSelectedMovie) => {
        this.setSelectedMovie(newSelectedMovie);
    }} />
     </Col>
    </Row>)
  }

    if (movies.length === 0) return <div className="main-view">The list is empty</div>;
    
    return (
      <BrowserRouter> 
        <Row className="justify-content-md-center">
          <Routes>
            <Route
              path="/registration"
              element={
                <>
                {user ? (
                  <Naviagte to="/" />
                ) : (
                  <Col md={5}>
                    <RegistrationView />
                  </Col>
                )}
                </>
              }
              />
              <Route 
                path="login"
                element={
                  <>
                  {user ? (
                    <Naviagte to="/" /> 
                  ) : (
                    movie.length === 0 ? (
                      <Col>This list is empty!</Col>
                    ) : (
                      <Col md={8}>
                        <MovieView movies={movies} />
                      </Col>
                    )
                  )}
                  </>
                }
              />
              <Route 
                path="/"
                element={
                  <>
                    {!user ? (
                      <Naviagte to="/login" replace />
                    ) : movie.length === 0 ? (
                      <Col>This list is empty</Col>
                    ) : (
                      <>
                      {movie.map((movie) => (
                        <Col className="mb-4" key={movie.id} md={3}>
                          <MovieCard movie={movie} /> 
                        </Col>
                      ))}
                      </> 
                    )}
                  </>
                }
              />
          </Routes>
        </Row>
      </BrowserRouter>
    );
  };