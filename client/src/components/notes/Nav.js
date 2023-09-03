import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import RecyclingIcon from "@mui/icons-material/Recycling";
import PortraitIcon from "@mui/icons-material/Portrait";
import axios from "axios";
export default function Nav({ setIsLogin }) {
  const [userImage, setUserImage] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const logoutSubmit = () => {
    localStorage.clear();
    setIsLogin(false);
  };
  useEffect(() => {
    const getUserImage = async () => {
      try {
        const token = localStorage.getItem("tokenStore");
        if (token) {
          // Fetch user data from the server using Axios
          const response = await axios.get("/users/user-details", {
            headers: {
              Authorization: token,
            },
          });

          setUserImage(response.data.image || ""); // Set the user's image from the response
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUserImage();
  }, []);

  return (
    <header>
      <div className="logo">
        <h1>
          <Link to="/" style={{ color: "black" }}>
            {" "}
            Take It! <AssignmentTurnedInIcon />
          </Link>
        </h1>
      </div>
      <ul>
        <li>
          <Link to="/">
            <HomeIcon />
          </Link>
        </li>
        <li>
          <Link to="/create">
            <AddIcon />
          </Link>
        </li>
        <li>
          <Link to="/recycle">
            <RecyclingIcon />
          </Link>
        </li>

        <li>
          <div className="circular-image-container">
            <img
              src={userImage}
              alt="Profile"
              className="circular-image"
              onClick={() => setShowDropdown(!showDropdown)}
            />
            {showDropdown && (
              <div className="dropdown-menu">
                <ul>
                  <li>
                    <Link to="/profile">
                      <PortraitIcon />
                    </Link>
                  </li>
                  <li onClick={logoutSubmit}>
                    <Link to="/">
                      {" "}
                      <ExitToAppIcon />
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </li>
      </ul>
    </header>
  );
}
