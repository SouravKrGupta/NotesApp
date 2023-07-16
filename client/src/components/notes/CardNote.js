import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const CardNote = () => {
    const { id } = useParams();
    const [note, setNote] = useState({
      title: '',
      content: '',
      date: '',
      id: ''
    });
  
    useEffect(() => {
      const getNote = async () => {
        const token = localStorage.getItem('tokenStore');
        if (id) {
          const res = await axios.get(`/api/notes/${id}`, {
            headers: { Authorization: token }
          });
          setNote({
            title: res.data.title,
            content: res.data.content,
            date: res.data.date.substring(0, 10),
            id: res.data._id
          });
        }
      };
      getNote();
    }, [id]);

    const history = useNavigate();

  const navigateToHome = () => {
    history('/');
  };

  const textareaStyle = {
    width: '100%',
    height: '200px', // Adjust this value as needed
    resize: 'vertical',
  };
  return (
    <div className='view-note'>
      <h2>View note</h2>
      <div className='row'>
       
        <input
          type='text'
          id='title'
          name='title'
          value={note.title}
          disabled
        />
      </div>
      <div className='row'>
       
        <textarea
          cols='auto'
          rows='auto'
          type='textarea'
          id='content'
          name='content'
          value={note.content}
          style={textareaStyle}
          disabled
        />
      </div>
      <label htmlFor='date'>Date: {note.date}</label>
      <div>
      <button onClick={navigateToHome}><ArrowBackIcon/></button>
      </div>
    </div>
  )
}

export default CardNote