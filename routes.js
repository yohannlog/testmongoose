const model = require('./model')
const express = require('express');
const { selectAll, connection } = require('./controller');
const router = express.Router();
const controller = require('./controller')

controller.connection()
console.log(controller.selectAll(model,2))

router.get('/', async (req,res) =>{
    let items = controller.selectAll(model,10);
    res.render('index',{items})
    console.log(items)
})

router.post('/add',async (req, res) => {
    controller.create(model,req.body);
    res.redirect('/')
})

router.get('/edit/:id', async (req, res) => {
    let item = controller.select(model,{_id: req.params.id})
    res.render('edit', { item });
});
  
router.post('/edit/:id', async (req, res) => {
    controller.updateOne(model,{_id: req.params.id},req.body)
    res.redirect('/');
});

router.get('/delete/:id', async (req, res) => {
    controller.deleteOne(model,req.params.id)
    res.redirect('/');
});

