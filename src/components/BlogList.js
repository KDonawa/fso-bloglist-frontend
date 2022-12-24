function BlogList({ blogs }) {
  return (
    <>
      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );
}

const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author}
  </div>
);

export default BlogList;
