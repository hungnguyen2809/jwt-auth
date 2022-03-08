import React from 'react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import authApi from '../../apis/apiAuth';
import { useDispatch } from 'react-redux';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitForm = (e) => {
    e.preventDefault();

    const user = { username, password };
    authApi.loginUser(user, dispatch, navigate);
  };

  return (
    <section className="login-container">
      <div className="login-title"> Log in</div>
      <form onSubmit={onSubmitForm}>
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
        <button type="submit"> Continue </button>
      </form>
      <div className="login-register"> Don't have an account yet? </div>
      <Link className="login-register-link" to="/register">
        Register one for free
      </Link>
    </section>
  );
};

export default Login;
