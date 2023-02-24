import React from "react";
import { useDispatch } from "react-redux";
import { addedReactions } from "../redux/features/posts/postsSice";

function ReactionButtons({ post }) {
  const dispatch = useDispatch();

  const reactions = {
    like: "👍️",
    dislike: "👎️",
    heart: "❤️",
    star: "⭐️",
  };

  const reactionsObjToArray = Object.entries(reactions);

  return (
    <div>
      {reactionsObjToArray.map(([name, value]) => (
        <button
          onClick={() =>
            dispatch(addedReactions({ postId: post.id, reaction: name }))
          }
          className="reactionButton"
          key={name}
        >
          {value} {post.reactions[name]}
        </button>
      ))}
    </div>
  );
}

export default ReactionButtons;
