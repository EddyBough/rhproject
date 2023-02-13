const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
    photo: {
        type: String,
        required: [true, "le nom est requis"]
    },
    name: {
        type: String,
        required: [true, "le nom est requis"]
    },
    fonction: {
        type: String,
        required: [true, "la fonction est requis"]
    },
    blame: {
        type: Number,
        default: 0
    },
    companyId: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "worker"
        }]
        
    }
})

const workerModel = mongoose.model("worker", workerSchema); // c'est ici qu'on va créer notre fichier qui contiendra les users (utilisateurs)
module.exports = workerModel