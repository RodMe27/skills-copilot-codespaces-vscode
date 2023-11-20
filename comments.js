//Create web server
const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//Create database connection
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'comments'
});
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
});
//Create table
app.get('/create-table', (req, res) => {
    let sql = 'CREATE TABLE comments (id int AUTO_INCREMENT, name VARCHAR(255), comment VARCHAR(255), PRIMARY KEY (id))';
    connection.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Table created...');
    });
});
//Insert into table
app.post('/add-comment', (req, res) => {
    let comment = req.body;
    let sql = 'INSERT INTO comments SET ?';
    connection.query(sql,