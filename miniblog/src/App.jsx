import React, { useState, useEffect } from 'react';
import './App.css';
import BlogForm from './components/BlogForm';
import BlogList from './components/BlogList';
import SearchBar from './components/SearchBar';

function App() {
  const [posts, setPosts] = useState(() => {
    const storedPosts = localStorage.getItem('posts');
    return storedPosts ? JSON.parse(storedPosts) : [];
  });
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editedPost, setEditedPost] = useState(null);

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  const handleSavePost = (newPost) => {
    if (isEditing) {
      const updatedPosts = posts.map(post => (post.id === editId ? { ...post, ...newPost } : post));
      setPosts(updatedPosts);
      setIsEditing(false);
      setEditId(null);
      setEditedPost(null);
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
    const postToEdit = posts.find(post => post.id === postId);
    setEditedPost(postToEdit);
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
      <BlogForm onSave={handleSavePost} isEditing={isEditing} editId={editId} editedPost={editedPost} />
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
