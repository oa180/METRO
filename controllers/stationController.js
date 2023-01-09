const catchAsync = require('../utils/catchAsync');
const Station = require('../models/stationModel');
const AppError = require('../utils/appError');

exports.getAllStations = catchAsync(async (req, res, next) => {
  const stations = await Station.find();
  if (stations.length === 0) {
    return next(new AppError('There is no Stations', 404));
  }
  res.status(200).json({
    status: 'success',
    length: stations.length,
    data: {
      stations,
    },
  });
});

exports.getStation = catchAsync(async (req, res, next) => {
  const station = await Station.findById(req.params.id);

  if (!station)
    return next(new AppError('No Station with this ID!'), 404);

  res.status(200).json({
    status: 'success',
    data: {
      station,
    },
  });
});
