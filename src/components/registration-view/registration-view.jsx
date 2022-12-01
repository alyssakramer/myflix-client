import React, { useState } from 'react';
import PropTypes from 'prop-types'; 
import { useState } from 'react';

export function RegistrationView(props) {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(""); 
    const [birthday, setBirthday] = useState(""); 

    const handleSubmit = (e) => {
      e.preventDefault(); 
      console.log(name, username, password, email, birthday); 
      props.onRegistration({name, username, password, email, birthday}); 
    }

return (
    <form>
      <h1>New User Registration</h1>
      <label>
        Name:
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
      </label>
      <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <label>
        Birthday:
        <input type="birthday" value={birthday} onChange={e => setBirthday(e.target.value)} />
      </label>
      <button type="submit" onClick={handleSubmit}>Register</button>
      <button type="button" onClick={() => {props.onBackClick(null);}}>Return to Login Page</button>
    </form>
  );
}; 

RegistrationView.propTypes = {
  onRegistration: PropTypes.func.isRequired,
  onBackClick: PropTypes.func.isRequired
};
