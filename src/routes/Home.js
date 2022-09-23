import React, { useState } from "react";
import { dbService } from "firebase_im";
import { addDoc, collection } from "firebase/firestore";

const Home = () => {
  const [post, setPost] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    const docRef = await addDoc(collection(dbService, "post-with"), {
      post,
      createdAt: Date.now(),
    });
    setPost("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setPost(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={post}
          onChange={onChange}
          type='text'
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type='submit' value='Post' />
      </form>
    </div>
  );
};

export default Home;
