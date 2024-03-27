import React, { useState, useEffect } from 'react';

const BlogForm = ({ onSave, isEditing, editId, editedPost }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        if (isEditing && editedPost) {
            setTitle(editedPost.title);
            setAuthor(editedPost.author);
            setDescription(editedPost.description);
            setImageUrl(editedPost.imageUrl);
        }
    }, [isEditing, editedPost]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ title, author, description, imageUrl });
        setTitle('');
        setAuthor('');
        setDescription('');
        setImageUrl('');
    };

    return (
        <div className="blog-form">
            <h2>{isEditing ? 'Edit Post' : 'Add New Post'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="input-group">
                    <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
                </div>
                <div className="input-group">
                    <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="input-group">
                    <input type="text" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                </div>
                <button type="submit">{isEditing ? 'Update' : 'Save'}</button>
            </form>
        </div>
    );
};

export default BlogForm;
