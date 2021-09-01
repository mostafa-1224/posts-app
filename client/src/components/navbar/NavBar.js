import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../../context/auth/AuthContext';
import UserPostsContext from '../../context/userposts/UserPostsContext';

function NavBar() {
  const authContext = useContext(AuthContext);
  const userPostsContext = useContext(UserPostsContext);
  const { clearContacts } = userPostsContext;
  const onLogout = () => {
    authContext.logout();
    clearContacts();
  };
  const authLinks = (
    <Fragment>
      <li>Hello {authContext.user && authContext.user.name}</li>
      <li>
        <Link style={{ textDecoration: 'none', color: 'black' }} to='/'>
          Home
        </Link>
      </li>
      <li>
        <Link style={{ textDecoration: 'none', color: 'black' }} to='/posts'>
          posts
        </Link>
      </li>
      <li>
        <Link style={{ textDecoration: 'none', color: 'black' }} to='/myposts'>
          My-Posts
        </Link>
      </li>
      <li>
        <a onClick={onLogout} href='#!'>
          Logout
        </a>
      </li>
    </Fragment>
  );
  const guestLinks = (
    <Fragment>
      <li>
        <Link style={{ textDecoration: 'none', color: 'black' }} to='/login'>
          Login
        </Link>
      </li>
      <li>
        <Link style={{ textDecoration: 'none', color: 'black' }} to='/register'>
          Register
        </Link>
      </li>
    </Fragment>
  );
  return (
    <div className='navbar'>
      <h1>Drake</h1>
      <ul>{authContext.isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
}

export default NavBar;
