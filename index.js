const express = require('express')
var mongoose  = require('mongoose')
const app = express()
const port = 1000

var mongoDB = 'mongodb+srv://test:test@cluster0.uw4xd.mongodb.net/test'

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology:true})

var db = mongoose.connection

db.on('error', console.error.bind(console, "MongoDB connection error:"))

app.get('/', (req, res) => {
	res.send('Hello World')
})

app.listen(port, () => {
	console.log('Example app listening at http://localhost:${port}')
})
