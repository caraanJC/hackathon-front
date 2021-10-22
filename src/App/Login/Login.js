import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

const Login = () => {
  const [loginCredentials, setLoginCredentials] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const history = useHistory();

  const changeInput = (e) => {
    setLoginCredentials({
      ...loginCredentials,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:8000/api/auth/login', loginCredentials)
      .then((res) => {
        if (res.data.success) {
          dispatch({ type: 'SET_TOKEN', payload: res.data.token });
          dispatch({ type: 'SET_USER', payload: res.data.user });
          setLoginCredentials({
            email: '',
            password: '',
          });

          alert('Login Successful');

          history.push('/shop');
        } else {
          alert(res.data.message);
        }
      });
  };

  return (
    <div className="login">
      <div className="login__container">
        <span className="close">X</span>
        <div className="login__head">
          <h4>Login to your account</h4>
          <p>Create a new account</p>
        </div>
        <form className="login__body" onSubmit={submitForm}>
          <div className="input">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={loginCredentials.email}
              onChange={changeInput}
              required
            />
          </div>
          <div className="input">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={loginCredentials.password}
              onChange={changeInput}
              required
            />
          </div>
          <button className="btn btn-accent" to="/shop">
            Login
          </button>
        </form>
        <div className="login__body">
          <p className="login__or">or</p>
          <Link className="btn btn-border-accent text-accent-dark" to="/signup">
            Create new Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
