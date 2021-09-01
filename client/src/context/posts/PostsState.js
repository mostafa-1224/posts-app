import axios from 'axios';
import React, { useReducer } from 'react';

import { GET_POSTS, POSTS_LOAD_FAILED } from '../Types';

import PostsContext from './PostsContext';
import PostsReducer from './PostsReducer';

const PostsState = (props) => {
  const initialState = [];

  const [state, dispatch] = useReducer(PostsReducer, initialState);

  // Get All Posts in the DB
  const getPosts = async () => {
    try {
      const res = await axios.get('/api/posts');
      dispatch({ type: GET_POSTS, payload: res.data });
    } catch (error) {
      dispatch({ type: POSTS_LOAD_FAILED, payload: error.response.data });
    }
  };
  return (
    <PostsContext.Provider value={{ state, getPosts }}>
      {props.children}
    </PostsContext.Provider>
  );
};

export default PostsState;
