import React from "react";
import { useSelector } from "react-redux";
import { getAllPosts } from "../redux/features/posts/postsSice";
import TimeAgo from "./TimeAgo";
import User from "./user";

function Posts() {
  const posts = useSelector(getAllPosts);

  const showRecentsPostsFirst = posts.slice().sort((a, b) => b.date.localeCompare(a.date));

  return (
    <section>
      {showRecentsPostsFirst.map((post) => (
        <article key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content.substring(0, 100)}</p>
          <p className="postCredit">
            <User authorId={post.authorId} />
            <TimeAgo timestamp={post.date} />
          </p>
        </article>
      ))}
    </section>
  );
}

export default Posts;
