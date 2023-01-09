const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const gloablErrorHandler = require('./controllers/errorController');
const ticketRouter = require('./routes/ticketRoute');
const stationRouter = require('./routes/stationRoute');

const app = express();

// GLOBAL MIDDLEWARES
// developmetn logging
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('env'));
}

// body parser
app.use(express.json({ limit: '10kb' }));

app.use('/api/v1/stations', stationRouter);
app.use('/api/v1/tickets', ticketRouter);
app.use(gloablErrorHandler);

module.exports = app;
