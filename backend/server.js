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
const cors = require("cors");

const readData = () => {
  const file = fs.readFileSync(filepath, "utf-8");
  return JSON.parse(file);
};

const writeData = (data) => {
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
};

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  const data = readData();
  res.status(200).json(data);
});

app.post("/add", (req, res) => {
  const dataReceived = req.body;
  const data = readData();

  data.push(dataReceived);
  writeData(data);
  res.sendStatus(201);
});

app.delete("/delete/:id", (req, res) => {
  const data = readData();
  const urlId = Number(req.params.id);
  const updatedData = data.filter((item) => item.id !== urlId);

  writeData(updatedData);
  res.sendStatus(200);
});

app.put("/put/:id", (req, res) => {
  const dataToUpdate = req.body;
  const urlId = Number(req.params.id);

  const newObject = data.map((item) => {
    return urlId === item.id ? { ...item, ...dataToUpdate } : item;
  });

  writeData(newObject);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Example app listens on port ${port}`);
});
