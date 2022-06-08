import React, { useState, useEffect } from "react";
import Axios from "axios";
import "../styles/blog/blog.css";
export default function Blog() {
  const [postList, setPostList] = useState([]);

  // put all of the posts in the postList
  useEffect(() => {
    Axios.get("http://localhost:3001/readPost").then((res) => {
      setPostList(res.data);
    });
  }, []);

  const deletePost = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`, {});
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div className="Blog">
      {postList.map((val, key) => {
        return (
          <div key={val._id} className="postList">
            <iframe
              src={"https://www.youtube.com/embed/" + val.videoLink}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
            <h1>{val.title}</h1>
            <img className="blog-img" src={val.imageURL} alt="blog-header" />

            <p className="post-body">{val.postBody}</p>
            <button
              className="delete-btn"
              onClick={() => {
                deletePost(val._id);
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}
