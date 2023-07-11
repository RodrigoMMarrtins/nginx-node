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

const createTable =
    "CREATE TABLE IF NOT EXISTS people (id int NOT NULL AUTO_INCREMENT PRIMARY KEY, name varchar(255) NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8;";
connection.query(createTable);

let sql = `INSERT INTO people(name) values ('Rodrigo')`;
connection.query(sql);

app.get("/", (req, res) => {
    connection.query("SELECT * FROM people", (err, result, fields) => {
        if (err) throw err;

        let html = `
            <h1>Full Cycle Rocks!</h1>
            <br/>
        `;
        let list = "";
        result.forEach((n) => (list += "<li>" + n.name + "</li>"));
        html += "<ul>";
        html += list;
        html += "</ul>";
        res.send(html);
    });
});

app.listen(port, () => {
    console.log(`Rodando na porta ${port}`);
});
