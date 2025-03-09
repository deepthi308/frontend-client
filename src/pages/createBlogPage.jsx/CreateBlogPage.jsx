import "./createBlogPage.css";

import { useState } from "react";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function CreateBlogPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Blog submitted", { title, content });
  };

  return (
    <div className="create-blog-page">
      <div className="navbar">
        <Link to="/" className="back-to-home">
          Back to Home
        </Link>
      </div>

      <div className="create-blog-form">
        <h2 className="page-title">Create Your Blog</h2>

        <form onSubmit={handleSubmit} className="blog-form">
          <div className="form-group">
            <label htmlFor="title">Blog Title</label>
            <input
              type="text"
              id="title"
              className="title-input"
              value={title}
              onChange={handleTitleChange}
              placeholder="Enter your blog title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Blog Content</label>
            <ReactQuill
              value={content}
              onChange={handleContentChange}
              className="quill-editor"
              theme="snow"
              placeholder="Start writing your blog here..."
            />
          </div>

          <button type="submit" className="submit-button">
            Submit Blog
          </button>
        </form>
      </div>
    </div>
  );
}
