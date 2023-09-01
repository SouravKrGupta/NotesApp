const DeletedNotes = require('../models/deletedNoteModel');
const Notes =require('../models/noteModel')
const deletedNoteController = {
    getDeletedNotes: async (req, res) => {
        try {
          const deletedNotes = await DeletedNotes.find({ user_id: req.user.id });
          res.json(deletedNotes);
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
      },
    // Restore a deleted note from DeletedNotes to Notes
    restoreDeletedNote: async (req, res) => {
        try {
            const deletedNote = await DeletedNotes.findById(req.params.id);
            if (!deletedNote) {
                return res.status(404).json({ msg: "Deleted Note not found" });
            }

            // Create a new note in Notes using the deleted note data
            const newNote = new Notes({
                title: deletedNote.title,
                content: deletedNote.content,
                date: deletedNote.date,
                user_id: deletedNote.user_id,
                name: deletedNote.name,
            });
            await newNote.save();

            // Remove the restored note from DeletedNotes
            await DeletedNotes.findByIdAndDelete(req.params.id);

            res.json({ msg: 'Restored a Note' });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
      permanentlyDeleteNote: async (req, res) => {
        try {
          await DeletedNotes.findByIdAndDelete(req.params.id);
          res.json({ msg: 'Permanently Deleted a Note' });
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
      },
  
};

module.exports = deletedNoteController;
