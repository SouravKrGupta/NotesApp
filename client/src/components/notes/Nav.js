import React from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import RecyclingIcon from '@mui/icons-material/Recycling';
export default function Nav({ setIsLogin }) {
  const logoutSubmit = () => {
    localStorage.clear();
    setIsLogin(false);
  };

  return (
    <header>
      <div className="logo">
        <h1>
   
          <Link to="/" style={{color:'black'}}> Take It! <AssignmentTurnedInIcon /></Link>
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
        <li >
          <Link to="">
            <RecyclingIcon/>
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
