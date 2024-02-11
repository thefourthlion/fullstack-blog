import SinglePost from "../components/SinglePost";
import { useRef, useEffect } from "react";
export default function Home() {
  let count = useRef(0);

  useEffect(() => {
    count.current = count.current + 1;
  });

  return (
    <div>
      {/* <SinglePost /> */}
      <h1>Welcome to this fantastic Blog.</h1>
      {/* <h1>{count}</h1> */}
      <button
        onClick={() => {
          console.log(count.current);
          count.current = count.current + 1;
          console.log(count.current);
        }}
      >
        +
      </button>
    </div>
  );
}
