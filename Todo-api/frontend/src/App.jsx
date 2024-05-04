import React, { useState, useEffect } from "react";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import "./App.css"; // assuming you have a CSS file for styling
import axios from "axios";
import { BASE_URL } from "./config";

function App() {
  const [inputValue, setInputValue] = useState("");

  const addTodoHandler = async () => {
    try {
      console.log("addTodoHandler");
      const obj = {
        value: inputValue,
        userid: "101",
      };
      const create = await axios.post(`${BASE_URL}/add`, obj);
      console.log("create", create);
      fetchData();
      setInputValue("");
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const [post, setPost] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const editHandler = async (id) => {
    try {
      const userValue = prompt("enter value");
      const obj = {
        value: userValue,
      };

      const url = `${BASE_URL}/update/${id}`;
      const updatePost = await axios.put(url, obj);
      fetchData();
      console.log("getPost", updatePost);

      // setPost(getPost.data.data);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const fetchData = async () => {
    try {
      const getPost = await axios.get(`${BASE_URL}/get`);
      console.log("getPost", getPost.data.data);
      setPost(getPost.data.data);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const deleteHandler = async (id) => {
    try {
      const url = `${BASE_URL}/delete/${id}`;
      await axios.delete(url);
      fetchData();
    } catch (error) {
      console.log("error", error.message);
    }
  };
  return (
    <div className="wrapper">
      <div className="flip-card__inner">
        <div className="flip-card__front">
          <div className="title">Todo's</div>
          <div className="flip-card__form">
            <input
              className="flip-card__input"
              placeholder="Add task here!"
              // value={taskInput}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button className="flip-card__btn" onClick={addTodoHandler}>
              Go!
            </button>
          </div>
          <div className="all-div">
            <ul className="list-cont">
              {post?.map((post) => (
                <li key={post._id} className="flip-card__input-task">
                  {post.value}
                  <span className="bts-s">
                    <button
                      className="dltbtn"
                      onClick={() => editHandler(post._id)}
                    >
                      <MdDelete />
                    </button>
                    <button
                      class="editbtn"
                      id="editbtn-id"
                      onClick={() => deleteHandler(post._id)}
                    >
                      <FaPen />
                    </button>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
