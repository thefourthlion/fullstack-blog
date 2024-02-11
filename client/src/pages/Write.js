import TextareaAutosize from "react-textarea-autosize";
import FileBase64 from "react-file-base64";
import { storage } from "../firebase";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { useState, useEffect } from "react";
import { v4 } from "uuid";
import Axios from "axios";
import "../styles/write/write.css";
export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [postImage, setPostImage] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [inputList, setInputList] = useState([]);
  const [file, setFile] = useState(null);

  // const addImageComponent = (e) => {
  //   setInputList(
  //     inputList.concat(
  //       <input
  //         className="image-input added-input"
  //         type="file"
  //         key={inputList.length}
  //       ></input>
  //     )
  //   );
  //   console.log(inputList);
  // };
  // const addVideoComponent = (e) => {
  //   setInputList(
  //     inputList.concat(
  //       <input
  //         className="added-input"
  //         type="text"
  //         placeholder="Video URL (optional):"
  //         key={inputList.length}
  //       />
  //     )
  //   );
  // };
  // const addTitleComponent = (e) => {
  //   setInputList(
  //     inputList.concat(
  //       <input
  //         className="added-input"
  //         key={inputList.length}
  //         type="text"
  //         placeholder="Title"
  //       ></input>
  //     )
  //   );
  // };
  // const addPostComponent = (e) => {
  //   setInputList(
  //     inputList.concat(
  //       <TextareaAutosize
  //         className="added-input"
  //         minRows="5"
  //         placeholder="Post"
  //       />
  //     )
  //   );
  // };

  const deleteComponent = (e) => {
    setInputList(inputList.splice(-1, 1));
    console.log(inputList);
  };

  // add a post to the DB
  const addPost = async () => {
    const newPost = {
      title: title,
      desc: desc,
      videoLink: videoLink,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.imageURL = filename;
      try {
        await Axios.post("/upload", data);
      } catch (err) {}
    }
    Axios.post("http://localhost:3001/api/posts", newPost);
  };

  // html for page
  return (
    <div className="Write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form encType="multipart/form-data">
        <h1>Whats on your mind?</h1>
        {/* image upload info */}
        <label>Header Image (optional)</label>
        <input
          className="image-input"
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
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
            setDesc(e.target.value);
          }}
        />
        {inputList}
        {inputList}
        {/* add buttons */}
        {/* <div>
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
          <button
            type="button"
            onClick={deleteComponent}
            className="delete-btn"
          >
            🚫
          </button>
        </div> */}

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
