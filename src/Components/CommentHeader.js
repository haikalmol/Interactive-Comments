import CommentBtn from "./CommentBtn";

const CommentHeader = ({commentData, setReplying, setDeleting, setDeleteModalState, setEditing, time}) => {
  return (
    <div className="comment--header">
      <div className={`profile-pic ${commentData.username}`}></div>
      <div className="username">{commentData.username}</div>
      {commentData.currentUser ? <div className="you-tag">you</div> : ""}
      <div className="comment-posted-time">{`${time} ago`}</div>
      <CommentBtn
        commentData={commentData}
        setReplying={setReplying}
        setDeleting={setDeleting}
        setDeleteModalState={setDeleteModalState}
        setEditing={setEditing}
      />
    </div>
  );
};

export default CommentHeader;
