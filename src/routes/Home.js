import React, { useEffect, useState } from "react";
import { dbService } from "firebase_im";
import { addDoc, collection, getDocs, query, onSnapshot, orderBy } from "firebase/firestore";

const Home = ({ userObj }) => {
  const [post, setPost] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const q = query(collection(dbService, "post-with"), orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const postArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postArr);
    });
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    const docRef = await addDoc(collection(dbService, "post-with"), {
      text: post,
      createdAt: Date.now(),
      creatorId: userObj.uid,
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
        {posts.map((post) => (
          <div key={post.id}>
            <h4>{post.text}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
