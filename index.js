const express = require('express')
// var mongoose  = require('mongoose')
var path = require("path");
var bodyParser = require('body-parser')
var formidable = require('formidable')
const controller = require('./controller')
const indexRoutes = require('./routes/routes.js')
// const CocoService = require('./src/service/CocoService')
const app = express()
const port = 1000
let fs =require('fs-extra');
const {model} = require("mongoose");


var mongoDB = 'mongodb+srv://test:test@cluster0.uw4xd.mongodb.net/test'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.set('views', './src/template');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRoutes)
app.post('/upload', async (req, res) => {

	let form = new formidable.IncomingForm();
	form.uploadDir = "./public/img";
	form.keepExtensions = true;

	await form.parse(req, async function (err, fields, files) {
		console.log("form.bytesReceived");

		console.log("file size: "+JSON.stringify(files.fileUploaded.size));
		console.log("file path: "+JSON.stringify(files.fileUploaded.path));
		console.log("file name: "+JSON.stringify(files.fileUploaded.name));
		console.log("file type: "+JSON.stringify(files.fileUploaded.type));
		console.log("astModifiedDate: "+JSON.stringify(files.fileUploaded.lastModifiedDate));
		fs.rename(files.fileUploaded.path, 'public/img/'+files.fileUploaded.name, function(err) {
			if (err)
				throw err;
			else{
				console.log('renamed complete');
				res.render("upload.ejs",{image:'./img/'+files.fileUploaded.name})
			}
		});
		let date = new Date().toISOString()
		await controller.create({date: date, name: files.fileUploaded.name, taille: files.fileUploaded.size});
	});
});
app.listen(port, () => {
	console.log('App listening at http://localhost:'+port)
})

