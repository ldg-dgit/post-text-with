import React, { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from "firebase_im";
import { addDoc, collection, query, onSnapshot, orderBy } from "firebase/firestore";
import Post from "../components/Post";
import { ref, uploadString, getDownloadURL } from "firebase/storage";

const Home = ({ userObj }) => {
  const [post, setPost] = useState("");
  const [posts, setPosts] = useState([]);
  const [attachment, setAttachment] = useState("");
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
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(attachmentRef, attachment, "data_url");
      attachmentUrl = await getDownloadURL(response.ref);
    }
    const postObj = {
      text: post,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    const docRef = await addDoc(collection(dbService, "post-with"), postObj);
    setPost("");
    setAttachment("");
    fileInput.current.value = null;
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setPost(value);
  };
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const fileInput = useRef();
  const onClearAttachment = () => {
    fileInput.current.value = null;
    setAttachment("");
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
        <input type='file' accept='image/*' onChange={onFileChange} ref={fileInput} />
        <input type='submit' value='Post' />
        {attachment && (
          <div>
            <img src={attachment} width='150px' />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
      </form>
      <div>
        {posts.map((post) => (
          <Post key={post.id} postObj={post} isOwner={post.creatorId === userObj.uid} />
        ))}
      </div>
    </div>
  );
};

export default Home;
