const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const modelName = "Bidule";
const collectionName = "Bidule";

const BiduleSchema = new Schema(
    {
        date: Date,
        name: String,
        taille: Number,
        tauxReussite:Number,
        type:String
    }
);

module.exports = mongoose.model(modelName, BiduleSchema);