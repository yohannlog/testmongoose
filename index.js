const express = require('express')
var mongoose  = require('mongoose')
var bodyParser = require('body-parser')
var formidable = require('formidable')
const controller = require('./controller.js')
const indexRoutes = require('./routes/routes.js')
const app = express()
const port = 1000
let fs =require('fs-extra');

var mongoDB = 'mongodb+srv://test:test@cluster0.uw4xd.mongodb.net/test'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.set('views', './src/template');
app.set('view engine', 'ejs');

app.use('/', indexRoutes)
app.post('/upload', async (req, res) => {

	let form = new formidable.IncomingForm();
	form.uploadDir = "./img";
	form.keepExtensions = true;

	form.parse(req, function (err, fields, files) {
		res.writeHead(200, {'content-type': 'text/plain'});
		res.write('received upload\n\n');

		console.log("form.bytesReceived");
		console.log("file size: "+JSON.stringify(files.fileUploaded.size));
		console.log("file path: "+JSON.stringify(files.fileUploaded.path));
		console.log("file name: "+JSON.stringify(files.fileUploaded.name));
		console.log("file type: "+JSON.stringify(files.fileUploaded.type));
		console.log("astModifiedDate: "+JSON.stringify(files.fileUploaded.lastModifiedDate));

		fs.rename(files.fileUploaded.path, './img/'+files.fileUploaded.name, function(err) {
			if (err)
				throw err;
			console.log('renamed complete');
		});
		res.end();
	});
});
app.listen(port, () => {
	console.log('Example app listening at http://localhost:'+port)
})

