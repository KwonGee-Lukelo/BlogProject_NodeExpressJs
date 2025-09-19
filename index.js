import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let tabArticle = [];

//Middleware Static Files d'Express
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extend: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { articlePublier: tabArticle });
});

app.get("/publier", (req, res) => {
  res.render("publier.ejs");
});

app.post("/submit", (req, res) => {
  console.log(req.body);
  let indexArticle = req.body["index"];
  let titreArticle = req.body["titre"];
  let contenuArticle = req.body["article"];
  let auteurArticle = req.body["auteur"];
  const date = new Date();

  //recuperation des éléments constitutifs d'une date
  let jour = date.getDate();
  let mois = date.getMonth() + 1;
  let annee = date.getFullYear();

  //recuperation des éléments constitufifs d'une heure
  let heure = date.getHours();
  let minute = date.getMinutes();

  //Formatage de la date et de l'heure
  let dateFormater = `${jour}/${mois}/${annee}`;
  let heureFormater = `${heure}:${minute}`;

  //objet article
  let nouvelArticle = {
    indexArticle,
    titreArticle,
    contenuArticle,
    auteurArticle,
    dateFormater,
    heureFormater,
  };

  tabArticle.push(nouvelArticle);

  res.redirect("/");
});

//supprimer article
app.post("/delete/:indexArticle", (req, res) => {
  //const numero = parseInt(req.params.indexArticle, 10); //On prend le parametre de notre url qui constitue notre requette, on trouve la propriete indexArticle
  const index = Math.floor(Math.random() * tabArticle.length);
  if (!isNaN(index) && index >= 0) {
    tabArticle.splice(index, 1);
  }
  res.redirect("/");

  console.log(index);
});

//modifier article
app.get("/edit/:indexArticle", (req, res) => {
  const index = Math.floor(Math.random() * tabArticle.length);
  const article = tabArticle[index];
  if (!article) {
    return res.redirect("/");
  }
  res.render("modifier.ejs", { article, index });
});

//enregistrer modification article
app.post("/edit/:indexArticle", (req, res) => {
  const index = Math.floor(Math.random() * tabArticle.length);
  if (tabArticle[index]) {
    tabArticle[index].titreArticle = req.body.titre;
    tabArticle[index].contenuArticle = req.body.article;
    tabArticle[index].auteurArticle = req.body.auteur;
    // Tu peux aussi mettre à jour la date/heure si tu veux
  }
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Votre Serveur tourne sur le port ${port}`);
});
