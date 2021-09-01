import {
  ADD_POST,
  UPDATE_POST,
  DELETE_POST,
  SET_CURRENT,
  CLEAR_CURRENT,
  POST_ERROR,
  GET_POSTS,
  CLEAR_CONTACTS,
} from '../Types';

export default (state, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: [...action.payload],
      };
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case UPDATE_POST: {
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    }

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => {
          return post._id !== action.payload;
        }),
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return { ...state, current: null };
    case CLEAR_CONTACTS:
      return { ...state, posts: [] };
    case POST_ERROR:
      return { ...state, current: null };

    default:
      return state;
  }
};
