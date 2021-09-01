import React, { useReducer } from 'react';
import axios from 'axios';
import UserPostsContext from './UserPostsContext';
import UserPostsReducer from './UserPostsReducer';
import setAuthToken from '../../utils/setAuthToken';

import {
  GET_POSTS,
  ADD_POST,
  UPDATE_POST,
  DELETE_POST,
  SET_CURRENT,
  CLEAR_CURRENT,
  POST_ERROR,
  CLEAR_CONTACTS,
} from '../Types';

const UserPostsState = (props) => {
  const initialState = {
    posts: [],
    current: null,
  };

  const [state, dispatch] = useReducer(UserPostsReducer, initialState);
  // Get user posts
  const getPosts = async () => {
    try {
      const res = await axios.get('/api/posts/user');
      dispatch({ type: GET_POSTS, payload: res.data });
    } catch (error) {}
  };
  // Add Post
  const addPost = async (post) => {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };
    try {
      const res = await axios.post('/api/posts', post, config);
      dispatch({ type: ADD_POST, payload: res.data });
    } catch (error) {
      dispatch({ type: POST_ERROR, payload: error.response.msg });
    }
  };
  // Update Post
  const updatePost = async ({ id, title, content }) => {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };
    try {
      const res = await axios.put(
        `/api/posts/${id}`,
        { title, content },
        config
      );
      console.log(res.data, 'statw');

      dispatch({ type: UPDATE_POST, payload: res.data });
    } catch (error) {
      dispatch({ type: POST_ERROR, payload: error.response.msg });
    }
  };
  // Delete Post
  const deletePost = async (id) => {
    try {
      await axios.delete(`/api/posts/${id}`);
      dispatch({ type: DELETE_POST, payload: id });
    } catch (error) {
      console.log(error.response.msg);
    }
  };
  // Set current
  const setCurrent = (post) => {
    dispatch({ type: SET_CURRENT, payload: post });
  };
  // Clear Current
  const clearCurrent = (id) => {
    dispatch({ type: CLEAR_CURRENT });
  };
  // Edit post

  // Clear Contacts
  const clearContacts = () => {
    dispatch({ type: CLEAR_CONTACTS });
  };

  return (
    <UserPostsContext.Provider
      value={{
        userPosts: state.posts,
        current: state.current,
        addPost,
        updatePost,
        deletePost,
        setCurrent,
        clearCurrent,
        getPosts,
        clearContacts,
      }}
    >
      {props.children}
    </UserPostsContext.Provider>
  );
};

export default UserPostsState;
