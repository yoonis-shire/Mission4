const mongoose = require('mongoose');

// Connect to db
mongoose.connect('mongodb://localhost:27017/mission4');

// Import model
const Cars = require('./models/cars');

// Add Customer
const addCar = (car) => {
  Cars.create(car).then(car => {
    console.info('New Customer Added');
    mongoose.connection.close(); // Closing the Mongoose connection
  });
}

// List Customers
const listCar = () => {
  Cars.find()
    .then(car => {
      console.info(car);
      console.info(`${car.length} car`);
      mongoose.connection.close();
    });
}

// Remove Customer
const removeCar = (_id) => {
  Cars.deleteOne({ _id })
    .then(customer => {
      console.info('Car Removed Frome Inventory');
      mongoose.connection.close();
    });
}

// Export All Methods
module.exports = {
  addCar,
  listCar,
  removeCar
}
