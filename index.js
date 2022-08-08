const express = require("express");
const mysql = require('mysql');

const app = express();


const PORT = process.eventNames.PORT || 8080;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'',
    database: 'personal_budget',
});


app.post("/test", (req, res) => {
    console.log("Connected to React");
    res.redirect("/");
});

connection.connect(error =>{
    if(error) throw error;
    console.log('Database server running');
});

app.listen(PORT , console.log(`Server started on port ${PORT}`));