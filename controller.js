const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const url = "mongodb+srv://test:test@cluster0.uw4xd.mongodb.net/Bidule?retryWrites=true&w=majority";
const mod = "Bidule";
const col = "Bidule";

connection();

async function connection(){
    mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}).then(async (connection) => {
        const model = getModel();
        let res = await selectAll(model, 2);
        console.log(res);
        mongoose.disconnect();
    });
}

function getModel(){
    console.log("model : " + mod + " ; collection : " + col);
    return mongoose.model(mod, new Schema({ url: String, text: String, id: Number}, 
        { collection : col }));
}

// ------------------------------------- CRUD ------------------------------------------- //

// CREATE
async function create(model, options){
    return await model.insertOne(options)  // options : par ex =( { nom: "JspQui", prenom : "JspQuoi", age : 36 )
    .then(function(){ 
        console.log("Data inserted")    
    }).catch(function(error){ 
        console.log(error)        
    }); 
    
}
async function createMany(model, optionsArray){
    return await model.insertMany(optionsArray)
    .then(function(){ 
        console.log("Data inserted")    
    }).catch(function(error){ 
        console.log(error)        
    }); 
}

// READ

async function selectAll(model, limit){
    if(limit)
        return await model.find().limit(limit);
    return await model.find();
}

async function select(model, option){
    return await model.find(option);
}

// UPDATE
async function updateOne(model, filter, data){
    return await model.update(filter,data)
    .then(function(){ 
        console.log("Data updated")  
    }).catch(function(error){ 
        console.log(error)      
    }); 
}

async function updateMany(model, options){
    return await model.update(options)
    .then(function(){ 
        console.log("Data updated")    
    }).catch(function(error){ 
        console.log(error)        
    }); 
}



// DELETE

async function deleteOne(model, id){
    return await model.deleteOne({ _id: id })
    .then(function(){ 
        console.log("Data deleted")    
    }).catch(function(error){ 
        console.log(error)        
    }); 
}


async function deleteMany(model, option){
    return await model.deleteMany(option)
    .then(function(){ 
        console.log("Data deleted")    
    }).catch(function(error){ 
        console.log(error)        
    }); 
}