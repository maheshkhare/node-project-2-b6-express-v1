//All importing staements
import express from "express";
import { createConnection } from "mysql";
import Bluebird from "bluebird";

const app = express();

/** Learning here Creating URLs / Endpoints */

/*  http://localhost:3000/  */
app.get("/", (req, res) => res.send("Hello mahi khare!!!"));

/* GET / GIVE ME MESSAGE */
/*  http://localhost:3000/message  */
app.get("/message", (req, res) => {
    let message = { id:1,message:"Hi", messageTime: new Date() };
    res.json(message);
});

/*  http://localhost:3000/messages  */
// inside url we writen all the code
app.get("/messages", async (req, res) => {
    let connectUri = {
        host: "localhost",
        user: "root",
        password: "mahi@7028",
        database: "cdac1",
        // connection details
    };
    let connection = createConnection(connectUri);
    Bluebird.promisifyAll(connection);

    await connection.connectAsync();

    // let sql = `SELECT * FROM message ORDER BY id DESC`; //oder by query
    let sql = `SELECT * FROM message `;
    let results = await connection.queryAsync(sql);

    await connection.endAsync(); //end the connection

    res.json(results); //print the result
});

/*  POST / INSERT / ADD / CREATE NEW MESSAGE */
/*  http://localhost:3000/message  */
app.get("/messagess", async (req, res) => {
    let connectUri = {
        host: "localhost",
        user: "root",
        password: "mahi@7028",
        database: "cdac1",
    };
    let connection = createConnection(connectUri);
    Bluebird.promisifyAll(connection);

    await connection.connectAsync();

    //hardcoded message
    let message = "Hello Node Mysql Bluebird!!!!";
    let reply = 0;

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