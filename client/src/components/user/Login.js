import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/AuthContext';

function Login(props) {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (authContext.isAuthenticated) {
      props.history.push('/posts');
    }
  }, [authContext.isAuthenticated]);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const { email, password } = user;

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    authContext.loginUser(user);
  };
  return (
    <div className='formContainer'>
      <h1>Account Login</h1>
      <form className='register-form' onSubmit={onSubmit}>
        <div>
          <label htmlFor='email'>E-Mail</label>
          <input
            type='text'
            name='email'
            value={email}
            required
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor='password'>Passowrd</label>
          <input
            type='password'
            name='password'
            value={password}
            required
            minLength='6'
            onChange={onChange}
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  );
}

export default Login;
