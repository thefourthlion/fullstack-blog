import TextareaAutosize from "react-textarea-autosize";
import FileBase64 from "react-file-base64";
import { storage } from "../firebase";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { useState, useEffect } from "react";
import { v4 } from "uuid";
import Axios from "axios";
import "../styles/post/post.css";
export default function Post() {
  const [title, setTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [imageContent, setImageContent] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [inputList, setInputList] = useState([]);

  const addImageComponent = (e) => {
    setInputList(
      inputList.concat(
        <input
          className="image-input added-input"
          type="file"
          key={inputList.length}
        ></input>
      )
    );
    console.log(inputList);
  };
  const addVideoComponent = (e) => {
    setInputList(
      inputList.concat(
        <input
          className="added-input"
          type="text"
          placeholder="Video URL (optional):"
          key={inputList.length}
        />
      )
    );
  };
  const addTitleComponent = (e) => {
    setInputList(
      inputList.concat(
        <input
          className="added-input"
          key={inputList.length}
          type="text"
          placeholder="Title"
        ></input>
      )
    );
  };
  const addPostComponent = (e) => {
    setInputList(
      inputList.concat(
        <TextareaAutosize
          className="added-input"
          minRows="5"
          placeholder="Post"
        />
      )
    );
  };

  const deleteComponent = (e) => {
    setInputList(inputList.splice(-1, 1));
    console.log(inputList);
  };
  // function to upload images to firebase and save image url for DB
  const imageUpload = () => {
    let imageRef = ref(storage, `images/${imageContent.name + v4()}`);
    uploadBytes(imageRef, imageContent).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageURL(url);
        console.log(imageURL);
      });
    });
  };

  // allow for an image to be uploaded when needed
  useEffect(() => {
    if (imageContent) {
      if (imageURL.length == 0) {
        imageUpload();
      }
    }
  });

  // add a post to the DB
  const addPost = () => {
    Axios.post("http://localhost:3001/post", {
      title: title,
      postBody: postBody,
      videoLink: videoLink,
      imageURL: imageURL,
    });
  };

  // html for page
  return (
    <div className="Post">
      <form encType="multipart/form-data">
        <h1>Whats on your mind?</h1>
        {/* image upload info */}
        <label>Header Image (optional)</label>
        <input
          className="image-input"
          type="file"
          onChange={(e) => {
            setImageContent(e.target.files[0]);
          }}
        />

        {/* video upload */}
        <input
          type="text"
          placeholder="Video URL (optional):"
          onChange={(e) => {
            setVideoLink(e.target.value);
          }}
        />

        {/* title and body */}
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        ></input>
        <TextareaAutosize
          minRows="5"
          placeholder="Post"
          onChange={(e) => {
            setPostBody(e.target.value);
          }}
        />
        {inputList}
        {inputList}
        {/* add buttons */}
        <button type="button" className="add-btn" onClick={addImageComponent}>
          🖼️
        </button>
        <button type="button" onClick={addVideoComponent} className="add-btn">
          📺
        </button>
        <button type="button" onClick={addTitleComponent} className="add-btn">
          🤯
        </button>
        <button type="button" onClick={addPostComponent} className="add-btn">
          📃
        </button>
        <button type="button" onClick={deleteComponent} className="delete-btn">
          🚫
        </button>

        {/* // submit form */}
        <button
          className="submit-btn"
          type="button"
          onClick={() => {
            addPost();
          }}
        >
          <a href="/blog">Send It!</a>
        </button>
      </form>
    </div>
  );
}
