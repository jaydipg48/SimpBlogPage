import React from 'react';

const BlogList = ({ posts, onDelete, onEdit }) => {
    return (
        <div>
            <h2>Blog Posts</h2>
            {posts.map((post) => (
                <div key={post.id}>
                    <p>ID: {post.id}</p>
                    <p>Name: {post.author}</p>
                    <p>Date: {post.date}</p>
                    <p>Description: {post.description}</p>
                    <img src={post.imageUrl} alt={post.author} />
                    <button onClick={() => onDelete(post.id)}>Delete</button>
                    <button onClick={() => onEdit(post.id)}>Edit</button>
                </div>
            ))}
        </div>
    );
};

export default BlogList;
