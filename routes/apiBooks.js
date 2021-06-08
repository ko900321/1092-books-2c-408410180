var express = require('express');
const fetch = require('node-fetch');
var router = express.Router();

router.get('/', async function (req, res, next) {
    try {
        const response = await fetch('http://localhost:1337/books');
        const data = await response.json();
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

router.post('/add', async function (req, res, next) {
    //res.send('Add a new book.')
    const name = req.body.name;
    const author = req.body.author;
    console.log(name,author);
  
    const form_data = {
      name: name,
      author: author,
    }
    try{
      //await db.query('INSERT INTO books SET ?',form_data); 
 
    const response = await fetch('http://localhost:1337/books', {
        method: 'post',
        body:    JSON.stringify(form_data),
        headers: { 'Content-Type': 'application/json' },
    })
    const data = await response.json();

    res.redirect('/apiBooks');
    }catch(err){
      console.log(err);
      res.render('apiBook/add',{
        name: form_data.name,
        author: form_data.author,
      })
    }
  });

  router.get('/edit/:id', async function (req, res, next) {
    //res.send('display edit book page');
    const id = req.params.id;
    try{
        const response = await fetch(`http://localhost:1337/books/${id}`);
        const data = await response.json();
        //const [rows] = await db.query('SELECT * FROM books WHERE id = ?', [id]);

    res.render('apiBooks/edit',{
        id: data.id,
        name: data.name,
        author: data.author,
  
      })
    }catch(err){
      console.log(err);
    }
  });

  router.post('/update', async function (req, res, next) {
    //res.send('update book data');
    const name = req.body.name;
    const author = req.body.author;
    const id = req.body.id;

    const form_data = {
        name: name,
        author: author,
      }
    try{
        const response = await fetch(`http://localhost:1337/books/${id}`, {
            method: 'put',
            body:    JSON.stringify(form_data),
            headers: { 'Content-Type': 'application/json' },
        });
    const data = await response.json();
    //   await db.query('UPDATE books SET name = ?, author = ? WHERE id = ?', [
    //     name,
    //     author,
    //     id,
    //   ]);
    //res.status(200).json({message: 'Updating successful'});
    res.redirect('/apiBooks');
    }catch(err){
      console.log(err);
    }
  });



module.exports = router;
