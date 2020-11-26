const mongoose = require('mongoose');
const model = require('./src/model/model')

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
    .then(function(res){ 
        console.log(JSON.stringify(res))    
    }).catch(function(error){ 
        console.log(error)        
    }); 
}

async function selectById(id){
    return await model.find({_id: id})
    .then(function(res){ 
        res = JSON.stringify(res)
        res === "[]" ? console.log("Nothing found"): console.log(res)    
    }).catch(function(error){ 
        console.log(error)        
    }); 
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
        console.log(JSON.stringify(res))
        console.log(res.deletedCount +" items deleted")    
    }).catch(function(error){ 
        console.log(error)        
    }); 
}


async function deleteMany(option){
    return await model.deleteMany(option)
    .then(function(res){ 
        console.log("Data deleted")    
        console.log(JSON.stringify(res))    
        console.log(res.deletedCount +" items deleted")    
    }).catch(function(error){ 
        console.log(error)        
    }); 
}

// TEST
async function test(){
    // const itemstoCreate = [
    //     { url: "https://www.airbnb.com/users/show/890736", text : "Description 1", id:18553234 },
    //     { url: "https://www.airbnb.com/users/show/890736", text : "Description 2", id:1855322345 },
    //     { url: "https://www.airbnb.com/users/show/890736", text : "Description 3", id:1855324235 }
    // ]

    // await createMany(itemstoCreate)
    // await createMany(itemsToCreate)
    // await updateOne({_id: "5fbe4918bfb8cd4ad84a2c88"},{text : "Goodbye"})
    // await updateMany({ text : { '$regex': "Description", "$options":"i"}},{text : "Modified"})
    // await deleteMany({ text : { '$regex': "Description", "$options":"i"}})
    // await selectById('5fbe4918bfb8cd4ad84a2c88')
    // await select({text : "Modified"})
    // await deleteOne('5fbe484621b6474a8c421c8a')
}


connection();

test()
.then(
    ()=> mongoose.disconnect()
)
module.exports = {
    connection,
    create,
    createMany,
    selectAll,
    select,
    updateOne,
    updateMany,
    deleteOne,
    deleteMany
}