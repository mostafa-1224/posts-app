import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/AuthContext';

function Register(props) {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (authContext.isAuthenticated) {
      props.history.push('/posts');
    }
  }, [authContext.isAuthenticated]);
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const { name, email, password, password2 } = user;

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    authContext.register({
      name,
      email,
      password,
    });
  };
  return (
    <div className='formContainer'>
      <h1>Account Register</h1>
      <form className='register-form' onSubmit={onSubmit}>
        <div>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            required
            value={name}
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor='email'>E-Mail</label>
          <input
            type='text'
            name='email'
            required
            value={email}
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
        <div>
          <label htmlFor='password2'>Confirm Password</label>
          <input
            type='password'
            name='password2'
            value={password2}
            required
            minLength='6'
            onChange={onChange}
          />
        </div>
        <button type='submit'>Register</button>
      </form>
    </div>
  );
}

export default Register;
