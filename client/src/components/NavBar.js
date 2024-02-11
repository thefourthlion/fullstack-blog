import "../styles/navbar/navbar.css";

export default function NavBar() {
  return (
    <div className="NavBar">
      <ul>
        <li className="">
          <a href="http://localhost:3000/blog">Blog</a>
        </li>
        <li className="">
          <a href="http://localhost:3000/write">Write</a>
        </li>
        <li className="">
          <a href="http://localhost:3000/contact">Contact</a>
        </li>
        <li className="">
          <a href="http://localhost:3000/login">Login</a>
        </li>
        <li className="">
          <a href="http://localhost:3000/register">Register</a>
        </li>
      </ul>
    </div>
  );
}
