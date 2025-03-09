import "./blogs.css";
import blogs from "../../data/dummyBlogs.json";
import Blog from "../../components/blog/Blog";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Blogs() {
  return (
    <section id="blogs" className="blogs">
      <section className="blogs-top">
        <h1 className="title">Our Latest Blogs</h1>
      </section>
      <section className="blogs-bottom">
        {blogs.map((blog) => {
          return <Blog key={blog.id} blog={blog} />;
        })}
      </section>
      <Link to={"/allBlogs"} className="blogs-more">
        <span>More Blogs</span> <FaArrowRight />
      </Link>
    </section>
  );
}
