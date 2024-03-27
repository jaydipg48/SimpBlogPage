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
      const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      const existingIds = posts.map(post => parseInt(post.id.slice(-4), 10));
      const maxId = Math.max(...existingIds, 0);
      const newId = `${currentDate}-${("0000" + (maxId + 1)).slice(-4)}`;
      setPosts([...posts, { ...newPost, id: newId }]);
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

  const handleDuplicatePost = (postToDuplicate) => {
    const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const existingIds = posts.map(post => parseInt(post.id.slice(-4), 10));
    const maxId = Math.max(...existingIds, 0);
    const newId = `${currentDate}-${("0000" + (maxId + 1)).slice(-4)}`;
    setPosts([...posts, { ...postToDuplicate, id: newId }]);
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
      <BlogList
        posts={filteredPosts.length > 0 ? filteredPosts : posts}
        onDelete={handleDeletePost}
        onEdit={handleEditPost}
        onDuplicate={handleDuplicatePost}
      />
    </div>
  );
}

export default App;
