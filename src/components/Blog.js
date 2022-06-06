import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, token, getUser, handleDelete, handleLike }) => {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen(!open);
    };

    const likeBlog = () => {
        handleLike(blog, token).then(() => {
            getUser();
        });
    };

    const deleteBlog = () => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            handleDelete(blog.id, token).then(() => {
                getUser();
            });
        }
    };

    return (
        <div
            clsssName="blog"
            style={{
                padding: '8px',
                border: 'solid',
                borderWidth: 1,
                marginBottom: 5,
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
                className="blog_info"
            >
                {blog.title} {blog.author}
                <button className="button" onClick={toggleOpen}>
                    {open ? 'hide' : 'detial'}
                </button>
            </div>
            {open ? (
                <div>
                    <div className="blog_url">
                        <a href={blog.url}>{blog.url}</a>
                    </div>
                    <div>
                        <span className="blog_likes">{blog.likes}</span>{' '}
                        <button onClick={likeBlog} className="button_like">
                            like
                        </button>
                    </div>
                    <button
                        style={{
                            borderColor: 'red',
                            backgroundColor: '#FFF',
                            color: 'red',
                            borderRadius: '3px',
                            margin: '5px 0',
                        }}
                        onClick={deleteBlog}
                    >
                        remove
                    </button>
                </div>
            ) : null}
        </div>
    );
};

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    token: PropTypes.string.isRequired,
    getUser: PropTypes.func.isRequired,
};

export default Blog;
