//All importing staements
import express from "express";
import { createConnection } from "mysql";
import Bluebird from "bluebird";

const app = express(); 
app.use(express.json());//by using express obj we are using json 
                         //to featch the data from client
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("Hello mahi khare!!!"));

app.get("/message", (req, res) => {
    let message = { id:1,message:"Hi", messageTime: new Date() };
    res.json(message);
});

app.get("/messages", async (req, res) => {
    let connectUri = {
        host: "localhost",
        user: "root",
        password: "mahi@7028",
        database: "cdac1",

    };
    let connection = createConnection(connectUri);
    Bluebird.promisifyAll(connection);

    await connection.connectAsync();

    let sql = `SELECT * FROM message `;
    let results = await connection.queryAsync(sql);

    await connection.endAsync(); //end the connection

    res.json(results); //print the result
});

app.post("/messagess", async (req, res) => {
    let connectUri = {
        host: "localhost",
        user: "root",
        password: "mahi@7028",
        database: "cdac1",
    };
    let connection = createConnection(connectUri);
    Bluebird.promisifyAll(connection);

    await connection.connectAsync();

    let message = req.body.message; //taking data from postman body
    let reply = req.body.reply;

    // let sql = `SELECT * FROM message ORDER BY id DESC`;
    let sql = `INSERT INTO message(message,reply) VALUES ('${message}', ${reply}) `;
    let results = await connection.queryAsync(sql);

    //execute query
    await connection.queryAsync(sql);

    connection.endAsync();

    res.json({msg:"Record Added !!"});
    //message is an object which shows string message
});

app.listen(3000);