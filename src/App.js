import "./App.css";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";

import PostForm from "./components/postForm";
import Posts from "./components/Posts";
import SinglePost from "./components/SinglePost";
import EditPostForm from "./components/editForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Posts />} />

        <Route path="post">
          <Route index element={<PostForm />} />
          <Route path=":postId" element={<SinglePost />} />
          <Route path="edit/:postId" element={<EditPostForm />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
