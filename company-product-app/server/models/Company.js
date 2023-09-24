const mongoose= require('mongoose');

const companySchema = new mongoose.Schema({
    companyName: {
      type: String,
      required: true,
    },
    legalNumber: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
  });

  module.exports = mongoose.model('Company', companySchema);
