import React, { useState, useEffect } from 'react';

const BlogForm = ({ onSave, isEditing, editId, posts }) => {
    const [id, setId] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [errors, setErrors] = useState({});

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

        const errors = {};
        if (!id.trim()) {
            errors.id = 'ID is required';
        } else if (!/^\d+$/.test(id)) {
            errors.id = 'ID must contain only digits';
        }
        if (!author.trim()) {
            errors.author = 'Name is required';
        } else if (!/^[a-zA-Z\s]+$/.test(author)) {
            errors.author = 'Name must contain only letters';
        }
        if (!description.trim()) {
            errors.description = 'Description is required';
        }
        if (!imageUrl.trim()) {
            errors.imageUrl = 'Image URL is required';
        }

        if (Object.keys(errors).length === 0) {
            // Save post data to local storage
            const newPost = { id, author, description, imageUrl };
            localStorage.setItem(id, JSON.stringify(newPost));

            // Pass post data to onSave function
            onSave(newPost);

            // Clear form fields
            setId('');
            setAuthor('');
            setDescription('');
            setImageUrl('');
        } else {
            setErrors(errors);
        }
    };

    return (
        <div className="blog-form">
            <h2>{isEditing ? 'Edit Post' : 'Add New Post'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <input type="text" placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} />
                    {errors.id && <span className="error">{errors.id}</span>}
                </div>
                <div className="input-group">
                    <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
                    {errors.author && <span className="error">{errors.author}</span>}
                </div>
                <div className="input-group">
                    <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    {errors.description && <span className="error">{errors.description}</span>}
                </div>
                <div className="input-group">
                    <input type="text" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                    {errors.imageUrl && <span className="error">{errors.imageUrl}</span>}
                </div>
                <button type="submit">{isEditing ? 'Update' : 'Save'}</button>
            </form>
        </div>
    );
};

export default BlogForm;
