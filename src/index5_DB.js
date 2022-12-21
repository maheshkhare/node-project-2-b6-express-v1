//All importing statements
import express from "express";
import { createConnection } from "mysql";
import Bluebird from "bluebird";
import cors from "cors";

const app = express();
app.use(express.json()); //by using express obj we are using json
//to featch the data from client
app.use(express.urlencoded({ extended: true }));
app.use(cors());

let connectUri = {
  host: "localhost",
  user: "root",
  password: "mahi@7028",
  database: "cdac1",
};

app.get("/", (req, res) => res.send("Hello mahi khare!!!"));

app.get("/message", (req, res) => {
  let message = { id: 1, message: "Hi", messageTime: new Date() };
  res.json(message);
});

/* http://localhost:3000/messages */
app.get("/messages", async (req, res) => {
  let list = [];
  let connection = createConnection(connectUri);
  Bluebird.promisifyAll(connection);

  await connection.connectAsync();

  let sql = `SELECT * FROM message ORDER BY ID DESC `;
  let results = await connection.queryAsync(sql);

  await connection.endAsync(); //end the connection

  res.json(results); //print the result
});

/* http://localhost:3000/message */
app.post("/message", async (req, res) => {
  let connection = createConnection(connectUri);
  Bluebird.promisifyAll(connection);

  await connection.connectAsync();

  let message = req.body.message; //taking data from postman body
  let reply = req.body.reply;

  // let sql = `SELECT * FROM message ORDER BY id DESC`;
  let sql = `INSERT INTO message(message,reply) VALUES (?, ?) `;

  await connection.queryAsync(sql, [message, reply]);
  //it works like prepared statements

  connection.endAsync();

  res.json({ msg: "Record Added !!" });
  //message is an object which shows string message
});

app.listen(3001);
