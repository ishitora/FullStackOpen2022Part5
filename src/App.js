import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import userService from './services/user';
import loginService from './services/login';
import blogService from './services/blogs';
import CreateBlogFrom from './components/CreateBlogFrom';

const Notification = ({ notification }) => {
    return notification ? (
        <div
            className="notification"
            style={{
                border: '2px solid #000',
                borderColor:
                    notification.type === 'notification' ? 'green' : 'red',
                color: notification.type === 'notification' ? 'green' : 'red',
                borderRadius: '5px',
                fontSize: '25px',
                backgroundColor: '#ccc',
            }}
        >
            {notification.message}
        </div>
    ) : null;
};

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(() => {
        return localStorage.getItem('username') || null;
    });
    const [token, setToken] = useState(() => {
        return localStorage.getItem('token') || null;
    });

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [notification, setNotification] = useState(null);

    const getUser = async () => {
        if (user) {
            const res = await userService.getUser(user);
            setBlogs(res.blogs);
        }
    };
    useEffect(() => {
        getUser();
    }, [user]);

    const displayNotification = (message, type = 'notification') => {
        setNotification({ type, message });
        setTimeout(() => {
            setNotification(null);
        }, 10000);
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        const res = await loginService.login({ username, password });
        if (res?.username) {
            setUser(res?.username);
            setToken(res?.token);
            localStorage.setItem('username', res?.username);
            localStorage.setItem('token', res?.token);
        } else {
            displayNotification('wrong username or password', 'error');
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('username');
        localStorage.removeItem('token');
    };

    if (!user) {
        return (
            <form onSubmit={handleLogin}>
                <h2>log in to APP</h2>
                <Notification notification={notification} />
                <div>
                    username
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        className="username_input"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        className="password_input"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        );
    }

    return (
        <div>
            <h2>blogs</h2>
            <Notification notification={notification} />
            <p>{user} logged in</p>
            <button onClick={logout}>logout</button>

            <CreateBlogFrom
                displayNotification={displayNotification}
                token={token}
                getUser={getUser}
                createBlog={blogService.addBlog}
            />

            {blogs
                .sort((a, b) => b.likes - a.likes)
                .map((blog) => (
                    <Blog
                        key={blog.id}
                        blog={blog}
                        token={token}
                        getUser={getUser}
                        handleLike={blogService.likeBlog}
                        handleDelete={blogService.deleteBlog}
                    />
                ))}
        </div>
    );
};

export default App;
