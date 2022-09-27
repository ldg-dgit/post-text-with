import React, { useState } from "react";
import { dbService, storageService } from "firebase_im.js";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Post = ({ postObj, isOwner }) => {
  const [editing, setEditing] = useState();
  const [newPost, setNewPost] = useState(postObj.text);
  const postTextRef = doc(dbService, "post-with", `${postObj.id}`);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure? You want to delete this post?");
    if (ok) {
      await deleteDoc(postTextRef);
      await deleteObject(ref(storageService, postObj.attachmentUrl));
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(postTextRef, {
      text: newPost,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewPost(value);
  };
  return (
    <div className='nweet'>
      {editing ? (
        <>
          <form onSubmit={onSubmit} className='container nweetEdit'>
            <input
              type='text'
              placeholder='Edit your post'
              value={newPost}
              onChange={onChange}
              className='formInput'
              autoFocus
              required
            />
            <input type='submit' value='Update Post' className='formBtn' />
          </form>

          <span onClick={toggleEditing} className='formBtn cancelBtn'>
            Cancel
          </span>
        </>
      ) : (
        <>
          <h4>{postObj.text}</h4>
          {postObj.attachmentUrl && <img src={postObj.attachmentUrl} />}
          {isOwner && (
            <div className='nweet__actions'>
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Post;
