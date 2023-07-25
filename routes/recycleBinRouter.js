const express = require('express');
const auth = require('../middlewares/auth');
const noteController = require('../controllers/noteController');

const router = express.Router();

// Route to get all deleted notes from the recycle bin
router.route('/').get( auth, noteController.getRecycleBin);

module.exports = router;
