import React, { useContext, useEffect } from 'react';
import SingleUserPost from './SingleUserPost';
import PostForm from './PostForm';

import UserPostsContext from '../../context/userposts/UserPostsContext';
import AuthContext from '../../context/auth/AuthContext';

function UserPosts() {
  const authContext = useContext(AuthContext);
  const userPostsContext = useContext(UserPostsContext);
  const { userPosts, getPosts } = userPostsContext;
  console.log(userPosts, 'from component');
  useEffect(() => {
    authContext.loadUser();
    getPosts();
  }, []);
  return (
    <div>
      <PostForm />
      {userPosts.length !== 0 ? (
        userPosts.map((post) => {
          return <SingleUserPost post={post} key={post._id} />;
        })
      ) : (
        <p>No Posts To See</p>
      )}
    </div>
  );
}

export default UserPosts;
