import React, { useState } from 'react';
import PropTypes from 'prop-types'; 
import {Form, Card, Row, Col, Container, CardGroup, Button} from 'react-bootstrap/';
import { useNavigate } from "react-router-dom";

export function RegistrationView(props) {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState(""); 

    const navigate = useNavigate()

    const handleSubmit = (e) => {
      e.preventDefault(); 
      console.log(name, username, password, email, birthday); 
      props.onRegistration({name, username, password, email, birthday});
      navigate("/") 
    }

return (
  <Container>
    <Row>
      <Col md={5}>
        <CardGroup>
          <Card>
          <Card.Body>
          <Card.Title>Registration</Card.Title>
          <Form>
          <Form.Group>
          <Form.Label>Name:</Form.Label>
          <Form.Control 
            type="text" 
            value={name} 
            onChange={e => setName(e.target.value)} 
            placeholder="Enter a name" 
           />
          </Form.Group>

          <Form.Group>
          <Form.Label>Username:</Form.Label>
         <Form.Control  
            type="text" 
            value={username} 
            onChange={e => setUsername(e.target.value)} 
            required
            placeholder="Enter a username"
            />
        </Form.Group>

        <Form.Group>
        <Form.Label>Password:</Form.Label>
        <Form.Control
           type="password" 
           value={password} 
           onChange={e => setPassword(e.target.value)} 
           required 
           placeholder="Enter a password"
           />
        </Form.Group>

        <Form.Group>
       <Form.Label>Email:</Form.Label>
        <Form.Control 
          type="email" 
          value={email}  
          onChange={e => setEmail(e.target.value)}
          required
          placeholder="Enter an email"
          />
        </Form.Group>   

        <Form.Group>
        <Form.Label>Birthday:</Form.Label>
        <Form.Control 
          type="birthday"
          value={birthday} 
          onChange={e => setBirthday(e.target.value)} 
          placeholder="Enter a birthday"
         />
        </Form.Group>
     
        <Button type="submit" onClick={handleSubmit}>Register</Button>
        <Button type="button" onClick={() => {
          navigate("/")
        }}>Return to Login Page</Button>
        </Form>
        </Card.Body>
        </Card>
       </CardGroup>
      </Col>
    </Row>
  </Container>
  );
}; 

RegistrationView.propTypes = {
  onRegistration: PropTypes.func.isRequired
};
