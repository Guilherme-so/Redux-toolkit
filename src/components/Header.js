import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <h1>Redux Toolkit</h1>
      <nav>
        <ul>
          <Link to="/">Home</Link> | {" "}
          <Link to="post">Post</Link>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
