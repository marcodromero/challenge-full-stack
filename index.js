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
    const query = 'SELECT id_operation, type, concept, amount, DATE_FORMAT(date, "%Y-%m-%d")as date, DATE_FORMAT(date, "%d/%m/%Y")as formattedDate FROM operations ORDER BY date DESC, id_operation DESC';
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
   let errorStatus = 0;
   let msgStatus;
   
   if(type != "egreso" && type != "ingreso"){msgStatus = 'Tipo no valido'; errorStatus = 1};
   if(concept === '') {msgStatus = 'Concepto no puede estar vacio.'; errorStatus = 1};
   if(amount === '') {msgStatus = 'Monto no puede estar vacio.'; errorStatus = 1};
   let _amount = `${amount}`;
   if(isNaN(_amount)) {msgStatus = 'Monto debe ser numerico.'; errorStatus = 1};
   const expressionAmount = /^(\-|)(\d{1,8}).(\d{1,2})$/;
   if(expressionAmount.test(amount) === false){msgStatus = 'Monto no respeta el formato.'; errorStatus = 1};
   const expression = /^(20[2-9][0-9])(\-)(0[1-9]|1[0-2])(\-)(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/;
   if(expression.test(date) === false){msgStatus = 'Fecha no respeta el formato.'; errorStatus = 1};

   if(errorStatus == 0){
        const query = `INSERT INTO operations (type, concept, amount, date) VALUES("${type}", "${concept}", ${amount}, "${date}" )`;
    
        connection.query(query,(error, response) =>{
            if(error){console.log(error.sqlMessage);}
            else{
                res.status(201).send('Operation created');    
            }
        })
    }
    else{
        res.status(400).send(msgStatus);    
        }
})

app.patch('/operations',(req, res)=>{
    const {id_operation, concept, amount, date} = req.body;
    let errorStatus = 0;
    let msgStatus;
   
    if(concept === '') {msgStatus = 'Concepto no puede estar vacio.'; errorStatus = 1};
    if(amount === '') {msgStatus = 'Monto no puede estar vacio.'; errorStatus = 1};
    let _amount = `${amount}`;
    if(isNaN(_amount)) {msgStatus = 'Monto debe ser numerico.'; errorStatus = 1};
    const expressionAmount = /^(\-|)(\d{1,8}).(\d{1,2})$/;
    if(expressionAmount.test(amount) === false){msgStatus = 'Monto no respeta el formato.'; errorStatus = 1};
    const expression = /^(20[2-9][0-9])(\-)(0[1-9]|1[0-2])(\-)(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/;
    if(expression.test(date) === false){msgStatus = 'Fecha no respeta el formato.'; errorStatus = 1};

    if(errorStatus == 0){
        const query = `UPDATE operations SET concept = "${concept}", amount= ${amount}, date = "${date}" WHERE id_operation = ${id_operation}`;
        connection.query(query,(error) =>{
            if(error){console.log(error.sqlMessage);}
            else{
                res.status(204).send('Operation updated');
            }
        })
    }
    else{
        res.status(400).send(msgStatus);    
    }
})

app.delete('/operations',(req, res)=>{
    const {id_operation} = req.body;
    let errorStatus = 0;
    let msgStatus;

    let _id_operation = `${id_operation}`;
    if(isNaN(_id_operation)) {msgStatus = 'Id de operación no valido.'; errorStatus = 1};

    if(errorStatus == 0){
        const query = `DELETE FROM operations WHERE id_operation = ${id_operation}`;
        connection.query(query,(error, results) =>{
            if(error){console.log(error.sqlMessage);}
            else{
                res.status(204).send('Operation deleted');
            }
        })
    }
    else{
        res.status(400).send(msgStatus);    
    }

})

app.get('/balance',(req, res)=>{
    const query = 'SELECT amount, date, DATE_FORMAT(date, "%d/%m/%Y")as formattedDate FROM balance ORDER BY id_balance DESC LIMIT 10';
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
