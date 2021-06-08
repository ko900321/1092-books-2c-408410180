var express = require('express');
const fetch = require('node-fetch');
var router = express.Router();

router.get('/', async function (req, res, next) {
    try {
        const response = await fetch('http://localhost:1337/books');
        data = await response.json();
        //const [rows] = await db.query('SELECT * FROM books ORDER BY id desc');
        
        // res.json(data);
        res.render('apiBooks/index', { data });
    } catch (err) {
        console.log('Errors on getting books!');
        res.render('apiBooks/index', { data: '' });
    }
  });

  router.get('/add', async function (req, res, next) {
    //res.send('display add book page')
    res.render('apiBooks/add',{
      name: '',
      author:'',
    });
  });

module.exports = router;
