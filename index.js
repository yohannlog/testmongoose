const express = require('express')
// var mongoose  = require('mongoose')
var path = require("path");
var bodyParser = require('body-parser')
var formidable = require('formidable')
const controller = require('./controller')
// const CocoService = require('./src/service/CocoService')
const app = express()
const port = 1000
let fs =require('fs-extra');

var mongoDB = 'mongodb+srv://test:test@cluster0.uw4xd.mongodb.net/test'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.set('views', './src/template');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
	try {
		console.log("z")
		//let result = await helper.selectAll(3)
		//console.log(result[0].name)
		res.render('page.ejs');
	} catch (err) {
		console.log(err)
	}
})

app.post('/upload', async (req, res) => {

	let form = new formidable.IncomingForm();
	form.uploadDir = "./public/img";
	form.keepExtensions = true;

	form.parse(req, function (err, fields, files) {
		// res.writeHead(200, {'content-type': 'text/plain'});
		// res.write('received upload\n\n');
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
		// res.end();
	});
});

app.listen(port, () => {
    console.log('Example app listening at http://localhost:${port}')
})

app.get('/', async (req,res) =>{
    let items = controller.selectAll(model,10);
    res.render('page',{items})
    console.log(items)
})

app.post('/add',async (req, res) => {
    controller.create(model,req.body);
    res.redirect('/')
})

app.get('/edit/:id', async (req, res) => {
    let item = controller.select(model,{_id: req.params.id})
    res.render('edit', { item });
});

app.post('/edit/:id', async (req, res) => {
    controller.updateOne(model,{_id: req.params.id},req.body)
    res.redirect('/');
});

app.get('/delete/:id', async (req, res) => {
    controller.deleteOne(model,req.params.id)
    res.redirect('/');
});