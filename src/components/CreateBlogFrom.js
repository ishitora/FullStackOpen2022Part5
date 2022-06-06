import { useState, useRef } from 'react';
import Togglable from './Togglable';

const CreateBlogFrom = ({
    token,
    displayNotification,
    getUser,
    createBlog,
}) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const createBlogFormRef = useRef();

    // const handleAddBlog = async (event) => {
    //     event.preventDefault();
    //     const res = await blogService.addBlog({ title, author, url }, token);
    //     if (res?.title) {
    //         displayNotification('add new blog success');
    //         getUser();
    //         createBlogFormRef.current.toggleVisibility();
    //     }
    // };

    const handleAddBlog = async (event) => {
        event.preventDefault();
        const res = await createBlog({ title, author, url }, token);
        if (res?.title) {
            displayNotification('add new blog success');
            getUser();
            createBlogFormRef.current.toggleVisibility();
            setTitle('');
            setAuthor('');
            setUrl('');
        }
    };

    return (
        <Togglable buttonLabel="new blog" ref={createBlogFormRef}>
            <form onSubmit={handleAddBlog}>
                <h2>create new blog</h2>

                <div>
                    title
                    <input
                        type="text"
                        value={title}
                        name="title"
                        onChange={({ target }) => setTitle(target.value)}
                        placeholder="enter title"
                    />
                </div>
                <div>
                    author
                    <input
                        type="text"
                        value={author}
                        name="author"
                        onChange={({ target }) => setAuthor(target.value)}
                        placeholder="enter author"
                    />
                </div>
                <div>
                    url
                    <input
                        type="text"
                        value={url}
                        name="url"
                        onChange={({ target }) => setUrl(target.value)}
                        placeholder="enter url"
                    />
                </div>
                <button className="add_button" type="submit">
                    create
                </button>
            </form>
        </Togglable>
    );
};

export default CreateBlogFrom;
