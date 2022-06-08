// import "../styles/NavBar/NavBar.css";
import { useAuth0 } from "@auth0/auth0-react";
import SignIn from "./SignIn";
import SignOut from "./SignOut";
import "../styles/navbar/navbar.css";

export default function NavBar() {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="NavBar">
      <ul>
        <li className="">
          <a href="http://localhost:3000/blog">
            <span>Blog</span>
          </a>
        </li>
        <li className="">
          <a href="http://localhost:3000/post">
            <span>Post</span>
          </a>
        </li>
        {/* <li className="">
          <a href="http://localhost:3000/">
            {isAuthenticated ? <SignIn /> : <SignOut />}
          </a>
        </li> */}
      </ul>
    </div>
  );
}
