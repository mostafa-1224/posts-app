import { GET_POSTS, POSTS_LOAD_FAILED } from '../Types';

export default (state, action) => {
  switch (action.type) {
    case GET_POSTS:
      return [...action.payload];

    case POSTS_LOAD_FAILED:
      return [action.payload];

    default:
      return state;
  }
};
