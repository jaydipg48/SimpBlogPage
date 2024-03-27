import React, { useState, useEffect } from 'react';
import './App.css';
import BlogForm from './components/BlogForm';
import BlogList from './components/BlogList';
import SearchBar from './components/SearchBar';

function App() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    // Fetch or load posts from local storage or an API
    // For example, you can load posts from localStorage:
    const savedPosts = localStorage.getItem('posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
  }, []);

  const handleSavePost = (newPost) => {
    if (isEditing) {
      const updatedPosts = posts.map(post => (post.id === editId ? newPost : post));
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
      const updatedPosts = posts.filter(post => post.id !== postId);
      setPosts(updatedPosts);
    }
  };

  const handleEditPost = (postId) => {
    setIsEditing(true);
    setEditId(postId);
  };

  const handleDuplicatePost = (postId) => {
    const postToDuplicate = posts.find(post => post.id === postId);
    if (postToDuplicate) {
      const newPost = { ...postToDuplicate, id: generateUniqueId() };
      setPosts(prevPosts => [...prevPosts, newPost]);
    }
  };

  const handleSearch = (query, field) => {
    const filtered = posts.filter(post =>
      post[field].toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  return (
    <div className="App">
      <h1>Simple Blog App</h1>
      <SearchBar onSearch={handleSearch} />
      <BlogForm onSave={handleSavePost} isEditing={isEditing} editId={editId} posts={posts} />
      <BlogList posts={filteredPosts.length > 0 ? filteredPosts : posts} onDelete={handleDeletePost} onEdit={handleEditPost} onDuplicate={handleDuplicatePost} />
    </div>
  );
}

export default App;

// Function to generate a unique ID based on the current date and time
const generateUniqueId = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const milliseconds = String(date.getMilliseconds()).padStart(3, '0');
  return `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;
};
