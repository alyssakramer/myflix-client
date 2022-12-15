import React from 'react';
import axios from 'axios'; 
import PropTypes from 'prop-types';
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";
import Button from 'react-bootstrap/Button'; 
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

import { MovieCard } from '../movie-card/movie-card'; 

export const MovieView = ({movies}) => {
  const {movieId} = useParams(); 

  const movie = movies.find(m => m.id === movieId); 
    
  return (
    <div className="movie-view">
        <Row> 
            <Col md={8}> 
            <Card>
            <Card.Title> 
              <span></span>
            </Card.Title>
            <Card.Body>
            <div className="movie-poster">
            <img className="w-100" src={movie.ImagePath}/>
            </div>
            <div className="movie.title">
            <span className="label">Title: </span>
            <span className="value">{movie.Title}</span>
            </div> 
            <div className="movie-description">
            <span className="label">Description: </span>
            <span className="value">{movie.Description}</span>
            </div>
            <div className="movie-director">
            <span className="label">Director: </span>
            <span className="value">{movie.Director.Name}</span>
            </div>
            <div className="movie-genre">
            <span className="label">Genre: </span>
            <span className="value">{movie.Genre.Name}</span>
            </div>
            <Button type="back" onClick={() => { onBackClick(null); }}>Back</Button>
            </Card.Body>
            </Card>
            </Col>
        </Row>
    </div>
);
        
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired, 
        Description: PropTypes.string.isRequired, 
      }).isRequired,  
      Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired, 
        Birthday: PropTypes.string.isRequired,
      }).isRequired, 
      ImagePath: PropTypes.string.isRequired, 
      Featured: PropTypes.bool
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
  };