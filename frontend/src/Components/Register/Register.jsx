import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import authApi from '../../apis/apiAuth';
import './register.css';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitForm = (e) => {
    e.preventDefault();

    const user = { username, password, email };
    authApi.registerUser(user, dispatch, navigate);
  };

  return (
    <section className="register-container">
      <div className="register-title"> Sign up </div>
      <form onSubmit={onSubmitForm}>
        <label>EMAIL</label>
        <input
          type="text"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>USERNAME</label>
        <input
          type="text"
          value={username}
          placeholder="Enter your username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>PASSWORD</label>
        <input
          type="password"
          value={password}
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit"> Create account </button>
      </form>
    </section>
  );
};

export default Register;
