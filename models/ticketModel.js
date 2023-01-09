const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema(
  {
    ticketType: {
      type: Number,
      enum: [1, 2, 3],
      required: [true, 'Ticket must have type!'],
    },
    startStation: {
      type: mongoose.Schema.ObjectId,
      ref: 'Station',
      required: [true, 'Ticket must have a start station!'],
    },
    numOfStations: {
      type: Number,
      required: [true, 'Ticket must have number of stations!'],
    },
    price: {
      type: Number,
      required: [true, 'Ticket must have price!'],
    },
  },
  { timestamps: true }
);

ticketSchema.pre('save', function (next) {
  if (!this.isModified('ticketType')) return next();

  if (this.ticketType === 1) {
    this.price = 5;
    this.numOfStations = 9;
  } else if (this.ticketType === 2) {
    this.price = 7;
    this.numOfStations = 15;
  } else if (this.ticketType === 3) {
    this.price = 10;
    this.numOfStations = 89;
  }

  next();
});

ticketSchema.methods.openGate = function (startStation, exitStation) {
  // console.log(startStation, exitStation, this.numOfStations);

  if (
    exitStation.position - startStation.position >
    this.numOfStations
  )
    return false;

  return true;
};

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
