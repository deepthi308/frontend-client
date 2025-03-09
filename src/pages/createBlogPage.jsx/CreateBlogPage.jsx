import React, { useState } from "react";
import ReactQuill from "react-quill"; // React wrapper for Quill
import "react-quill/dist/quill.snow.css"; // Import styles for the snow theme
import "./createBlogPage.css";

const CreateBlogPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Blog Submitted with Title:", title);
    console.log("Blog Content:", content);
    // Handle form submission logic here (e.g., send data to the backend)
  };

  return (
    <div className="create-blog-page">
      <h1 className="title">Create Blog</h1>
      <form className="create-blog-form" onSubmit={handleSubmit}>
        <section className="create-blog-form-group">
          <label htmlFor="blog-title-input">Blog Title:</label>
          <input
            id="blog-title-input"
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="title-input"
          />
        </section>

        <div className="editor-container">
          <ReactQuill
            value={content}
            onChange={handleContentChange}
            modules={{
              toolbar: [
                [{ header: "1" }, { header: "2" }, { font: [] }],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ align: [] }],
                ["bold", "italic", "underline"],
                ["link", "image"],
                ["blockquote", "code-block"],
                [{ script: "sub" }, { script: "super" }],
                [{ indent: "-1" }, { indent: "+1" }],
                [{ direction: "rtl" }],
              ],
            }}
            placeholder="Write your content here..."
          />
        </div>

        <button type="submit" className="submit-btn">
          Submit Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlogPage;
