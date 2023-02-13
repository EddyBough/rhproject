const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "pas de nom"],
    },
    siret: {
        type: Number,
        required: [true, "siret est requis"]
    },
    mail: {
        type: String,
        required: [true, "email est requis"]
    },
    director: {
        type: String,
        required: [false, "Le nom du Directeur est requis" ]
    },
    password: {
        type: String,
        required: [false, "Mot de passe requis" ]
    }
})

const companyModel = mongoose.model("company", companySchema); // c'est ici qu'on va créer notre fichier qui contiendra les users (utilisateurs)
module.exports = companyModel 