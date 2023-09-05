import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import { useNavigate } from "react-router-dom";
import '../Style/profile.css'
const Profile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    image: "",
  });
  const history = useNavigate();
  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = localStorage.getItem("tokenStore");

        if (token) {
          // Fetch user data from the server using Axios
          const response = await axios.get("/users/user-details", {
            headers: {
              Authorization: token,
            },
          });

          setUser({
            username: response.data.username,
            email: response.data.email,
            password: response.data.password,
            phone: response.data.phone,
            address: response.data.address,
            image: response.data.image,
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUserData();
  }, []);

  const onChaneInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("tokenStore");

      if (token) {
        // Update user data on the server using Axios
        const { username, email, password, phone, address, image } = user;
        const newUser = {
          username,
          email,
          password,
          phone,
          address,
          image,
        };
        await axios.put("/users/profile", newUser, {
          headers: {
            Authorization: token,
          },
        });

        return history.push("/");
      }
    } catch (error) {
      window.location.href = "/";
      console.error("Error updating user profile:", error);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <img className="userProfile"
          src={user.image || "placeholder-image-url.jpg"}
          alt="Profile"
          
        />
        <h1>{user.username}</h1>
      </div>

      <div className="profile">
        <h2>User Profile</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="row">
            <label htmlFor="username">User Name</label>
            <input
              type="text"
              id="username"
              name="username"
              required
              value={user.username}
              onChange={onChaneInput}
            />
          </div>
          <div className="row">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              required
              value={user.email}
              onChange={onChaneInput}
            />
          </div>
          <div className="row">
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={user.password}
              onChange={onChaneInput}
            />
            <button type="button" onClick={togglePasswordVisibility}>
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <div className="row">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              id="phone"
              name="phone"
              required
              value={user.phone}
              onChange={onChaneInput}
            />
          </div>
          <div className="row">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              required
              value={user.address}
              onChange={onChaneInput}
            />
          </div>

          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
