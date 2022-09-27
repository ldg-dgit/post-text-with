import React, { useEffect, useState } from "react";
import { dbService } from "firebase_im";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import Post from "../components/Post";
import PostFactory from "components/PostFactory";

const Home = ({ userObj }) => {
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

  return (
    <div className='container'>
      <PostFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {posts.map((post) => (
          <Post key={post.id} postObj={post} isOwner={post.creatorId === userObj.uid} />
        ))}
      </div>
    </div>
  );
};

export default Home;
