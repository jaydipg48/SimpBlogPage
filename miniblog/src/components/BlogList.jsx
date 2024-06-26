import React from 'react';

const BlogList = ({ posts, onDelete, onEdit, onDuplicate }) => {
    return (
        <div className="blog-list">
            {posts.map(post => (
                <div className="blog-post" key={post.id}>
                    <h3>ID: {post.id}</h3>
                    <h3>{post.title}</h3>
                    <p>Author: {post.author}</p>
                    <p>Description: {post.description}</p>
                    <p>Date: {new Date().toLocaleDateString()}</p> {/* Display current date */}
                    <img src={post.imageUrl} alt={post.title} />
                    <div className="button-group">
                        <button onClick={() => onDelete(post.id)}>Delete</button>
                        <button onClick={() => onEdit(post.id)}>Edit</button>
                        <button onClick={() => onDuplicate(post)}>Duplicate</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BlogList;
