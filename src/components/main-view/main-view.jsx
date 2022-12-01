import React from "react";
import axios from "axios";

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
      registration: true
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

  toRegister(registered) {
    this.setState({
      registered, 
    });
  }

  render() {
    const { movies, selectedMovie, user, registered } = this.state;

    if (!registered) return <RegistrationView toRegister={registered => this.toRegister(registered)} />; 

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} 
    toRegister={registered => this.toRegister(registered)} />;

    if (selectedMovie) return <MovieView movie={selectedMovie} onBackClick={(newSelectedMovie) => {
        this.setSelectedMovie(newSelectedMovie);
    }} />;

    if (movies.length === 0) return <div className="main-view">The list is empty</div>;
    
    return (
      <div className="main-view">
          {movies.map((movie, i) => (
            <MovieCard
              key={`${i}-${movie._id}`}
              movie={movie}
              onMovieClick={(movie) => {
                this.setSelectedMovie(movie);
              }}
            />
          ))
        }
      </div>
    );
  }
}


