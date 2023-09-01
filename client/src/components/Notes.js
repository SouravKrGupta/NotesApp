import React from 'react'
import Header from './notes/Nav'
import Home from './notes/Home'
import CreateNotes from './notes/CreateNote'
import EditNotes  from './notes/EditNote'
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'
import  CardNote  from './notes/CardNote'
import RecycleBin from './notes/RecycleBin'


function Notes({setIsLogin}) {
  return (
    <Router>
      <div className="notes-page">
        <Header setIsLogin={setIsLogin}/>
        <section>
          <Routes>
          <Route path='/' element={<Home/>} exact/>
          <Route path='/create' element={<CreateNotes/>} exact/>
          <Route path='/edit/:id' element={<EditNotes/>} exact/>
          <Route path='/card/:id' element={<CardNote/>} exact/>
          <Route path='/recycle' element={<RecycleBin/>} exact/>
          </Routes>
        </section>

      </div>
    </Router>
  
  )
}

export default Notes