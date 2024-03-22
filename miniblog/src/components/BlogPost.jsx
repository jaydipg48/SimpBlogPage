// BlogPost.js

import React from 'react';

const BlogPost = ({ post, onDelete, onUpdate }) => {
    return (
        <div>
            <h3>{post.author}</h3>
            <p>{post.description}</p>
            <img src={post.imageUrl} alt={post.author} />
            <button onClick={() => onDelete(post.id)}>Delete</button>
            <button onClick={() => onUpdate(post.id)}>Update</button>
        </div>
    );
};

export default BlogPost;
