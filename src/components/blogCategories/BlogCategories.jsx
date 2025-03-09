import BlogCategory from "../blogCategory/BlogCategory";
import "./blogCategories.css";

export default function BlogCategories({ blogsCategories }) {
  console.log(blogsCategories);
  return (
    <ul className="blog_category_list">
      {blogsCategories.map((blog) => {
        return <BlogCategory key={blog.id} blog={blog} />;
      })}
    </ul>
  );
}
