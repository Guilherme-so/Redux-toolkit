import React from "react";
import { useSelector } from "react-redux";
import { getAllPosts } from "../redux/features/posts/postsSice";
import User from "./user";

function Posts() {
  const posts = useSelector(getAllPosts);
  console.log(posts)

  return (
    <section>
      {posts.map((post) => (
        <article key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content.substring(0, 100)}</p>
          <p className="postCredit">
          <User authorId={post.authorId} />
          </p>
        </article>
      ))}
    </section>
  );
}

export default Posts;
