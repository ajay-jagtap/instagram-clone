import SendIcon from '@material-ui/icons/Send';
import { useState } from 'react';
import { addCommentAPI } from '../apis/comments';

export const PostNewComment = ({ post, user }) => {
  const [comment, setComment] = useState('');

  const handleCommentForm = (e) => {
    e.preventDefault();
    if (!comment) return; //skip if comment is empty (add validation)
    addCommentAPI(post.id, comment, user);
    setComment('');
  };
  return (
    <form className="post__commentForm" onSubmit={handleCommentForm}>
      <input
        type="text"
        placeholder="Comment here..."
        className="comment__box"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button className="post__commentBtn">
        <SendIcon />
      </button>
    </form>
  );
};
