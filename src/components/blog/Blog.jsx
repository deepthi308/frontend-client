import "./blog.css";
import { motion } from "framer-motion";
import { IoMdThumbsUp } from "react-icons/io";
import { FaCommentDots } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { FaShareFromSquare } from "react-icons/fa6";
import { FaDownload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Blog({ blog }) {
  const { image, title, author, date } = blog;

  const navigate = useNavigate();

  const handleDisplayBlogDetails = (title) => {
    const formattedTitle = title.replace(/\s+/g, "-");
    navigate(`/blog/${formattedTitle}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="blog"
      onClick={() => handleDisplayBlogDetails(title)}
    >
      <section className="blogContainer-top">
        <img src={image} alt="Blog Image" />
      </section>
      <section className="blogContainer-bottom">
        <h3 className="blog-title">{title}</h3>
      </section>
      <section className="blogContainer-footer">
        <section className="blogContainer-footer-top">
          <p className="para author">{author}</p>
          <p className="para date">{date}</p>
        </section>
        <section className="blogContainer-footer-bottom">
          <section className="blogContainer-footer-bottom-left">
            <section className="likes">
              <IoMdThumbsUp size={20} color="#a72005da" />
              <p className="likes-count">222</p>
            </section>
            <section className="comments">
              <FaCommentDots size={18} color="#a72005da" />
              <p className="comments-count">222</p>
            </section>
          </section>
          <section className="blogContainer-footer-bottom-right">
            <section className="views">
              <FaEye size={18} color="#d9d9d9" />
              <p className="views-count">222</p>
            </section>
            <section className="shares">
              <FaShareFromSquare size={18} color="#a72005da" />
              <p className="shares-count">222</p>
            </section>
            <section className="downloads">
              <FaDownload
                size={18}
                color="#a72005da"
                fontWeight={"sem--bold"}
              />
              <p className="downloads-count">222</p>
            </section>
          </section>
        </section>
      </section>
    </motion.div>
  );
}
