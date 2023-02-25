import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addedForm } from "../redux/features/posts/postsSice";
import { getAllUsers } from "../redux/features/users/usersSlice";

function PostForm() {
  const dispatch = useDispatch();
  const users = useSelector(getAllUsers);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [authorId, setAuthorId] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (title && content) {
      dispatch(addedForm(title, content, authorId));
      setTitle("");
      setContent("");
      setAuthorId("");
    }
  }

  const canSave = Boolean(title) && Boolean(content) && Boolean(authorId);

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
        <button disabled={!canSave}>Create</button>
      </form>
    </section>
  );
}

export default PostForm;
