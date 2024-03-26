import React, { useState, useEffect } from 'react';
import './App.css';
import BlogForm from './components/BlogForm';
import BlogList from './components/BlogList';

function App() {
  const [posts, setPosts] = useState(() => {
    // Initialize posts from local storage or an empty array if no data is found
    const storedPosts = localStorage.getItem('posts');
    return storedPosts ? JSON.parse(storedPosts) : [];
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    // Update local storage whenever posts state changes
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  const handleSavePost = (newPost) => {
    if (isEditing) {
      const updatedPosts = posts.map((post) => (post.id === editId ? { ...newPost, date: post.date } : post));
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
    const isConfirmed = window.confirm('Are you sure you want to delete this post?');
    if (isConfirmed) {
      setPosts(posts.filter((post) => post.id !== postId));
    }
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
