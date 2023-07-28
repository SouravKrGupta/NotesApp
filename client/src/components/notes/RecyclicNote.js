import React, { useState, useEffect }  from 'react'
import axios from 'axios';

const RecyclicNote = () => {
    const [deletedNotes, setDeletedNotes] = useState([]);

    const getDeletedNotes = async () => {
      try {
        const token = localStorage.getItem("tokenStore");
        console.log("hello")
        const res = await axios.get("/api/notes", {
          headers: { Authorization: token },
        });
        setDeletedNotes(res.data);
       
      } catch (error) {
        console.error("Error fetching deleted notes:", error);
      }
    };
  
    useEffect(() => {
      getDeletedNotes();
    }, []);
  return (
    <div>
    <h1>Recycle Bin</h1>
    {deletedNotes.map((note) => (
      <div key={note._id}>
        <h3>{note.title}</h3>
        <p>{note.content}</p>
        <p>Date: {new Date(note.date).toLocaleDateString()}</p>
        {/* Add buttons for restoring or permanently deleting the note */}
      </div>
    ))}
  </div>
  )
}

export default RecyclicNote