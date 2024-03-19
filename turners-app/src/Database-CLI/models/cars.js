const mongoose = require('mongoose');

// Customer Schema
const carSchema = mongoose.Schema({
  Make: { type: String },
  Model: { type: String },
  Type: { type: String }
});

// Define and export
module.exports = mongoose.model('Car', carSchema);