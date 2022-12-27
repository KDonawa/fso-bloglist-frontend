import React, { useState } from "react";
import PropTypes from "prop-types";

function Blog({ blog, isOwner, updateLikes, deleteBlog }) {
  const [showDetails, setShowDetails] = useState(false);

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
        <span>{blog.title}</span> <span>{blog.author}</span>{" "}
        <button
          className="blog__view-btn"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? "hide" : "view"}
        </button>
      </div>
      {showDetails && (
        <>
          <div>{blog.url}</div>
          <div>
            <span className="blog__likes">likes: {blog.likes}</span>{" "}
            <button
              className="blog__like-btn"
              onClick={() => updateLikes(blog)}
            >
              like
            </button>
          </div>
          <div>{blog.user && blog.user.name}</div>
          {isOwner && <button onClick={handleDelete}>delete</button>}
        </>
      )}
    </div>
  );
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  // deleteBlog: PropTypes.func.isRequired,
  // isOwner: PropTypes.bool.isRequired,
};

export default Blog;
