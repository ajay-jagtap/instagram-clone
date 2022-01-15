import firebase from 'firebase';
import { db } from '../firebase/config';

export const addCommentAPI = (postId, comment, user) => {
  db.collection('posts').doc(postId).collection('comments').add({
    comment,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    user,
  });
};
export const getCommentsAPI = (postId) => {
  return new Promise((resolve) => {
    let comments = [];
    db.collection('posts')
      .doc(postId)
      .collection('comments')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snap) => {
        comments = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        resolve(comments);
      });
  });
};
export const getCommentsCollection = (postId) => {
  return db.collection('posts').doc(postId).collection('comments').orderBy('timestamp', 'desc');
};
