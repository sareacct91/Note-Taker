const fs = require('fs/promises');
const { StatusCodes } = require('http-status-codes');
const { v4: uuidv4 } = require('uuid');

const noteData = require('../db/db.json');


const getNotes = (req, res) => {
  res.status(StatusCodes.OK).json(noteData);
};

const createNote = async (req, res) => {
  const { title, text } = req.body;

  if (!(title && text)) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: 'missing data' });
    return;
  }

  try {
    const newNote = { title, text, note_id: uuidv4() };

    const data = await fs.readFile('./db/db.json', 'utf8');
    const notes = JSON.parse(data) || [];
    notes.push(newNote);

    await fs.writeFile('./db/db.json', JSON.stringify(notes));

    res.status(StatusCodes.OK).json(newNote);

  } catch (error) {
    console.log('test');
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "try again later" });
  }
};

const deleteNote = (req, res) => {


};


module.exports = {
  getNotes,
  createNote,
  deleteNote,
};