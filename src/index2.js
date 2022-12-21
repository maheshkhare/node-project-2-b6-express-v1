import express from "express"
const app  = express();

app.get("/", (req, res) => res.send("Hello mahi!!!"));

/*  http://localhost:3000/messages  */
app.get("/message", (req, res) => {
    let message = { id:1, message:"Hi", messageTime: new Date()};
    res.json(message);
    //created a object and that object data passed trough json object
});

/*  http://localhost:3000/messages  */
app.get("/messages", (req, res) => {
    let list = [];
    list.push({ id:1, message:"Hi", messageTime: new Date()});
    list.push({ id:2, message:"hello", messageTime: new Date()});
//created a list and all objects are strored inside the list and giving responce by using json object
    res.json(list);
});

app.listen(3000);
