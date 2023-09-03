
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import RestoreIcon from "@mui/icons-material/Restore";
import '../../Style/recycle.css'
const RecycleBin = () => {
  const [deletedNotes, setDeletedNotes] = useState([]);
  const [token, setToken] = useState("");

  const getDeletedNotes = async () => {
    try {
      const res = await axios.get("/api/delete/deleted-notes", {
        headers: { Authorization: token },
      });
      setDeletedNotes(res.data);
    } catch (error) {
      console.error("Error fetching deleted notes:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("tokenStore");
    setToken(token);
    if (token) {
      getDeletedNotes();
    }
  }, [token]);

  const restoreNote = async (id) => {
    try {
      await axios.put(`/api/delete/deleted-notes/restore/${id}`, null, {
        headers: { Authorization: token },
      });
      setDeletedNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error restoring note:", error);
    }
  };

  const permanentlyDeleteNote = async (id) => {
    try {
      await axios.delete(`/api/delete/deleted-notes/${id}`, {
        headers: { Authorization: token },
      });
      setDeletedNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error permanently deleting note:", error);
    }
  };
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

 
  return (
    <div className="recycle-bin">
      <h2>Recycle Bin</h2>
      <div className="deleted-note-grid">
        {deletedNotes.map((note) => (
          <div className="deleted-note-card"  style={{ backgroundColor: getRandomColor() }} key={note._id}>
            <h4 title={note.title}>{note.title}</h4>
            <div className="text-wrapper">
              <p>{note.content}</p>
            </div>
            <p className="date">
              Deleted Date: {new Date(note.deletedDate).toLocaleDateString()}
            </p>
            <div className="card-footer">
              <button className="restore" onClick={() => restoreNote(note._id)}>
                <RestoreIcon />
              </button>
              <button
                className="permanently-delete"
                onClick={() => permanentlyDeleteNote(note._id)}
              >
                <DeleteIcon />
              </button>
            </div>
          </div>
        ))}
      </div>
    
    </div>
  );
};

export default RecycleBin;
