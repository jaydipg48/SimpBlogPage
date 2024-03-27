import React, { useState } from 'react';

const BlogForm = ({ onSave, isEditing, editId, posts }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [errors, setErrors] = useState({});

    const getNextId = () => {
        const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const existingIds = posts.map(post => parseInt(post.id.slice(-4), 10));
        const maxId = Math.max(...existingIds, 0);
        const nextId = maxId + 1;
        const paddedNextId = String(nextId).padStart(4, '0');
        return `${currentDate}-${paddedNextId}`;
    };

    const handleSubmit = (e) => {
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
        }
        if (!imageUrl.trim()) {
            errors.imageUrl = 'Image URL is required';
        }

        if (Object.keys(errors).length === 0) {
            const id = getNextId();
            onSave({ id, title, author, description, imageUrl });
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
