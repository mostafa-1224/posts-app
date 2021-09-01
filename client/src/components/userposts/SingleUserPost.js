import React, { useContext } from 'react';

import UserPostsContext from '../../context/userposts/UserPostsContext';

function SingleUserPost({ post }) {
  const userPostsContext = useContext(UserPostsContext);
  const { deletePost, setCurrent, clearCurrent } = userPostsContext;
  const onEditHandler = () => {
    setCurrent(post);
  };
  const onDeleteHandler = () => {
    deletePost(post._id);
    clearCurrent();
  };

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <button onClick={onEditHandler}>Edit</button>
      <button onClick={onDeleteHandler}>Delete</button>
    </div>
  );
}

export default SingleUserPost;
