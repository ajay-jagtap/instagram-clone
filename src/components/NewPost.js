import AddIcon from '@material-ui/icons/Add';
import { useContext, useEffect, useState } from 'react';
import { addNewPostAPI, addNewPostToUserAPI } from '../apis/posts';
import { Context } from '../Context/GlobalState';
import { storage } from '../firebase/config';
import { CustomModal } from './CustomModal';
import ProgressBar from './ProgressBar';

export default function NewPost({ open, handleClose }) {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState('');
  const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png'];
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const { user } = useContext(Context);

  useEffect(() => {
    setError('');
  }, [file]);
  const validateFileUpload = () => {
    if (file === null) {
      setError('Please select a file to upload');
      return true;
    } else if (!allowedTypes.includes(file.type)) {
      setError('Only JPG/PNG allowed');
      return true;
    }
    return false;
  };
  const handleUpload = (e) => {
    e.preventDefault();
    const isInvalid = validateFileUpload();
    if (!isInvalid) {
      const storageRef = storage.ref(file.name);

      // When file starts uploading, set it to true, so as to show uploading text in the upload button
      setIsUploading(true);

      // file uploading
      storageRef.put(file).on(
        'state_changed',
        (snapshot) => {
          const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(Math.floor(percent));
        },
        (err) => {
          setError(err);
        },
        async () => {
          const url = await storageRef.getDownloadURL();
          onUploadSuccess(url);
        },
      );
    }
  };
  const onUploadSuccess = (uploadUrl) => {
    // Set progress back to null after file upload completion
    setProgress(null);
    // After uploadng, set isUploading to false
    setIsUploading(false);
    // After uploding, reset file and caption
    setFile(null);
    setCaption('');
    // Adding to the database (post collection)
    addNewPostAPI(uploadUrl, caption, user);
    // Adding to the database (users collection)
    addNewPostToUserAPI(uploadUrl, caption, user.id);
    // Close modal
    handleClose();
  };

  return (
    <CustomModal open={open} handleClose={handleClose}>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          id="file"
          className="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label htmlFor="file" className="file__placeholder">
          <h4>
            <AddIcon /> {file ? file.name : 'Select a file to upload'}
          </h4>
        </label>
        <textarea
          name="caption"
          id=""
          cols="30"
          rows="10"
          placeholder="Caption"
          className="form__caption"
          onChange={(e) => setCaption(e.target.value)}
          value={caption}
        ></textarea>
        <button className="primary-insta-btn" disabled={isUploading}>
          {isUploading ? '...' : 'Upload'}
        </button>
        {progress > 0 && <ProgressBar progress={progress} />}
        {error && <div className="upload__error">{error}</div>}
      </form>
    </CustomModal>
  );
}
