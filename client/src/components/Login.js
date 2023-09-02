import React, { useState } from "react";
import axios from "axios";
import "../Style/login.css";

import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
export default function Login({ setIsLogin }) {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    image: "",
  });
  const [err, setErr] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErr("");
  };
  const validatePassword = (password) => {
    // Password validation criteria
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?])/;

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
    } else if (password.length > 128) {
      setPasswordError("Password cannot exceed 128 characters");
    } else if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      );
    } else {
      setPasswordError("");
    }
  };
  const registerSubmit = async (e) => {
    e.preventDefault();
    if (passwordError) {
      setErr("Password is invalid. Please check the requirements.");
      return;
    }
    try {
      const res = await axios.post("/users/register", {
        username: user.name,
        email: user.email,
        password: user.password,
        phone: user.phone,
        address: user.address,
        image: user.image,
      });
      setUser({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        image: "",
      });
      setErr(res.data.msg);
    } catch (err) {
      err.response.data.msg && setErr(err.response.data.msg);
    }
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    if (passwordError) {
      setErr("Password is invalid. Please check the requirements.");
      return;
    }
    try {
      const res = await axios.post("/users/login", {
        email: user.email,
        password: user.password,
      });
      setUser({ name: "", email: "", password: "" });
      localStorage.setItem("tokenStore", res.data.token);
      setIsLogin(true);
    } catch (err) {
      err.response.data.msg && setErr(err.response.data.msg);
    }
  };

  const [onLogin, setOnLogin] = useState(false);
  const styleForRegisterComponent = {
    visibility: onLogin ? "visible" : "hidden",
  };

  const styleForLoginComponent = {
    visibility: onLogin ? "hidden" : "visible",
  };
  const background = {
    backgroundImage:
      "url(" +
      "https://cdn.pixabay.com/photo/2016/01/09/18/28/notepad-1130743_1280.jpg" +
      ")",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };
  return (
    <div style={background}>
      <header className="header">
        <div className="logo">
          <h1>
            Take It! <AssignmentTurnedInIcon />
          </h1>
        </div>
      </header>

      <section className="login-page" style={styleForLoginComponent}>
        <div className="login box">
          <h2>Login</h2>
          <form onSubmit={loginSubmit}>
            <input
              type="email"
              name="email"
              id="login-email"
              placeholder="Email"
              required
              value={user.email}
              onChange={onChangeInput}
            />

            <input
              type="password"
              name="password"
              id="login-password"
              placeholder="Password "
              required
              value={user.password}
              autoComplete="true"
              onChange={(e) => {
                onChangeInput(e);
                validatePassword(e.target.value);
              }}
            />
             <p className="error-message">{passwordError}</p>

            <button type="submit">Login</button>
            <p>
              <span onClick={() => setOnLogin(true)}> Register Now </span>
            </p>
            <h3>{err}</h3>
          </form>
        </div>

        <div className="register box" style={styleForRegisterComponent}>
          <h2>Register</h2>
          <form onSubmit={registerSubmit}>
            <input
              type="text"
              name="name"
              id="register-name"
              placeholder="Username"
              required
              value={user.name}
              onChange={onChangeInput}
              rules={[
                { required: true, message: "Please input your name!" },
                { min: 3, message: "Your name must be at least 3 characters" },
                { max: 50, message: "Your name cannot exceed 50 characters" },
              ]}
            />

            <input
              type="email"
              name="email"
              id="register-email"
              placeholder="Email"
              required
              value={user.email}
              onChange={onChangeInput}
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Invalid email!" },
              ]}
            />

            <input
              type="password"
              name="password"
              id="register-password"
              placeholder="Password"
              required
              value={user.password}
              autoComplete="true"
              onChange={(e) => {
                onChangeInput(e);
                validatePassword(e.target.value);
              }}
            />
            <p className="error-message">{passwordError}</p>
            <input
              type="text"
              name="phone"
              id="register-phone"
              placeholder="Phone"
              value={user.phone}
              onChange={onChangeInput}
            />

            <input
              type="text"
              name="address"
              id="register-address"
              placeholder="Address"
              value={user.address}
              onChange={onChangeInput}
            />

            <input
              type="text"
              name="image"
              id="register-image"
              placeholder="Image URL"
              value={user.image}
              onChange={onChangeInput}
            />
            <button type="submit">Register</button>
            <p>
              <span onClick={() => setOnLogin(false)}> Login </span>
            </p>
            <h3>{err}</h3>
          </form>
        </div>
      </section>
    </div>
  );
}
