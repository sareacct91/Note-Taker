const { StatusCodes } = require('http-status-codes');
const path = require('path');

const express = require('express');
const router = express.Router();

const apiRoutes = require('./apiRoute');


router.use('/api', apiRoutes);

router.route('/notes').get((req, res) => res.status(StatusCodes.OK).sendFile(path.join(__dirname, '../public/notes.html')));

router.route('*').get((req, res) => res.status(StatusCodes.OK).sendFile(path.join(__dirname, '../public/index.html')));

module.exports = router;