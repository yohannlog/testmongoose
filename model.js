const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const modelName = "Bidule";
const collectionName = "Bidule";

const BiduleSchema = new Schema(
  {
    url: String,
    text: String,
    id: Number 
  },
  { 
    collection : collectionName 
  }
);

module.exports = mongoose.model(modelName, BiduleSchema);