import React from 'react';

const BlogList = ({ posts, onDelete, onEdit, onDuplicate }) => {
    return (
        <div className="blog-list">
            {posts.map(post => (
                <div className="blog-post" key={post.id}>
                    <h3>{post.title}</h3>
                    <p>Author: {post.author}</p>
                    <p>Description: {post.description}</p>
                    <p>Date:{post.date}</p>
                    <img src={post.imageUrl} alt={post.title} />
                    <div className="button-group">
                        <button onClick={() => onDelete(post.id)}>Delete</button>
                        <button onClick={() => onEdit(post.id)}>Edit</button>
                        <button onClick={() => onDuplicate(post.id)}>Duplicate</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BlogList;
