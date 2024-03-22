// App.js

import React, { useState } from 'react';
import './App.css';
import BlogForm from './components/BlogForm';
import BlogList from './components/BlogList';

function App() {
  const [posts, setPosts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleSavePost = (newPost) => {
    if (isEditing) {
      const updatedPosts = posts.map((post) => (post.id === editId ? newPost : post));
      setPosts(updatedPosts);
      setIsEditing(false);
      setEditId(null);
    } else {
      const id = Date.now().toString();
      const date = new Date().toLocaleDateString();
      setPosts([...posts, { ...newPost, id, date }]);
    }
  };

  const handleDeletePost = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  const handleEditPost = (postId) => {
    setIsEditing(true);
    setEditId(postId);
  };

  return (
    <div className="App">
      <h1>Simple Blog App</h1>
      <BlogForm onSave={handleSavePost} isEditing={isEditing} editId={editId} posts={posts} />
      <BlogList posts={posts} onDelete={handleDeletePost} onEdit={handleEditPost} />
    </div>
  );
}

export default App;
