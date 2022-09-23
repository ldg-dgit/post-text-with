import React, { useEffect, useState } from "react";
import { dbService } from "firebase_im";
import { addDoc, collection, getDocs, query } from "firebase/firestore";

const Home = () => {
  const [post, setPost] = useState("");
  const [posts, setPosts] = useState([]);
  const getPosts = async () => {
    const q = query(collection(dbService, "post-with"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const postObj = {
        ...doc.data(),
        id: doc.id,
      };
      setPosts((prev) => [postObj, ...prev]);
    });
  };
  useEffect(() => {
    getPosts();
  }, []);
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
      <div>
        {posts.reverse().map((post) => (
          <div key={post.id}>
            <h4>{post.post}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
