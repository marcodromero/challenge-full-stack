const express = require("express");
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const PORT = process.eventNames.PORT || 8080;

app.use(express.json());
app.use(cors());

app.listen(PORT , console.log(`Server started on port ${PORT}`));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'',
    database: 'personal_budget',
});

connection.connect(error =>{
    if(error) throw error;
    console.log('Database server running');
});

app.options('*', cors());

app.get('/operations',(req, res)=>{
    const query = 'SELECT id_operation, type, concept, amount, DATE_FORMAT(date, "%Y-%m-%d")as date, DATE_FORMAT(date, "%d/%m/%Y")as formattedDate FROM operations ORDER BY date DESC';
    connection.query(query,(error, results) =>{
        if(error){
            console.log(error.sqlMessage);
            res.status(400).send('Fail');
        }else{
            if (results.length > 0){
                res.json(results);
            }else{
                res.send('Not result');
            }
        }
    })
})

app.post('/operations',(req, res)=>{
   const {type, concept, amount, date} = req.body;
   const query = `INSERT INTO operations (type, concept, amount, date) VALUES("${type}", "${concept}", ${amount}, "${date}" )`;
  
   connection.query(query,(error, response) =>{
        if(error){
            console.log(error.sqlMessage);
            res.status(400).send('Fail');
        }else{
            res.status(201).send('Operation created');
        }
        
    })
    
})

app.patch('/operations',(req, res)=>{
    const {id_operation, concept, amount, date} = req.body;
    const query = `UPDATE operations SET concept = "${concept}", amount= ${amount}, date = "${date}" WHERE id_operation = ${id_operation}`;
    connection.query(query,(error) =>{
        if(error){
            console.log(error.sqlMessage);
            res.status(400).send('Fail');
        }else{
            res.status(204).send('Operation updated');
        }
   })
})

app.delete('/operations',(req, res)=>{
    const {id_operation} = req.body;
    const query = `DELETE FROM operations WHERE id_operation = ${id_operation}`;
    connection.query(query,(error, results) =>{
        if(error){
            console.log(error.sqlMessage);
            res.status(400).send('Fail');
        }else{
            res.status(204).send('Operation deleted');
        }
    })
})

app.get('/balance',(req, res)=>{
    const query = 'SELECT amount, DATE_FORMAT(date, "%d/%m/%Y")as formattedDate FROM balance ORDER BY date DESC LIMIT 10';
    connection.query(query,(error, results) =>{
        if(error){
            console.log(error.sqlMessage);
            res.status(400).send('Fail');
        }else{
            if (results.length > 0){
                res.json(results);
            }else{
                res.send('Not result'); 
            }
        }
    })
})

app.get('/last-balance',(req, res)=>{
    const query = 'SELECT amount, DATE_FORMAT(date, "%d/%m/%Y")as formattedDate FROM balance ORDER BY date DESC LIMIT 1';
    connection.query(query,(error, results) =>{
        if(error){
            console.log(error.sqlMessage);
            res.status(400).send('Fail');
        }else{
            if (results.length > 0){
                res.json(results);
            }else{
                res.send('Not result');
            }
        }
    })
})