import React, { useState, useContext, useEffect } from 'react';

import UserPostsContext from '../../context/userposts/UserPostsContext';

function PostForm() {
  const userPostsContext = useContext(UserPostsContext);
  const { addPost, updatePost, clearCurrent, current } = userPostsContext;

  useEffect(() => {
    if (current !== null) {
      setPost({
        postTitle: current.title,
        postDetails: current.content,
      });
    } else {
      setPost({
        postTitle: '',
        postDetails: '',
      });
    }
  }, [userPostsContext, current]);

  const [post, setPost] = useState({
    postTitle: '',
    postDetails: '',
  });
  const { postTitle, postDetails } = post;

  const onSubmit = (e) => {
    e.preventDefault();
    if (postTitle === '' || postDetails === '') return;
    if (current !== null) {
      console.log({
        id: current._id,
        title: postTitle,
        content: postDetails,
      });
      updatePost({
        id: current._id,
        title: post.postTitle,
        content: post.postDetails,
      });
      clearCurrent();
    } else {
      addPost({
        title: postTitle,
        content: postDetails,
      });
      clearCurrent();
    }

    setPost({
      postTitle: '',
      postDetails: '',
    });
  };
  const onChange = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        type='text'
        value={postTitle}
        placeholder='Post Title'
        name='postTitle'
        onChange={onChange}
      />
      <input
        type='text'
        value={postDetails}
        placeholder='Post Details'
        name='postDetails'
        onChange={onChange}
      />
      <input type='submit' value={current ? 'Update post' : 'Add post'} />
      {current && <button onClick={clearCurrent}>Cancel</button>}
    </form>
  );
}

export default PostForm;
