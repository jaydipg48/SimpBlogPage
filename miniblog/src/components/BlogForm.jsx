import React, { useState } from 'react';

const BlogForm = ({ onSave, isEditing, editId }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [errors, setErrors] = useState({});

    const checkImageValidity = async (url) => {
        try {
            const response = await fetch(url);
            const contentType = response.headers.get('content-type');
            return contentType && contentType.startsWith('image');
        } catch (error) {
            console.error('Error checking image validity:', error);
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = {};
        if (!title.trim()) {
            errors.title = 'Title is required';
        }
        if (!author.trim()) {
            errors.author = 'Author is required';
        } else if (!/^[a-zA-Z\s]+$/.test(author)) {
            errors.author = 'Author must contain only letters';
        }
        if (!description.trim()) {
            errors.description = 'Description is required';
        } else if (description.length < 25) {
            errors.description = 'Description must be at least 25 characters';
        }
        if (!imageUrl.trim()) {
            errors.imageUrl = 'Image URL is required';
        } else {
            const isValidImageUrl = await checkImageValidity(imageUrl);
            if (!isValidImageUrl) {
                errors.imageUrl = 'Invalid image URL';
            }
        }

        if (Object.keys(errors).length === 0) {
            onSave({ title, author, description, imageUrl });
            setTitle('');
            setAuthor('');
            setDescription('');
            setImageUrl('');
            setErrors({});
        } else {
            setErrors(errors);
        }
    };

    return (
        <div className="blog-form">
            <h2>{isEditing ? 'Edit Post' : 'Add New Post'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    {errors.title && <span className="error">{errors.title}</span>}
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
