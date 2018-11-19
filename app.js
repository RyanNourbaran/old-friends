const express = require("express");
const mysql = require("mysql");
const Joi = require("joi");

// @Express
const app = express();
app.use(express.json());

// @Body @Parser body parser
const bodyParser = require("body-parser");

// @DB connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "oldfriends"
});

db.connect(err => {
  if (err) {
    throw err;
  } else {
    console.log("My sql connected");
  }
});

// @New @POST @memory
app.get("/new-memory", (req, res) => {
  //validate
  const { error } = validateMemory(req.body.memory);
  if (error) return res.status(400).send(error.details[0].message);

  //SQL
  post = { memory: `req.body.memory` };
  let sql = "INSERT INTO memories ?";
  db.query(sql, (err, result) => {
    if (err) return console.log(err);
    console.log(result);
    res.send("memory inserted");
  });
});

// @validate @joi
function validateMemory(memory) {
  const schema = {
    memory: Joi.string()
      .min(3)
      .required()
      .allow(null)
  };
  return Joi.validate(memory, schema);
}

const port = 3000;
app.listen(port, () => {
  console.log(`listening on $(port)`);
});
