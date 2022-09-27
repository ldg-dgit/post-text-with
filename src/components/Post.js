import React, { useState } from "react";
import { dbService, storageService } from "firebase_im.js";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

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
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type='text'
              placeholder='Edit your post'
              value={newPost}
              onChange={onChange}
              required
            />
            <input type='submit' value='Update Post' />
          </form>

          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{postObj.text}</h4>
          {postObj.attachmentUrl && <img src={postObj.attachmentUrl} height='150px' />}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete</button>
              <button onClick={toggleEditing}>Edit</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Post;
