const { StatusCodes } = require('http-status-codes');

const express = require('express');
const router = express.Router();

const {getNotes, createNote} = require('../controllers/notesController');

router.route('/notes')
  .get(getNotes)
  .post(createNote)
  .delete()





module.exports = router;