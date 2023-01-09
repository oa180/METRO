const dotenv = require('dotenv');
const mongoose = require('mongoose');
const fs = require('fs');
const Station = require('../../models/stationModel');
const Ticket = require('../../models/ticketModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB Connection Successful...');
  });

const stations = JSON.parse(
  fs.readFileSync(`${__dirname}/stations.json`, 'utf-8')
);

const importData = async () => {
  try {
    await Station.create(stations);
    console.log('Data loaded sucessfully.');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    // await Station.deleteMany();
    await Ticket.deleteMany();
    console.log('Data Deleted Successfully.');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
