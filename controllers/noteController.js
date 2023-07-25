const Note = require('../models/noteModel');

const noteController = {
  getNotes: async (req, res) => {
    try {
      const notes = await Note.find({ user_id: req.user.id, isDeleted: false });
      res.json(notes);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  createNote: async (req, res) => {
    try {
      const { title, content, date } = req.body;

      const newNote = new Note({
        title,
        content,
        date,
        user_id: req.user.id,
        name: req.user.name,
      });
      await newNote.save();
      res.json({ msg: 'Created a Note' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  deleteNote: async (req, res) => {
    try {
      await Note.findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true });
      res.json({ msg: 'Deleted a Note' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateNote: async (req, res) => {
    try {
      const { title, content, date } = req.body;
      await Note.findOneAndUpdate(
        { _id: req.params.id, isDeleted: false },
        { title, content, date },
      );
      res.json({ msg: 'Updated a Note' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getNote: async (req, res) => {
    try {
      const note = await Note.findById(req.params.id);
      if (!note || note.isDeleted) {
        return res.status(404).json({ msg: 'Note not found' });
      }
      res.json(note);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getRecycleBin: async (req, res) => {
    try {
      const deletedNotes = await Note.find({ user_id: req.user.id, isDeleted: true });
      res.json(deletedNotes);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = noteController;
