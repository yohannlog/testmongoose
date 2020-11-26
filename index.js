const express = require('express')
var mongoose = require('mongoose')
var helper = require('./src/service/testdb');
const app = express()
const port = 1000

var mongoDB = 'mongodb+srv://test:test@cluster0.uw4xd.mongodb.net/test'

/*mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology:true})

var db = mongoose.connection

db.on('error', console.error.bind(console, "MongoDB connection error:"))*/

app.set('views', './src/template');
app.set('view engine', 'ejs');


// app.get('/', (req, res) => {
//     res.render('truc', {    });
// })
//
// app.get('/coucou', (req, res) => {
//     res.render('',{})
// })

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