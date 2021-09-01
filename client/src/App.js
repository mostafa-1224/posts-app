import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Posts from './components/posts/Posts';
import UserPosts from './components/userposts/UserPosts';
import Register from './components/user/Register';
import Login from './components/user/Login';
import NavBar from './components/navbar/NavBar';
import PrivateRoute from './components/routing/PrivateRoute';
import './App.css';

import AuthState from './context/auth/AuthState';
import PostsState from './context/posts/PostsState';
import UserPostsState from './context/userposts/UserPostsState';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AuthState>
      <PostsState>
        <UserPostsState>
          <Router>
            <NavBar />
            <Switch>
              <PrivateRoute exact path='/posts' component={Posts} />
              <PrivateRoute exact path='/myposts' component={UserPosts} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/Login' component={Login} />
            </Switch>
          </Router>
        </UserPostsState>
      </PostsState>
    </AuthState>
  );
}

export default App;
