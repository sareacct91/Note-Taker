const express = require('express');

const app = express();
const PORT = process.env.PORT || 5001;

const logger = require('./middlewares/logger');

app.use(logger);
app.use(express.json());

app.use(express.static('public'));

const mainRouter = require('./routes');
app.use('/', mainRouter);

app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));