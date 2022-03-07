import CommentVotes from "./CommentVotes";
import CommentBtn from "./CommentBtn";

const CommentFooter = ({
  vote,
  setVoted,
  score,
  setScore,
  updateScore,
  commentData,
  setReplying,
  setDeleting,
  setDeleteModalState,
  setEditing,
}) => {
  return (
    <div className="comment--footer">
      <CommentVotes
        vote={vote}
        setVoted={setVoted}
        score={score}
        setScore={setScore}
        updateScore={updateScore}
        commentData={commentData}
      />

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

export default CommentFooter;
