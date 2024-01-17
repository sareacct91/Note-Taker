const { StatusCodes } = require('http-status-codes');

const express = require('express');
const router = express.Router();

const {getNotes, createNote,deleteNote} = require('../controllers/notesController');

router.route('/notes')
  .get(getNotes)
  .post(createNote)

router.route('/notes/:id')
  .delete(deleteNote)


module.exports = router;