import React from "react";

const Post = ({ postObj, isOwner }) => (
  <div>
    <h4>{postObj.text}</h4>
    {isOwner && (
      <>
        <button>Delete</button>
        <button>Edit</button>
      </>
    )}
  </div>
);

export default Post;
