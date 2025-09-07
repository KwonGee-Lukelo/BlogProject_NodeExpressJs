import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let tabArticle =[];

//Middleware Static Files d'Express
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extend: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { articlePublier : tabArticle});
});

app.get("/publier", (req, res) => {
  res.render("publier.ejs");
});

app.post("/submit", (req, res) => {
  console.log(req.body);
  let titreArticle = req.body["titre"];
  let contenuArticle = req.body["article"];
  const date = new Date()

  //recuperation des éléments constitutifs d'une date
  let jour = date.getDate();
  let mois = date.getMonth() + 1;
  let annee = date.getFullYear();

  //recuperation des éléments constitufifs d'une heure
  let heure = date.getHours();
  let minute = date.getMinutes();

  //Formatage de la date et de l'heure
  let dateFormater = `${jour}/${mois}/${annee}`;
  let heureFormater = `${heure}:${minute}`

  //objet article
  let nouvelArticle = {
    titreArticle,
    contenuArticle,
    dateFormater,
    heureFormater
  }

  tabArticle.push(nouvelArticle);

  res.redirect("/")
});

app.listen(port, () => {
  console.log(`Votre Serveur tourne sur le port ${port}`);
});
