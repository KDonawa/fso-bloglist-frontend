import { useState, useEffect } from "react";
import BlogList from "./components/BlogList";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";

const App = () => {
  const storageKey = "blogAppUser";
  const [notification, setNotification] = useState(null);
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const blogAppUserJSON = window.localStorage.getItem(storageKey);
    if (blogAppUserJSON) {
      const user = JSON.parse(blogAppUserJSON);
      setUser(user);
      blogService.setAuth(user.token);
    }
  }, []);

  function displayNotification(notification, timeoutSeconds = 5) {
    setNotification(notification);
    setTimeout(() => setNotification(null), timeoutSeconds * 1000);
  }

  async function addBlog(data) {
    try {
      const blog = await blogService.create(data);
      setBlogs(blogs.concat(blog));

      displayNotification({
        message: `A new blog - ${blog.title} by ${blog.author} was added!`,
        type: "success",
      });

      return true;
    } catch (error) {
      displayNotification({
        message: `A new blog could not be created`,
        type: "error",
      });

      return false;
    }
  }
  async function loginUser(credentials) {
    try {
      const user = await loginService.login(credentials);
      // save user credentials
      setUser(user);
      blogService.setAuth(user.token);
      window.localStorage.setItem(storageKey, JSON.stringify(user));

      displayNotification({
        message: "You have successfully logged in",
        type: "success",
      });

      return true;
    } catch (error) {
      displayNotification({
        message: "Invalid username or password",
        type: "error",
      });

      return false;
    }
  }
  function logoutUser() {
    setUser(null);
    window.localStorage.removeItem(storageKey);

    displayNotification({
      message: "You have successfully logged out",
      type: "success",
    });
  }

  return (
    <div>
      {notification && <Notification notification={notification} />}
      {user === null ? (
        <LoginForm loginUser={loginUser} />
      ) : (
        <>
          <p>{user.name} logged in</p>
          <button onClick={logoutUser}>Logout</button>
          <BlogList blogs={blogs} />
          <BlogForm addBlog={addBlog} />
        </>
      )}
    </div>
  );
};

export default App;
