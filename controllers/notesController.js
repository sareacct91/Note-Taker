const fs = require('fs/promises');
const { StatusCodes } = require('http-status-codes');
const { v4: uuidv4 } = require('uuid');

const notes = require('../db/db.json');

const getNotes = (req, res) => {
  res.status(StatusCodes.OK).json(notes);
};

const createNote = async (req, res) => {
  const { title, text } = req.body;

  if (!(title && text)) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: 'missing data' });
    return;
  }

  try {
    const newNote = { title, text, id: uuidv4() };
    notes.push(newNote);

    await fs.writeFile('./db/db.json', JSON.stringify(notes));

    res.status(StatusCodes.OK).json(newNote);

  } catch (error) {
    console.log('test');
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "try again later" });
  }
};

const deleteNote = async (req, res) => {
  const noteid = req.params.id;

  for (const i in notes) {
    const note = notes[i];

    if (noteid === note.id) {
      notes.splice(i, 1);
      await fs.writeFile('./db/db.json', JSON.stringify(notes));
      res.status(StatusCodes.OK).json({ status: 'success' });
      return;
    }
  }
};


module.exports = {
  getNotes,
  createNote,
  deleteNote,
};