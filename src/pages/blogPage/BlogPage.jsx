import { useParams } from "react-router-dom";
import "./blogPage.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function BlogPage() {
  const { title } = useParams();

  const [blog, setBlog] = useState({});

  useEffect(() => {
    window.scrollTo({
      top: document.getElementById("blogPage").offsetTop,
      behavior: "smooth",
    });

    axios.get(`/astro-mandeep/api/v1/get-blog/${title}`).then((res) => {
      const { blog } = res.data;
      setBlog(blog);
    });
  }, [title]);

  console.log(blog.content);

  return (
    <section className="blogPage" id="blogPage">
      <h1 className="blog-detail-title title">{blog.title}</h1>
      <section
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </section>
  );
}
