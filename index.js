const express = require('express')
var mongoose  = require('mongoose')
var helper = require('./fonctions/testdb');
const app = express()
const port = 1000

var mongoDB = 'mongodb+srv://test:test@cluster0.uw4xd.mongodb.net/test'

/*mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology:true})

var db = mongoose.connection

db.on('error', console.error.bind(console, "MongoDB connection error:"))*/

app.set('views', './views');
app.set('view engine', 'ejs');


app.get('/', async (req, res) => {
	try {
		console.log("z")
		let result = await helper.selectAll(10)
		console.log(result)
		res.render('page.ejs', {ress: result});
	} catch (err) {
		console.log(err)
	}
})

app.listen(port, () => {
	console.log('Example app listening at http://localhost:${port}')
})
