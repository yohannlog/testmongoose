const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const url = "mongodb+srv://test:test@cluster0.uw4xd.mongodb.net/Bidule?retryWrites=true&w=majority";
const mod = "Bidule";
const col = "Bidule";

const schema = new Schema({ url: String, text: String, id: Number},
{ collection : col })

let Mist = mongoose.model('Mist', schema)

connection();

async function connection(){
    mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}).then(async (connection) => {

        mongoose.disconnect();
    });
}

async function getModel(){
    console.log("model : " + mod + " ; collection : " + col);
    return await mongoose.model(mod, schema);
}

/******************************* SELECT ************************************/

 function selectAll(limit){
    if(limit)
        return Mist.find({}).limit(limit);
    return Mist.find({});
}

//pour avoir les valeurs entre x et y -> { $range: [ x, y ] }
async function select(option){
    return await Mist.find(option);
}

/******************************* UPDATE *************************************/

//options -> { name: 'Jean-Luc Picard' }
async function updateOne(id, options){
    return await Mist.replaceOne({ _id : id }, options);
}

//filterOption -> même truc que pour un find
//updateValues -> {valeur:"truc"}
async function updateMany(filterOption, updateValues){
    return Mist.updateMany(filterOption, updateValues);
}


/******************************* INSERT *************************************/

//element -> {truc:"machin"}
async function add(element){
    return await Mist.push(element);
}


/******************************* DELETE *************************************/

//id -> 32
async function deleteElementById(id){
    return await Mist.deleteOne({ _id: id });
}

//option -> {"truc":"machin"}
async function deleteMany(option){
    return await Mist.deleteMany(option);
}
module.exports = mongoose.model('List', schema)
module.exports = {
   connection, getModel, select, selectAll
}