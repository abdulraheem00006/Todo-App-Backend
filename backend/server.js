// So this server.js acts as an api
// Now I have a value.json file which has an object with an array inclosed in the object.
// The array contains hard coded objects but I want to update that json file dynamically.

/* First lets start with the simple task of sending data to the postman, so that the hard coded
 objects are visible there. */

/* Now I'll try to import Values.json file that is stored in the backend folder to this file  
 and then send that hardcoded object to the postman */
// import data from "./Values.json";

const express = require("express");
const app = express();
const port = 4000;
const path = require("path");
const filepath = path.join(__dirname, "Values.json");
const data = require(filepath);
const fs = require("fs");

app.use(express.json());

app.get("/", (req, res) => {
  res.send(JSON.stringify(data.data));
});

app.post("/add", (req, res) => {
  const dataReceived = req.body;

  data.push(dataReceived);

  fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
});

app.delete("/delete", (req, res) => {
  const dataDelete = req.body.id;

  const updatedData = data.filter((data) => data.id !== dataDelete);

  fs.writeFileSync(filepath, JSON.stringify(updatedData, null, 2));
});

app.put("/put/:id", (req, res) => {
  

  const dataToUpdate = req.body;

  const urlId = Number(req.params.id);


  const newObject = data.map((item) => {
    return urlId === item.id ? { ...item, ...dataToUpdate } : item;
  });



  fs.writeFileSync(filepath, JSON.stringify(newObject, null, 2));

  res.json(newObject);
});

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

app.listen(port, () => {
  console.log(`Example app listens on port ${port}`);
});

// Hello world is visble on the browser and also in the postman app
