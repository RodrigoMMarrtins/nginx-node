const express = require("express");
const mysql = require("mysql");
const app = express();
const port = 3000;
const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
};

const connection = mysql.createConnection(config);


app.get("/", (req, res) => {
    connection.query("SELECT * FROM people", (err, result, fields) => {
        if (err) throw err;
        res.send(`
            <h1>Full Cycle Rocks!</h1>
            <br/>
            <pre>${JSON.stringify(result, 2, null)}</pre>
        `);
    });
});

app.listen(port, () => {
    console.log(`Rodando na porta ${port}`);
});
