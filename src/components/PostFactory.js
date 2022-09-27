import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { storageService, dbService } from "firebase_im";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

const PostFactory = ({ userObj }) => {
  const [attachment, setAttachment] = useState("");
  const [post, setPost] = useState("");
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
  );
};

export default PostFactory;
