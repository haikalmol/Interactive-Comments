import { useEffect, useState } from "react";

import "./Styles/Comment.scss";

import AddComment from "./AddComment";
import ReplyContainer from "./ReplyContainer";
import DeleteModal from "./DeleteModal";
import CommentVotes from "./CommentVotes";
import CommentHeader from "./CommentHeader";
import CommentFooter from "./CommentFooter";

import { commentPostedTime } from "../utils";

const Comment = ({
  commentData,
  updateScore,
  updateReplies,
  editComment,
  commentDelete,
  setDeleteModalState,
}) => {
  const [replying, setReplying] = useState(false);
  const [time, setTime] = useState("");
  const [vote, setVoted] = useState(false);
  const [score, setScore] = useState(commentData.score);
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(commentData.content);
  const [deleting, setDeleting] = useState(false);

  // get time from comment posted
  const createdAt = new Date(commentData.createdAt);
  const today = new Date();
  const differenceInTime = today.getTime() - createdAt.getTime();

  useEffect(() => {
    setTime(commentPostedTime(differenceInTime));
    localStorage.setItem("voteState", vote);
  }, [differenceInTime, vote]);

  const addReply = (newReply) => {
    const replies = [...commentData.replies, newReply];
    updateReplies(replies, commentData.id);
    setReplying(false);
  };

  const updateComment = () => {
    editComment(content, commentData.id, "comment");
    setEditing(false);
  };

  const deleteComment = (id, type) => {
    const finalType = type !== undefined ? type : "comment";
    const finalId = id !== undefined ? id : commentData.id;
    commentDelete(finalId, finalType, commentData.id);
    setDeleting(false);
  };

  return (
    <div
      className={`comment-container ${
        commentData.replies[0] !== undefined ? "reply-container-gap" : ""
      }`}
    >
      <div className="comment">
        <CommentVotes
          vote={vote}
          setVoted={setVoted}
          score={score}
          setScore={setScore}
          updateScore={updateScore}
          commentData={commentData}
        />
        <div className="comment--body">
          <CommentHeader
            commentData={commentData}
            setReplying={setReplying}
            setDeleting={setDeleting}
            setDeleteModalState={setDeleteModalState}
            setEditing={setEditing}
            time={time}
          />
          {!editing ? (
            <div className="comment-content">{commentData.content}</div>
          ) : (
            <textarea
              className="content-edit-box"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
          )}
          {editing && (
            <button className="update-btn" onClick={updateComment}>
              update
            </button>
          )}
        </div>
        <CommentFooter
          vote={vote}
          setVoted={setVoted}
          score={score}
          setScore={setScore}
          updateScore={updateScore}
          commentData={commentData}
          setReplying={setReplying}
          setDeleting={setDeleting}
          setDeleteModalState={setDeleteModalState}
          setEditing={setEditing}
        />{" "}
      </div>

      {replying && (
        <AddComment
          buttonValue={"reply"}
          addComments={addReply}
          replyingTo={commentData.username}
        />
      )}
      {commentData.replies !== [] && (
        <ReplyContainer
          key={commentData.replies.id}
          commentData={commentData.replies}
          updateScore={updateScore}
          commentPostedTime={commentPostedTime}
          addReply={addReply}
          editComment={editComment}
          deleteComment={deleteComment}
          setDeleteModalState={setDeleteModalState}
        />
      )}

      {deleting && (
        <DeleteModal
          setDeleting={setDeleting}
          deleteComment={deleteComment}
          setDeleteModalState={setDeleteModalState}
        />
      )}
    </div>
  );
};

export default Comment;
