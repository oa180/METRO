const Ticket = require('../models/ticketModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Station = require('../models/stationModel');

exports.startTrip = catchAsync(async (req, res, next) => {
  const station = await Station.findById(req.body.startStation);

  if (!station) return next(new AppError('Invalid Station ID!'), 404);

  const ticket = new Ticket({
    ticketType: req.body.ticketType,
    startStation: req.body.startStation,
  });

  await ticket.save({ validateBeforeSave: false });
  res.status(200).json({
    status: 'success',
    data: {
      ticket,
    },
  });
});

exports.exitTrip = catchAsync(async (req, res, next) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket)
    return next(new AppError('This Ticket is not exists!', 404));

  const startStation = await Station.findById(ticket.startStation);
  const exitStation = await Station.findById(req.body.exitStation);

  // console.log(ticket);
  // console.log(ticket.openGate(startStation, exitStation));
  res.status(200).json({
    status: 'success',
    gate: ticket.openGate(startStation, exitStation)
      ? 'Opened'
      : 'Closed',
  });
});
exports.getAllTickets = catchAsync(async (req, res, next) => {
  const tickets = await Ticket.find().populate({
    path: 'startStation',
    select: 'name line position -_id',
  });
  if (tickets.length === 0) {
    return next(new AppError('There is no Tickets', 404));
  }
  res.status(200).json({
    status: 'success',
    length: tickets.length,
    data: {
      tickets,
    },
  });
});
