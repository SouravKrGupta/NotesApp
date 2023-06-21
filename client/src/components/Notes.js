import React from 'react'
import Header from './notes/Nav'
import Home from './notes/Home'
import CreateNotes from './notes/CreateNote'
import EditNotes  from './notes/EditNote'
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'
import Footer from './notes/Footer'



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
          </Routes>
        </section>
        <Footer/>
      </div>
    </Router>
  
  )
}

export default Notes