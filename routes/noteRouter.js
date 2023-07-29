const express =require("express")
const auth= require('../middlewares/auth')
const noteController =require('../controllers/noteController')
//router object
const router =express.Router();

router.route('/')
.get(auth,noteController.getNotes)
.post(auth,noteController.createNotes)

router.route('/:id')
.get(auth,noteController.getNote)
.put(auth,noteController.updateNote)
.delete(auth,noteController.deleteNote)




module.exports =router
