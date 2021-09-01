import React, { useContext, useEffect } from 'react';
import SinglePost from './SinglePost';
import PostsContext from '../../context/posts/PostsContext';
import AuthContext from '../../context/auth/AuthContext';
function Posts() {
  const authContext = useContext(AuthContext);
  const postsContext = useContext(PostsContext);
  const { state, getPosts } = postsContext;
  useEffect(() => {
    authContext.loadUser();
    getPosts();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      {state.length ? (
        state.map((post) => {
          return <SinglePost post={post} key={post._id} />;
        })
      ) : (
        <p>No Posts To See</p>
      )}
    </div>
  );
}

export default Posts;
