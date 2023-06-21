import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ShareIcon from "@mui/icons-material/Share";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [token, setToken] = useState("");

  const getNotes = async (token) => {
    const res = await axios.get("api/notes", {
      headers: { Authorization: token },
    });
    setNotes(res.data);
  };

  useEffect(() => {
    const token = localStorage.getItem("tokenStore");
    setToken(token);
    if (token) {
      getNotes(token);
    }
  }, []);

  const deleteNote = async (id) => {
    try {
      if (token) {
        await axios.delete(`api/notes/${id}`, {
          headers: { Authorization: token },
        });
        getNotes(token);
      }
    } catch (error) {
      window.location.href = "/";
    }
  };
  //Share part
  const shareNote = async (id, title, content, date) => {
    try {
      if (token) {
       
        // Share on Twitter
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title + " - " + content + " " + format(date) )}`;
        window.open(twitterUrl, "_blank");
      }
    } catch (error) {
      console.error("Error sharing note:", error);
    }
  };
  useEffect(() => {
    const handleCardColors = () => {
      const cards = document.querySelectorAll(".card");
      cards.forEach((card) => {
        card.style.setProperty(
          "--card-bg-color",
          getRandomColor()
        );
      });
    };

    handleCardColors();
  }, [notes]);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className="note-wrapper">
      {notes.map((note) => (
        <div className="card" key={note._id}>
          <h4 title={note.title}>{note.title}</h4>
          <div className="text-wrapper">
            <p>{note.content}</p>
          </div>
          <p className="date">deadline {format(note.date)}</p>
          <div className="card-footer">
            <Link to={`edit/${note._id}`}>
              <EditIcon />
            </Link>
          </div>
          <button className="delete" onClick={() => deleteNote(note._id)}>
            <DeleteIcon />
          </button>
             <button className="share" onClick={() => shareNote(note._id, note.title, note.content, note.date)}>
            
            <ShareIcon/>
            
          </button>
        </div>
      ))}
    </div>
  );
}
