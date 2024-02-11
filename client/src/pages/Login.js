import axios from "axios";
import { useState, useContext, useEffect, useRef } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

import { Context } from "../context/Context";

// ------------------------------------------ (end of imports)--------------------------------------

export default function SignIn() {
  // user input
  const [userValidation, setUserValidation] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // ------------------------------------------ (end of init)--------------------------------------

  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username === "" && password === "") {
      setUserValidation("Username and Password required");
    } else if (password === "") {
      setUserValidation("Password required");
    } else if (username === "") {
      setUserValidation("Username required");
    } else {
      dispatch({ type: "LOGIN_START" });
      try {
        const res = await axios.post("/auth/login", {
          username: userRef.current.value,
          password: passwordRef.current.value,
        });
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      } catch (err) {
        dispatch({ type: "LOGIN_FAILURE" });
      }
    }
  };

  // ------------------------------------------ (end of init)--------------------------------------

  // ------------------------------------------ (end of functions)--------------------------------------

  return (
    <div className="SignInPage">
      <form onSubmit={handleSubmit}>
        <FloatingLabel className="form-input" label="Username">
          <Form.Control type="text" placeholder="Username" ref={userRef} />
        </FloatingLabel>

        <FloatingLabel className="form-input" label="Password">
          <Form.Control
            type="password"
            placeholder="Password"
            ref={passwordRef}
          />
        </FloatingLabel>
        <h4 className="red">{userValidation}</h4>
        <button type="submit" className="submit-btn" disabled={isFetching}>
          Sign In
        </button>
      </form>
    </div>
  );
}
