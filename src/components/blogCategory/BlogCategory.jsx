import "./blogCategory.css";

export default function BlogCategory({ blog }) {
  return (
    <li className="blog-category-item">
      <label htmlFor="blog-category-item-checkbox">{blog.name}</label>
      <input type="radio" id="blog-category-item-checkbox" name="test" />
    </li>
  );
}
