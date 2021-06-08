const mysql = require('mysql2');

const pool = mysql.createPool({ 
  host:'localhost', 
  user: 'root', 
  password: 'Xuan89917',
  database: 'dbdemo'
})

module.exports = pool.promise();
