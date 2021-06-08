var express = require('express');
var router = express.Router();

router.get('/', async function (req, res, next) {
    let data;
    try {
      const [rows] = await db.query('SELECT * FROM books ORDER BY id desc');
      data = rows;
      // res.json(data);
      res.render('books', { data });
    } catch (err) {
      console.log('Errors on getting books!');
      res.render('books', { data: '' });
    }
  });

module.exports = router;
