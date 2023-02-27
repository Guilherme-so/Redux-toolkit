import React from "react";
import { useSelector } from "react-redux";
import { getPostById } from "../redux/features/posts/postsSice";
import ReactionButtons from "./ReactionButtons";
import TimeAgo from "./TimeAgo";
import User from "./user";
import { Link, useParams } from "react-router-dom";

function SinglePost() {
  const { postId } = useParams();
  const post = useSelector((state) => getPostById(state, Number(postId)));

  return (
    <>
      {post ? (
        <article>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <p className="postCredit">
            <Link to={`/post/edit/${postId}`}>Update Post</Link>
            <User authorId={post.id} />
            <TimeAgo timestamp={post.date} />
          </p>
          <ReactionButtons post={post} />
        </article>
      ) : (
        <section>
          <p>Not Post Found</p>
        </section>
      )}
    </>
  );
}

export default SinglePost;
