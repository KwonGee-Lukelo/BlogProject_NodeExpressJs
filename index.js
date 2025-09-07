import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

//Middleware Static Files d'Express
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extend: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/publier", (req, res) => {
  res.render("publier.ejs");
});

app.post("/submit", (req, res) => {});

app.listen(port, () => {
  console.log(`Votre Serveur tourne sur le port ${port}`);
});
