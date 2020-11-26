const model = require('../src/model/model')
const express = require('express');
const router = express.Router();
const controller = require('../controller')

controller.connection();

router.get('/', async (req,res) =>{
    let items = await controller.selectAll(10);
    res.render('page',{items})
})

router.post('/add',async (req, res) => {
    await controller.create(req.body);
    res.redirect('/')
})

router.post('/addpre',async (req, res) => {

	console.log({name: req.body.imgname})
	await controller.updateOne({name: req.body.imgname},{tauxReussite: req.body.score, type: req.body.type});
	res.redirect('/')
});


router.get('/image/:id', async (req, res) => {
	let item = await controller.selectById(req.params.id);
    res.render('imageView', { item});
});
  
router.post('/image/:id', async (req, res) => {
    await controller.updateOne({_id: req.params.id},req.body)
    res.redirect('/');
});

router.get('/delete/:id', async (req, res) => {
    await controller.deleteOne(req.params.id)
    res.redirect('/');
});

module.exports = router