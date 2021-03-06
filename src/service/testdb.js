const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const url = "mongodb+srv://test:test@cluster0.uw4xd.mongodb.net/Bidule?retryWrites=true&w=majority";
const mod = "Bidule";
const col = "Bidule";

connection();

async function connection(){
    mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}).then(async (connection) => {
        const model = getModel();
        let res = await selectAll(model, 1);
        console.log(res);
        mongoose.disconnect();
    });
}

function getModel(){
    console.log("model : " + mod + " ; collection : " + col);
    return mongoose.model(mod, new Schema({ url: String, text: String, id: Number}, 
        { collection : col }));
}

/******************************* SELECT ************************************/

async function selectAll(model, limit){
    if(limit)
        return await model.find().limit(limit);
    return await model.find();
}

//pour avoir les valeurs entre x et y -> { $range: [ x, y ] }
async function select(model, option){
    return await model.find(option);
}

/******************************* UPDATE *************************************/

//options -> { name: 'Jean-Luc Picard' }
async function updateOne(model, id, options){
    return await model.replaceOne({ _id : id }, options);
}

//filterOption -> même truc que pour un find
//updateValues -> {valeur:"truc"}
async function updateMany(model, filterOption, updateValues){
    return model.updateMany(filterOption, updateValues);
}


/******************************* INSERT *************************************/

//element -> {truc:"machin"}
async function add(modele, element){
    return await modele.push(element);
}


/******************************* DELETE *************************************/

//id -> 32
async function deleteElementById(modele, id){
    return await modele.deleteOne({ _id: id });
}

//option -> {"truc":"machin"}
async function deleteMany(modele, option){
    return await modele.deleteMany(option);
}

module.exports = {
   connection:connection
}