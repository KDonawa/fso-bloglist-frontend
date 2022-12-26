import React, { useState } from "react";
import blogService from "../services/blogs";
import PropTypes from "prop-types";

function BlogList({ blogs, setBlogs, user }) {
  async function deleteBlog(id) {
    try {
      await blogService.remove(id);
      setBlogs(blogs.filter((blog) => blog.id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  blogs.sort((a, b) => b.likes - a.likes);

  return (
    <>
      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          deleteBlog={() => deleteBlog(blog.id)}
          isOwner={user && user.id === blog.user.id}
        />
      ))}
    </>
  );
}

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

function Blog({ blog, deleteBlog, isOwner }) {
  const [showDetails, setShowDetails] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  async function updateLikes() {
    try {
      await blogService.update(blog.id, { likes: likes + 1 });
      setLikes((current) => current + 1);
    } catch (error) {
      console.log(error);
    }
  }

  function handleDelete() {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog();
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? "hide" : "view"}
        </button>
      </div>
      {showDetails && (
        <>
          <div>{blog.url}</div>
          <div>
            likes {likes} <button onClick={updateLikes}>like</button>{" "}
          </div>
          <div>{blog.user.name}</div>
          {isOwner && <button onClick={handleDelete}>delete</button>}
        </>
      )}
    </div>
  );
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  isOwner: PropTypes.bool.isRequired,
};

export default BlogList;
