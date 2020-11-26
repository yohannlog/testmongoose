const mongoose = require('mongoose');
const model = require('./src/model/model.js')

const url = "mongodb+srv://test:test@cluster0.uw4xd.mongodb.net/Bidule?retryWrites=true&w=majority";

async function connection(){
    mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
}

// ------------------------------------- CRUD ------------------------------------------- //

// CREATE
async function create(options){
    if (!options._id){
        options._id = mongoose.Types.ObjectId();
    }
    return await model.create(options)
    .then(function(res){ 
        console.log("Data inserted")    
        console.log(JSON.stringify(res))
    }).catch(function(error){ 
        console.log(error)        
    });
}
async function createMany(optionsArray){
    return await model.insertMany(optionsArray)
    .then(function(res){ 
        console.log(JSON.stringify(res))
        console.log("Data inserted")    
    }).catch(function(error){ 
        console.log(error)        
    }); 
}

// READ

async function selectAll(limit){
    if(limit)
        return await model.find().limit(limit);
    return await model.find();
}


async function select(options){
    return await model.find(options)
}

async function selectById(id){
    return await model.findById(id)
}

// UPDATE
async function updateOne(filter, dataToUpdate){
    return await model.updateOne(filter,dataToUpdate)
    .then(function(res){ 
        if (res === '[]'){
            console.log("Object not found")
        }else{
            console.log(JSON.stringify(res));
            console.log("Updated")
        }
    }).catch(function(error){ 
        console.log(error)      
    }); 
}

async function updateMany(filter,dataToUpdate){ // Filter = {}  for an update on all documents
    return await model.updateMany(filter,dataToUpdate)
    .then(function(res){ 
        if (res === '[]'){
            console.log("Objects not found")
        }else{
            console.log(JSON.stringify(res));
            console.log("Data Updated")
        }
    }).catch(function(error){ 
        console.log(error)        
    }); 
}



// DELETE

async function deleteOne(id){
    return await model.deleteOne({ _id: id })
    .then(function(res){ 
        console.log(res.deletedCount +" items deleted")    
    }).catch(function(error){ 
        console.log(error)        
    }); 
}


async function deleteMany(option){
    return await model.deleteMany(option)
    .then(function(res){ 
        console.log(res.deletedCount +" items deleted")    
    }).catch(function(error){ 
        console.log(error)        
    }); 
}

// TEST
async function test(){
    const itemstoCreate = [
        { date: "11/11/2020", name : "Image 2", taille : 234957, tauxReussite: 999, type : "Cat"},
        { date: "11/11/2020", name : "Image 3", taille : 234957, tauxReussite: 999, type : "Cat"},
        { date: "11/11/2020", name : "Image 4", taille : 234957, tauxReussite: 999, type : "Cat"},
        { date: "11/11/2020", name : "Image 5", taille : 234957, tauxReussite: 999, type : "Cat"},
    ]
    // let res = await selectAll(4)
    // console.log(res)
    // await createMany(itemstoCreate)
    // await createMany(itemsToCreate)
    // await updateOne({_id: "5fbe4918bfb8cd4ad84a2c88"},{text : "Goodbye"})
    // await updateMany({ text : { '$regex': "Description", "$options":"i"}},{text : "Modified"})
    // await deleteMany({ text : { '$regex': "Description", "$options":"i"}})
    let res = await selectById("5fbf8cb6cc8a8c197eb1242d")
    console.log(res)
    // await select({text : "Modified"})
    // await deleteOne('5fbe484621b6474a8c421c8a')
    
    // let res = await selectById('5fbf8cb6cc8a8c197eb1242d')
    // console.log(JSON.stringify(res))
    // mongoose.disconnect()
}


connection();

// test()
module.exports = {
    connection,
    create,
    createMany,
    selectAll,
    select,
    updateOne,
    updateMany,
    deleteOne,
    deleteMany,
    selectById
}