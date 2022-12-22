import React from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { RegistrationView } from "../registration-view/registration-view";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { ProtectedRoute } from "../protected-view/protected-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";

export function MainView() {
  //useState docs
  // https://reactjs.org/docs/hooks-state.html
  const [movies, setMovies] = React.useState([]);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    //More on useEffect. The picture below explains it in a simple way.
    //https://miro.medium.com/max/1400/1*2jfxjw5gHyRDjK45ydqypw.webp 
    axios
      .get("https://my-flix.onrender.com/movies")
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <BrowserRouter>
      <NavigationBar user={user} /> 
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/registration"
            element={<RegistrationView onRegistration={setUser} />}
          />
          <Route path="/login" element={<LoginView onLoggedIn={setUser} />} />
          <Route
            path="/movies/:movieId"
            element={<MovieView movies={movies} />}
          />
          <Route
            index
            path="/"
            element={
              <ProtectedRoute user={user}>
                {movies.length === 0 ? (
                  <div className="main-view">The list is empty</div>
                ) : (
                  <Row>
                    {movies.map((movie) => (
                      <MovieCard movie={movie} key={movie._id} />
                    ))}
                  </Row>
                )}
              </ProtectedRoute>
            }
          />
          <Route
          path="/users/:username"
          element={
            <ProtectedRoute user={user}>
              <ProfileView movies={movies} /> 
            </ProtectedRoute>
          }
          /> 
          <Route path="*" element={<div>404 Are you lost?</div>} />
        </Routes>
      </Row>
    </BrowserRouter>
  );
}
