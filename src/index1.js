import express from "express"

const app = express();

/** Learning here Creating URLs / Endpoints */

/*  http://localhost:3000/  */
app.get("/", (req, res) => res.send("Hello mahi!!"));

/*  http://localhost:3000/cdac  */
app.get("/cdac", (req, res) => res.send("Hello mahesh!!"));

/*  http://localhost:3000/explore  */
app.get("/mahi", (req, res) => res.send("Hello mahesh how are you!!"));

app.listen(3000);//giving by-default port no=3000
