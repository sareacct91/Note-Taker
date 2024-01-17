const { StatusCodes } = require('http-status-codes');

const express = require('express');
const router = express.Router();

const FsQueue = require('../utils/queue');
const queue = new FsQueue();

const {getNotes, createNote,deleteNote} = require('../controllers/notesController');

router.route('/notes')
  .get(getNotes)
  .post((req,res) => {queue.enqueue((req,res) => {createNote})});

router.route('/notes/:id')
  .delete((req,res) => {queue.enqueue((req,res) => {deleteNote})});

module.exports = router;