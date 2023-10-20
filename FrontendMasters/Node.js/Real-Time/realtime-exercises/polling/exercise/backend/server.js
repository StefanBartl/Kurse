import express from "express";
import bodyParser from "body-parser";
import nanobuffer from "nanobuffer";
import morgan from "morgan";
import { writeFile, readFile } from "fs";

// set up a limited array
const msg = new nanobuffer(50);
const getMsgs = () => Array.from(msg).reverse();

// feel free to take out, this just seeds the server with at least one message
if(getMsgs().length === 0) {
  msg.push({
    user: "wkd",
    text: "hawedehre",
    time: Date.now(),
  });
};

// get express ready to run
const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.static("frontend"));

/* without DB
app.get("/poll", function (req, res) {
  // use getMsgs to get messages to send back
  // write code here
  
  res.json({
    msg: getMsgs(),
  });

});
*/

app.get("/poll", function (req, res) {
  readFile("./exercise-db.json", "utf8", (err, data) => {
    console.log(data)
    if (err) {
      console.error('Fehler beim Lesen der Datei:', err);
      res.status(500).json({ error: 'Fehler beim Lesen der Datei' });
    } else {
      //console.log('Daten erfolgreich gelesen.');
      const content = JSON.parse(data);
      res.json({ msg: content });
    }
  });
});


app.post("/poll", function (req, res) {
  // add a new message to the server
  // write code here
  const {user, text} = req.body;

  msg.push({
      user,
      text,
      time: Date.now(),
    });

    // DB write
  const dataToWrite = JSON.stringify(getMsgs());
  console.log(dataToWrite)
  writeFile("./exercise-db.json", dataToWrite, (err) => {
    if (err) {
      console.error('Fehler beim Schreiben der Datei:', err);
    } else {
      //console.log('Daten erfolgreich in die Datei geschrieben.');
    }
  });

  res.json({status: "ok"})
});

// start the server
const port = process.env.PORT || 3000;
app.listen(port);
console.log(`listening on http://localhost:${port}`);
