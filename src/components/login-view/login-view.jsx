import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };
  const handleRegisterClick = (e) => {
    e.preventDefault();
    props.toRegister();
  };

  return (
    <Container> 
      <Card> 
        <Card.Body>
          <Card.Title>Login</Card.Title>
          <Form>
          <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
          </Form.Group>
         <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
          </Button>
          <Button type="submit" onClick={handleSubmit}>Register</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
//propTypes not PropTypes
LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired, 
  toRegister: PropTypes.func.isRequired
}
