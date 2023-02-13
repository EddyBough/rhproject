const express = require ('express'); 
const mongoose = require('mongoose');
require('dotenv').config() // cache les données afin que le mdp et le lien github ne soit pas lu (comme des exceptions lorsqu'on exportera notre dossier)
const companyRouter = require('./routes/companyRouter'); //création du fichier routeur pour ajouter les projets
const workerRouter = require('./routes/workerRouter'); 
const db = process.env.BDD_URL // on a crypté l'url de mongoDB dans le fichier .env afin qu'elle ne soit pas lisible lors de l'export du projet
const session = require('express-session')
const app = express() // on démarre l'appli

app.use(session({secret: 'key', saveUninitialized: true, resave:true})) // pour sécuriser les pages auxquels on accédera une fois connecté
app.use(express.static("./assets")) // démarre tout ce qui est image etc...
app.use(express.urlencoded({extended: true})) // on encode notre form et on va le décoder pour qu'il soit utilisable sur notre route
app.use(express.json()) // on met du json au cas où on a besoin du json
app.use(companyRouter) // autorisation d'utiliser le companyRouter sinon ca ne marche pas 
app.use(workerRouter) // autorisation d'utiliser le workerRouter sinon ca ne marche pas

app.listen(3001, (err)=>{ // ecoute le port 3001
    if (err) {
        console.log(err); // affiche l'erreur s'il y a erreur
    } else {
        console.log("vous êtes connecté"); // sinon ca marche 
    }
})
mongoose.set('strictQuery', true); // c'est grâce à ca qu'on fera en sorte que dans le Schema ce sera exactement ce qu'on mettra dans le Model
mongoose.connect(db,(err)=>{ // connexion à la bdd 
    if (err) {
        console.log(err); 
    } else {
        console.log("base de donnée opérationnelle");
    }
})

