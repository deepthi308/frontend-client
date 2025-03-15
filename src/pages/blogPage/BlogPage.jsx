import { useParams } from "react-router-dom";
import "./blogPage.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { MdThumbUp } from "react-icons/md";
import { MdThumbDown } from "react-icons/md";
import { FaShareSquare } from "react-icons/fa";
import { FaDownload } from "react-icons/fa";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import Comment from "../../components/comment/Comment";
import { useSelector } from "react-redux";

export default function BlogPage() {
  const { title } = useParams();
  const blogContentRef = useRef(null);
  const user = useSelector((state) => state.user.user);

  console.log(user);
  //like-dislike/:blogId

  const [blog, setBlog] = useState({});
  const [comments, setComments] = useState("");
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [selectedReply, setSelectedReply] = useState(null);
  const [sortOrder, setSortOrder] = useState("oldest");
  const [selectedReplies, setSelectedReplies] = useState(false);
  const [blogStatistics, setBlogStatistics] = useState({
    likes: 0,
    dislikes: 0,
    shares: 0,
    downloads: 0,
  });

  console.log(blog);
  const commentInputRef = useRef(null);

  const handleCommentChange = (target) => {
    setComment(target.value);
  };

  const handleAddComment = (blogId) => {
    // console.log(blog);
    if (!comment) {
      return;
    }
    setComment("");
    const newComment = {
      user: user.name,
      image: user.profilePicture,
      content: comment,
    };
    axios
      .post(`/astro-mandeep/api/v1/blog/${blogId}/comment`, newComment)
      .then((res) => {
        const { blog } = res.data;
        setBlog(blog);
        setComments(blog.comments);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setLoading(true);
    // console.log("Testing", commentInputRef.current.focus());
    const originalTitle = title.replace(/-/g, " ");
    axios.get(`/astro-mandeep/api/v1/get-blog/${originalTitle}`).then((res) => {
      setLoading(false);
      const { blog } = res.data;
      setBlog(blog);
      setBlogStatistics({
        likes: blog.likes,
        dislikes: blog.dislikes,
        shares: blog.shares,
        downloads: blog.downloads,
      });
      setComments(blog.comments);
      window.scrollTo(0, 0);
      if (commentInputRef.current) {
        commentInputRef.current.focus();
      }
    });
  }, [title]);

  function handleGetBlog() {
    setLoading(true);
    const originalTitle = title.replace(/-/g, " ");
    axios.get(`/astro-mandeep/api/v1/get-blog/${originalTitle}`).then((res) => {
      setLoading(false);
      const { blog } = res.data;
      setBlog(blog);
      // window.scrollTo(0, 0);
    });
  }

  const getComments = () => {
    const originalTitle = title.replace(/-/g, " ");
    axios.get(`/astro-mandeep/api/v1/get-blog/${originalTitle}`).then((res) => {
      const { blog } = res.data;
      setComments(blog.comments);
    });
  };

  // console.log(handleGetBlog);

  console.log(blog);

  const downloadBlogAsPDF = () => {
    // Select the content you want to capture
    const element = document.body; // or any specific element you want to capture

    // Capture the content as a canvas
    html2canvas(element).then((canvas) => {
      // Convert the canvas to an image (base64)
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = 1000;
      const imgHeight = canvas.height;

      // Create a new jsPDF instance
      const pdf = new jsPDF({
        orientation: "p", // Portrait mode (default is 'p', landscape is 'l')
        unit: "px", // Unit in pixels (default is 'mm')
        format: [imgWidth, imgHeight], // Set page size based on content size
      });

      // Add the image to the PDF (you can adjust the positioning and scaling as needed)
      pdf.addImage(imgData, "PNG", 0, 0);

      // Save the PDF
      pdf.save("blog-page.pdf");
    });
  };

  function handleCommentLikeDislike(blogId, commentId, userId, action) {
    const payload = {
      action,
      userId,
    };
    axios
      .put(
        `/astro-mandeep/api/v1/blog/comment/like-dislike/${blogId}/${commentId}`,
        payload
      )
      .then((res) => {
        console.log(res.data);
        getComments();
      });
  }

  function handleBlogLikeDislike(blogId, userId, action) {
    const payload = {
      userId,
      action,
    };

    axios
      .put(`/astro-mandeep/api/v1/blog/like-dislike/${blogId}`, payload)
      .then((res) => {
        const { blog } = res.data;
        console.log(res.data);
        setBlogStatistics({
          likes: blog.likes,
          dislikes: blog.dislikes,
          shares: blog.shares,
          downloads: blog.downloads,
        });
      });
  }

  const handleSortComments = (order) => {
    let sortedComments = [...comments]; // Create a copy to avoid direct mutation of
    setSortOrder(order);
    if (order === "oldest") {
      console.log(sortedComments);
      sortedComments = sortedComments.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      console.log(sortedComments);
    } else {
      sortedComments = sortedComments.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }
    setComments(sortedComments);
  };

  function handleReplyLikeDislike(blogId, commentId, replyId, userId, action) {
    const payload = {
      action,
      userId,
    };
    axios
      .put(
        `/astro-mandeep/api/v1/blog/reply/like-dislike/${blogId}/${commentId}/${replyId}`,
        payload
      )
      .then((res) => {
        console.log(res.data);
        getComments();
      });
  }

  const handleShowReplies = (commentId) => {
    console.log("Hello", comment._id, selectedReplies);
    setSelectedReplies((currSelectedReplies) => {
      console.log(currSelectedReplies);
      return currSelectedReplies === commentId ? null : commentId;
    });
  };

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: blog.title,
          text: `Check out this blog: ${blog.title}`,
          url: window.location.href, // Share the URL of the blog
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      console.log("Web Share API is not supported in this browser.");
      // If Web Share API is not supported, fall back to the custom share modal
      // handleCustomShare();
    }
  };

  const handleIncreaseShareOrDownloadCount = (blogId, action) => {
    const payload = {
      action: action,
    };
    axios
      .put(`/astro-mandeep/api/v1/blog/increment/${blogId}`, payload)
      .then((res) => {
        console.log(res.data);
        const { blog } = res.data;
        setBlogStatistics({
          likes: blog.likes,
          dislikes: blog.dislikes,
          shares: blog.shares,
          downloads: blog.downloads,
        });
        if (action === "download") {
          downloadBlogAsPDF();
        } else if (action === "share") {
          handleNativeShare();
        }
      });
  };

  return (
    <section className="blogPage" id="blogPage">
      {loading ? (
        <ClipLoader
          loading={loading}
          size={20}
          speedMultiplier={0.5}
          color="#D9D9D9"
        />
      ) : (
        <>
          <h1 className="blog-detail-title title" id="blogPage">
            {blog.title}
          </h1>
          <section className="blog-detail-icons">
            <div className="blog-icon-container">
              <div
                className="icon"
                onClick={() =>
                  handleBlogLikeDislike(blog._id, user._id, "like")
                }
              >
                <MdThumbUp color="#D9D9D9" size={18} />
              </div>
              <p>{blogStatistics.likes}</p>
            </div>

            <div className="blog-icon-container">
              <div
                className="icon"
                onClick={() =>
                  handleBlogLikeDislike(blog._id, user._id, "dislike")
                }
              >
                <MdThumbDown color="#D9D9D9" size={18} />
              </div>
              <p>{blogStatistics.dislikes}</p>
            </div>

            <div
              className="blog-icon-container"
              onClick={() =>
                handleIncreaseShareOrDownloadCount(blog._id, "share")
              }
            >
              <div className="icon">
                <FaShareSquare color="#D9D9D9" size={18} />
              </div>
              <p>{blogStatistics.shares}</p>
            </div>

            <div
              className="blog-icon-container"
              onClick={() =>
                handleIncreaseShareOrDownloadCount(blog._id, "download")
              }
            >
              <div className="icon">
                <FaDownload color="#D9D9D9" size={18} />
              </div>
              <p>{blogStatistics.downloads}</p>
            </div>
          </section>
          <section className="blog-detail-container">
            <section
              ref={blogContentRef}
              className="blog-content"
              id="blog-content"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            <section className="blog-comments">
              <section className="blog-comments-top">
                <div className="comment-sub-title">
                  <p>
                    {comments.length}{" "}
                    {comments.length > 1 ? "Comments" : "Comment"}
                  </p>
                </div>
                {comments.length ? (
                  <section className="sort-buttons-container">
                    Sort By Comments:
                    <select
                      className="comment-sorter"
                      value={sortOrder}
                      onChange={({ target }) =>
                        handleSortComments(target.value)
                      }
                    >
                      <option value="oldest">Oldest First</option>
                      <option value="latest">Latest First</option>
                    </select>
                  </section>
                ) : null}
              </section>

              <div className="add-comment-box">
                <textarea
                  ref={commentInputRef}
                  rows={1}
                  placeholder={
                    !user.name
                      ? "Login to add comment..."
                      : "Add your comment here..."
                  }
                  className="comment-inpu add-comment-box-textarea"
                  disabled={!user.name ? true : false}
                  value={comment}
                  onChange={({ target }) => handleCommentChange(target)}
                />
                <button
                  className="add-comment-button"
                  disabled={!user.name ? true : false}
                  onClick={() => handleAddComment(blog._id)}
                >
                  {!user.name ? "Login to add comment" : "Comment"}
                </button>
              </div>

              {comments.length > 0 ? (
                <>
                  {comments.map((comment, index) => (
                    <Comment
                      key={index}
                      comment={comment}
                      selectedReply={selectedReply}
                      setSelectedReply={setSelectedReply}
                      blogId={blog._id}
                      handleGetBlog={handleGetBlog}
                      handleCommentLikeDislike={handleCommentLikeDislike}
                      handleReplyLikeDislike={handleReplyLikeDislike}
                      setComments={setComments}
                      selectedReplies={selectedReplies}
                      setSelectedReplies={setSelectedReplies}
                      handleShowReplies={handleShowReplies}
                    />
                  ))}
                </>
              ) : null}
            </section>
          </section>
        </>
      )}
    </section>
  );
}
