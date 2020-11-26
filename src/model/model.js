const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const modelName = "Bidule";
const collectionName = "Bidule";

const BiduleSchema = new Schema(
    {
        id: Number,
        date: Date,
        name: String,
        taille: BigInt,
        tauxReussite:BigInt,
        type:String,

    },
    {
        collection: collectionName
    }
);

module.exports = mongoose.model(modelName, BiduleSchema);