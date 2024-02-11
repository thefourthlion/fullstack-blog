import { useState, useContext, useEffect } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import axios from "axios";
// ------------------------------------------ (end of imports)--------------------------------------

export default function SignUp() {
  // // user input
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [phoneNumber, setPhoneNumber] = useState("");
  // const [retypePassword, setRetypePassword] = useState("");
  const [userValidation, setUserValidation] = useState("");
  const [error, setError] = useState(false);

  // ------------------------------------------ (end of init)--------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("/auth/register", {
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login");
    } catch (err) {
      setError(true);
    }
  };
  // e.preventDefault();

  // if (username === "") {
  //   setUserValidation("Username required");
  // } else if (username.length >= 16) {
  //   setUserValidation("Username too long");
  // } else if (firstName === "") {
  //   setUserValidation("First Name required");
  // } else if (lastName === "") {
  //   setUserValidation("Last Name required");
  // } else if (email === "") {
  //   setUserValidation("Email required");
  // } else if (!email.includes("@") || !email.includes(".")) {
  //   setUserValidation("Email must be valid");
  // } else if (password === "") {
  //   setUserValidation("Password required");
  // } else if (password.length < 8) {
  //   setUserValidation("Password too short");
  // } else if (retypePassword === "") {
  //   setUserValidation("Retype Password required");
  // } else if (password != retypePassword) {
  //   setUserValidation("Passwords required to match");
  // } else if (phoneNumber != "") {
  //   if (!isNumeric(phoneNumber)) {
  //     setUserValidation("Phone number not valid");
  //   } else if (phoneNumber.length < 10 || phoneNumber.length > 11) {
  //     setUserValidation("Phone number not valid");
  //   }
  // }

  // // ------------------------------------------ (end of user validation)--------------------------------------
  // else {

  // }

  // function isNumeric(n) {
  //   return !isNaN(parseFloat(n)) && isFinite(n);
  // }
  // ------------------------------------------ (end of functions)--------------------------------------

  return (
    <div className="SignInPage">
      <form onSubmit={handleSubmit}>
        <FloatingLabel className="form-input" label="Username *">
          <Form.Control
            placeholder="Username *"
            id="username"
            type="text"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </FloatingLabel>
        {/* <FloatingLabel className="form-input" label="First Name *">
          <Form.Control
            id="firstName"
            type="text"
            placeholder="First Name *"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
        </FloatingLabel>
        <FloatingLabel className="form-input" label="Last Name *">
          <Form.Control
            id="lastName"
            type="text"
            placeholder="Last Name *"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </FloatingLabel> */}
        <FloatingLabel className="form-input" label="Email *">
          <Form.Control
            type="email"
            placeholder="Email *"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </FloatingLabel>
        <FloatingLabel className="form-input" label="Password *">
          <Form.Control
            type="password"
            placeholder="Password *"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </FloatingLabel>
        {/* <FloatingLabel className="form-input" label="Retype Password *">
          <Form.Control
            type="password"
            placeholder="Retype Password *"
            onChange={(e) => {
              setRetypePassword(e.target.value);
            }}
          />
        </FloatingLabel>
        <FloatingLabel
          className="form-input"
          label="+1(209)123-4567 (optional)"
        >
          <Form.Control
            type="text"
            maxLength="11"
            placeholder="+1(209)123-4567 (optional)"
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
          />
        </FloatingLabel> */}
        {/* <h4 className="red">{userValidation}</h4> */}
        <button type="submit" className="submit-btn">
          Create Account
        </button>
      </form>
    </div>
  );
}
