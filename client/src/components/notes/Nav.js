import React from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

export default function Nav({ setIsLogin }) {
  const logoutSubmit = () => {
    localStorage.clear();
    setIsLogin(false);
  };

  return (
    <header>
      <div className="logo">
        <h1>
          <Link to="/">Note Taking Application <AssignmentTurnedInIcon /></Link>
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
        <li onClick={logoutSubmit}>
          <Link to="/">
            <ExitToAppIcon />
          </Link>
        </li>
      </ul>
    </header>
  );
}
