const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Station must have a name!'],
  },
  line: {
    type: Number,
    enum: [1, 2, 3],
    required: [true, 'Station must have a line number!'],
  },
  position: {
    type: Number,
    required: [true, 'Station must have a position!'],
  },
});

const Station = mongoose.model('Station', stationSchema);

module.exports = Station;
