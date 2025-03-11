import "./allBlogs.css";
import blogsData from "../../data/dummyBlogs.json";
import { useEffect, useState } from "react";
import blogsCategories from "../../data/blogsCategories.json";
import BlogCategories from "../../components/blogCategories/BlogCategories";
import { MdNoteAdd } from "react-icons/md";
import AllPageBlog from "../../components/allPageBlog/AllPageBlog";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

export default function AllBlogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    window.scrollTo({
      top: document.getElementById("allBlogs").offsetTop,
      behavior: "smooth",
    });

    async function getAllBlogs() {
      axios.get("/astro-mandeep/api/v1/get-blogs").then((res) => {
        const { blogs } = res.data;
        setBlogs(blogs);
      });
    }

    getAllBlogs();
  }, []);

  const user = useSelector((state) => state.user.user);
  console.log(user);

  return (
    <section className="allBlogs" id="allBlogs">
      <section className="blogs-top">
        <h1 className="title">Our Latest Blogs</h1>
        <section className="category-dropdown-container">
          <label htmlFor="category-dropdown">Category:</label>
          <select id="category-dropdown" className="category-dropdown">
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
        {user.name && (
          <section className="create-blog-button-container">
            <Link to={"/createBlog"} className="create-blog-small">
              <MdNoteAdd size={20} color="#D9D9D9" />
              <p>Create Blog</p>
            </Link>
          </section>
        )}
      </section>
      <section className="blogs-three-in-one">
        <section className="blogs-categories">
          {user.name && (
            <Link to={"/createBlog"} className="create-blog">
              <MdNoteAdd size={20} color="#D9D9D9" />
              <p>Create Blog</p>
            </Link>
          )}
          <h2 className="category-title sub-title">Categories</h2>
          <BlogCategories blogsCategories={blogsCategories} />
        </section>
        <section className="blogs-bottom">
          {blogs.map((blog) => {
            const { id, title, author, date, image } = blog;
            return <AllPageBlog key={id} {...blog} />;
          })}
        </section>
        <section className="top-blogs">
          <section className="popular-blogs">
            <h2 className="popular-blogs-title sub-title">Popular Blogs</h2>
          </section>
          <section className="popular-astro-blog-writers">
            <h2 className="popular-astro-blog-writers-title sub-title">
              Popular Blog Writers
            </h2>
          </section>
        </section>
      </section>
    </section>
  );
}
