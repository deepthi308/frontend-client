import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./createBlogPage.css";
import { useSelector } from "react-redux";
import { MdFileUpload } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BlogCategories from "../../components/blogCategories/BlogCategories";
import blogsCategories from "../../data/blogsCategories.json";

const CreateBlogPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState("");
  const [base64Image, setBase64Image] = useState("");
  const [category, setCategory] = useState("Tarot");
  const user = useSelector((state) => state.user.user);

  const navigate = useNavigate();

  const handleCategoryChange = (target) => {
    setCategory(target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  console.log(category);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Blog Submitted with Title:", title);
    // console.log("Blog Content:", content);

    const CLOUD_NAME = "drfzvtxg9";
    const UPLOAD_PRESET = "kyloimtt";

    const formData = new FormData();
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("file", file);
    // console.log("Profile", profilePicture);
    axios
      .post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      )
      .then((uploadResponse) => {
        const imageUrl = uploadResponse.data.secure_url;

        const blog = {
          title,
          content,
          author: user.name,
          category: category,
          image: imageUrl,
        };

        axios
          .post("/astro-mandeep/api/v1/create-blog", blog)
          .then((res) => {
            const { type, message } = res.data;
            console.log(type, message);
            if (type === "success") {
              toast[type](message);
              navigate("/allBlogs");
            } else {
              toast[type](message);
            }
          })
          .catch((error) => {
            toast[error.response.data.type](error.response.data.message);
          });
      });

    // Handle form submission logic here (e.g., send data to the backend)
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64Image(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  // const handleCategoryChange = () => {};

  return (
    <div className="create-blog-page">
      <h1 className="title">Create Blog</h1>
      <form className="create-blog-form" onSubmit={handleSubmit}>
        {base64Image && (
          <img
            src={base64Image}
            alt="Blog Thumbnail"
            width={"200px"}
            className="thumbnail_image"
            style={{ borderRadius: "10px" }}
          />
        )}
        <section className="create-blog-form-group">
          <label htmlFor="blog-title-input">Blog Title:</label>
          <input
            id="blog-title-input"
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="title-input"
            maxLength={99}
          />
        </section>

        <div className="editor-container">
          <ReactQuill
            value={content}
            onChange={handleContentChange}
            modules={{
              toolbar: [
                [
                  { header: "1" },
                  { header: "2" },
                  { header: "3" },
                  { font: [] },
                ],
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

        <section className="category-dropdown-container2">
          <label htmlFor="category-dropdown">Category:</label>
          <select
            id="category-dropdown"
            className="category-dropdown"
            onChange={({ target }) => handleCategoryChange(target)}
          >
            {blogsCategories.map((blogCat) => {
              return (
                <option
                  key={blogCat.id}
                  className="category-option"
                  value={blogCat.name}
                >
                  {blogCat.name}
                </option>
              );
            })}
          </select>
        </section>

        <section
          className="create-blog-form-group"
          style={{ margin: "auto 0" }}
        >
          <label
            htmlFor="blog-thumbnail-input"
            className="blog-thumbnail-upload"
          >
            <span>Upload Thumbnail</span>
            <MdFileUpload size={22} />
          </label>
        </section>
        <input
          id="blog-thumbnail-input"
          type="file"
          style={{ display: "none" }}
          onChange={handleProfilePictureChange}
        />

        <button type="submit" className="submit-btn">
          Submit Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlogPage;
