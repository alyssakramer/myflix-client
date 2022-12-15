import React from 'react'; 
import PropTypes from 'prop-types'; 
import axios from "axios"; 
import { Link } from "react-router-dom";

import Button from 'react-bootstrap/Button'; 
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export class MovieCard extends React.Component {
    render() {
        const { movie, onMovieClick } = this.props;

        return (
          <Col className="mb-4" md={3}>
            <Card>
             <Card.Img variant="top" src={movie.ImagePath} /> 
              <Card.Body>
              <Card.Title>{movie.Title}</Card.Title>
              <Card.Text>{movie.description}</Card.Text>
              <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
                <Button  variant="link">Open</Button>
              </Link>
              </Card.Body>
            </Card>
            </Col>
        ); 
    }
}

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
    Featured: PropTypes.bool,
  }).isRequired,
    onMovieClick: PropTypes.func.isRequired
  };