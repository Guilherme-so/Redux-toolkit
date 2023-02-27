import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost } from "../redux/features/posts/postsSice";
import { getAllUsers } from "../redux/features/users/usersSlice";
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

function PostForm() {
  const dispatch = useDispatch();
  const users = useSelector(getAllUsers);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [addResquestStatus, setAddRequestStatus] = useState("idle");

  // const canSave = Boolean(title) && Boolean(content) && Boolean(authorId);
  const canSave =
    [title, content, authorId].every(Boolean) && addResquestStatus === "idle";
  console.log(canSave);

  function handleSubmit(e) {
    e.preventDefault();

    if (canSave) {
      try {
        setAddRequestStatus("pending");
        setTimeout(() => {
          dispatch(addNewPost({ title, body: content, authorId })).unwrap();
        }, 2000);

        setTitle("");
        setContent("");
        setAuthorId("");
        navigate("/");
      } catch (err) {
        console.log(err);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  }

  return (
    <section className="animeLeft">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />

        <label htmlFor="author">Author:</label>
        <select
          value={authorId}
          onChange={({ target }) => setAuthorId(target.value)}
        >
          <option value=""></option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        <label htmlFor="content">Content:</label>
        <textarea
          name=""
          id="content"
          cols="30"
          rows="5"
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />

        <button className="button" disabled={!canSave}>
          {addResquestStatus === "pending" ? (
            <ColorRing height="40" width="40" radius="9" ariaLabel="loading" />
          ) : (
            "Create"
          )}
        </button>
      </form>
    </section>
  );
}

export default PostForm;
