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

// @GET @keywords
app.get("/memories/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM memories where id = ?", id, (err, result) => {
    if (err) return console.log(err);
    else {
      res.send(result[0].keywords.split(" "));
    }
  });
});

// @New @POST @memories
app.post("/memories", (req, res) => {
  //validate
  /*   const { error } = validateMemory(req.body.memory);
  if (error) return res.status(400).send(error.details[0].message);
 */

  //SQL
  console.log(req.body);

  let sql = "INSERT INTO memories SET ?";

  db.query(sql, req.body, (err, result) => {
    if (err) return console.log(err);
    console.log(result);
    res.send("memory inserted");
  });
});

// @validate @joi
function validateMemory(memory) {
  const schema = {
    memory: Joi.string()
      .required()
      .max(300)
  };
  return Joi.validate(memory, schema);
}

const port = 3000;
app.listen(port, () => {
  console.log(`listening on $(port)`);
});
