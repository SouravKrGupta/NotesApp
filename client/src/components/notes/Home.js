import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ShareIcon from "@mui/icons-material/Share";
import Popover from "@mui/material/Popover";
import IconButton from "@mui/material/IconButton";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import GmailIcon from "@mui/icons-material/Mail";
import TwitterIcon from "@mui/icons-material/Twitter";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [token, setToken] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentNote, setCurrentNote] = useState(null);

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

  const shareNote = (event, note) => {
    setCurrentNote(note); // Set the currently selected note
    setAnchorEl(event.currentTarget);
  };

  const closeSharePopover = () => {
    setAnchorEl(null);
  };

  const shareViaWhatsApp = (title, content, date) => {
    const encodedTitle = encodeURIComponent(title);
    const encodedContent = encodeURIComponent(content);
    const encodedDate = encodeURIComponent(format(date));
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedTitle}%20-%20${encodedContent}%20${encodedDate}`;
    window.open(whatsappUrl, "_blank");
  };

  const shareViaGmail = (title, content, date) => {
    const encodedTitle = encodeURIComponent(title);
    const encodedContent = encodeURIComponent(content);
    const encodedDate = encodeURIComponent(format(date));
    const gmailUrl = `mailto:?subject=${encodedTitle}&body=${encodedContent}%20${encodedDate}`;
    window.location.href = gmailUrl;
  };

  const shareViaTwitter = (title, content, date) => {
    const encodedTitle = encodeURIComponent(title);
    const encodedContent = encodeURIComponent(content);
    const encodedDate = encodeURIComponent(format(date));
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}%20-%20${encodedContent}%20${encodedDate}`;
    window.open(twitterUrl, "_blank");
  };

  useEffect(() => {
    const handleCardColors = () => {
      const cards = document.querySelectorAll(".card");
      cards.forEach((card) => {
        card.style.setProperty("--card-bg-color", getRandomColor());
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
          <IconButton
            className="share"
            onClick={(event) => shareNote(event, note)}
          >
            <ShareIcon />
          </IconButton>
          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={closeSharePopover}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            {currentNote && (
              <>
                <IconButton
                  onClick={() =>
                    shareViaWhatsApp(
                      currentNote.title,
                      currentNote.content,
                      currentNote.date
                    )
                  }
                >
                  <WhatsAppIcon />
                </IconButton>
                <IconButton
                  onClick={() =>
                    shareViaGmail(
                      currentNote.title,
                      currentNote.content,
                      currentNote.date
                    )
                  }
                >
                  <GmailIcon />
                </IconButton>
                <IconButton
                  onClick={() =>
                    shareViaTwitter(
                      currentNote.title,
                      currentNote.content,
                      currentNote.date
                    )
                  }
                >
                  <TwitterIcon />
                </IconButton>
              </>
            )}
          </Popover>
        </div>
      ))}
    </div>
  );
}
