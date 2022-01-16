import firebase from 'firebase';
import { db } from '../firebase/config';

const POSTS_COLLECTION = 'posts';
const USERS_COLLECTION = 'users';
const MY_POSTS_COLLECTION = 'users';
const getUploadDate = () => {
  return firebase.firestore.FieldValue.serverTimestamp();
};
export const addNewPostAPI = (url, caption, user) => {
  db.collection(POSTS_COLLECTION).add({
    url,
    caption,
    user,
    timestamp: getUploadDate(),
  });
};
export const addNewPostToUserAPI = (url, caption, userId) => {
  db.collection(USERS_COLLECTION).doc(userId).collection(MY_POSTS_COLLECTION).add({
    url,
    caption,
    timestamp: getUploadDate(),
  });
};
