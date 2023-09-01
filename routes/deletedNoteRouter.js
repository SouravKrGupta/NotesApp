const express = require('express');
const auth = require('../middlewares/auth');
const deletedNoteController = require('../controllers/deletedNoteController');

const router = express.Router();

router.get('/deleted-notes', auth, deletedNoteController.getDeletedNotes);

// Route to permanently delete a note from the recycle bin
router.delete('/deleted-notes/:id', auth, deletedNoteController.permanentlyDeleteNote);

// Route to restore a deleted note from DeletedNotes to Notes
router.put('/deleted-notes/restore/:id', auth, deletedNoteController.restoreDeletedNote);


module.exports = router;
