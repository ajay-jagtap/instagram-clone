import Avatar from '@material-ui/core/Avatar';
import { useContext, useEffect, useState } from 'react';
import Hashtags from 'react-highlight-hashtags';
import { getCommentsCollection } from '../apis/comments';
import { Context } from '../Context/GlobalState';
import PostComment from './PostComment';
import PostModal from './PostModal';
import { PostNewComment } from './PostNewComment';

export default function Post({ post }) {
  const [postComments, setPostComments] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const { user } = useContext(Context);

  // This effect will help to load post's comment from the firestore DB
  useEffect(() => {
    const collection = getCommentsCollection(post.id);
    collection.onSnapshot((snap) => {
      setPostComments(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
  }, [post.id]);

  return (
    <div className="post">
      <div className="post__header">
        <Avatar alt={post.user.fullName} src={post.user.photoURL} />
        <h4>{post.user.username}</h4>
      </div>
      <div className="post__body" onClick={() => setIsModal(true)}>
        <img src={post.url} alt="Post" title="Click to view in full screen" />
      </div>
      <div className="post__footer">
        <p className="post__caption">
          <Hashtags>{post.caption}</Hashtags>
        </p>
      </div>
      <div className="post__comments">
        {postComments.slice(0, 2).map((comment) => (
          <PostComment comment={comment} key={comment.id} />
        ))}
      </div>
      <PostNewComment post={post} user={user} />
      {isModal && <PostModal post={post} isModal={isModal} setIsModal={setIsModal} />}
    </div>
  );
}
