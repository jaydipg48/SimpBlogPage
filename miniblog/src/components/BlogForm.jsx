// BlogForm.js

import React, { useState, useEffect } from 'react';

const BlogForm = ({ onSave, isEditing, editId, posts }) => {
    const [id, setId] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        if (isEditing && editId) {
            const postToEdit = posts.find((post) => post.id === editId);
            if (postToEdit) {
                setId(postToEdit.id);
                setAuthor(postToEdit.author);
                setDescription(postToEdit.description);
                setImageUrl(postToEdit.imageUrl);
            }
        }
    }, [isEditing, editId, posts]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ id, author, description, imageUrl });
        setId('');
        setAuthor('');
        setDescription('');
        setImageUrl('');
    };

    return (
        <div>
            <h2>{isEditing ? 'Edit Post' : 'Add New Post'}</h2>
            <form onSubmit={handleSubmit}>
                {!isEditing && <input type="text" placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} />}
                <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
                <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <input type="text" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                <button type="submit">{isEditing ? 'Update' : 'Save'}</button>
            </form>
        </div>
    );
};

export default BlogForm;


