import { useState } from "react";
import "./comment.css";
import { BiSolidLike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";
import { IoSend } from "react-icons/io5";
import axios from "axios";
import { useSelector } from "react-redux";

export default function Comment({
  comment,
  selectedReply,
  setSelectedReply,
  blogId,
  handleGetBlog,
  handleCommentLikeDislike,
  handleReplyLikeDislike,
  setComments,
  selectedReplies,
  setSelectedReplies,
  handleShowReplies,
}) {
  // const [selectedReplies, setSelectedReplies] = useState(null);
  const [reply, setReply] = useState("");
  const user = useSelector((state) => state.user.user);

  // const handleShowReplies = (commentId) => {
  //   console.log("Hello", comment._id, selectedReplies);
  //   setSelectedReplies((currSelectedReplies) => {
  //     console.log(currSelectedReplies);
  //     return currSelectedReplies === commentId ? null : commentId;
  //   });
  // };

  // console.log("selectedReplies", selectedReplies);

  // const [selectedReply, setSelectedReply] = useState(null);

  const handleReplyClick = (commentId) => {
    // setSelectedReplies(null);
    setSelectedReply((currSelectedReply) =>
      currSelectedReply !== commentId ? commentId : null
    );
    setReply(null);
  };

  const handleSendReply = (blogId, commentId) => {
    const payload = {
      user: user.name,
      content: reply,
      image: user.profilePicture,
    };

    axios
      .post(
        `/astro-mandeep/api/v1/blog/${blogId}/comment/${commentId}/reply`,
        payload
      )
      .then((res) => {
        setReply("");
        setSelectedReply(null);
        setComments(res.data.blog.comments);
        setSelectedReplies(commentId);
        // handleGetBlog();
      });
  };

  return (
    <secion className="comment">
      <section className="main-comment">
        <section className="main-comment-profile">
          <img
            src={comment.image}
            alt="Profile Picture"
            width={65}
            height={65}
            style={{
              borderRadius: "50%",
              objectFit: "cover",
              cursor: "pointer",
              border: "1px solid #a72005",
            }}
          />
        </section>
        <section className="main-comment-content">
          <section className="main-comment-content-top">
            <p className="main-comment-user-name">{comment.user}</p>
            <p className="time">2 months ago</p>
          </section>
          <section className="main-comment-contentmain-comment-content-middle">
            <p className="comment-para">{comment.content}</p>
            <section className="comment-icons">
              <button className="like-dislike">
                <BiSolidLike
                  size={18}
                  color="#a72005"
                  onClick={() =>
                    handleCommentLikeDislike(
                      blogId,
                      comment._id,
                      user._id,
                      "like"
                    )
                  }
                />
                <span>{comment.likes}</span>
              </button>
              <button className="like-dislike">
                <BiSolidDislike
                  size={18}
                  color="tomatoorange"
                  onClick={() =>
                    handleCommentLikeDislike(
                      blogId,
                      comment._id,
                      user._id,
                      "dislike"
                    )
                  }
                />
                <span>{comment.dislikes}</span>
              </button>
              <button
                className="comment-reply"
                onClick={() => handleReplyClick(comment._id)}
              >
                {selectedReply === comment._id ? "Cancel" : "Reply"}
              </button>
            </section>
          </section>
          {selectedReply === comment._id ? (
            <section className="main-comment-content-bottom">
              <input
                type="text"
                className="reply-input"
                value={reply}
                onChange={({ target }) => setReply(target.value)}
              />
              <button
                className="reply-send"
                onClick={() => handleSendReply(blogId, comment._id)}
              >
                <IoSend size={18} color="#D9D9D9" />
              </button>
            </section>
          ) : null}

          {comment?.replies?.length > 0 ? (
            <section className="main-comment-footer">
              <p
                className="show-replies"
                onClick={() => handleShowReplies(comment._id)}
              >
                {selectedReplies === comment.user && selectedReplies
                  ? "Hide Replies"
                  : "Show Replies"}
              </p>
            </section>
          ) : null}
        </section>
      </section>
      {selectedReplies === comment._id ? (
        <section className="replies">
          {comment.replies.map((reply, index) => {
            return (
              <section key={index} className="sub-comment">
                <section className="main-comment-profile">
                  <img
                    src={reply.image}
                    alt="Profile Picture"
                    width={35}
                    height={35}
                    style={{
                      borderRadius: "50%",
                      objectFit: "cover",
                      cursor: "pointer",
                      border: "1px solid #a72005",
                    }}
                  />
                </section>
                <section className="main-comment-content">
                  <section className="main-comment-content-top">
                    <p className="main-comment-user-name">{reply.user}</p>
                    <p className="time">2 months ago</p>
                  </section>

                  <section className="main-comment-content-middle">
                    {reply.content}
                    <section className="comment-icons">
                      <button className="like-dislike">
                        <BiSolidLike
                          size={18}
                          color="#a72005"
                          onClick={() =>
                            handleReplyLikeDislike(
                              blogId,
                              comment._id,
                              reply._id,
                              user._id,
                              "like"
                            )
                          }
                        />
                        <span>{reply.likes}</span>
                      </button>
                      <button className="like-dislike">
                        <BiSolidDislike
                          size={18}
                          color="tomatoorange"
                          onClick={() =>
                            handleReplyLikeDislike(
                              blogId,
                              comment._id,
                              reply._id,
                              user._id,
                              "dislike"
                            )
                          }
                        />
                        <span>{reply.dislikes}</span>
                      </button>
                      {/* <button className="comment-reply">Reply</button> */}
                    </section>
                  </section>
                </section>
              </section>
            );
          })}
        </section>
      ) : null}
    </secion>
  );
}
