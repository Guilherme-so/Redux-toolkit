import React from "react";
import { useSelector } from "react-redux";
import { getAllUsers } from "../redux/features/users/usersSlice";

function User({ authorId }) {
  const users = useSelector(getAllUsers);

  const author = users.find((user) => user.id === authorId);

  return <span>By {author ? author.name : "Unknown author"}</span>;
}

export default User;
