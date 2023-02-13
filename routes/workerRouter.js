const workerModel = require('../models/workerModel')
const { single } = require('../services/uploaderImg')
const upload = require('../services/uploaderImg')
const authGuard = require("../services/authguard")
const workerRouter = require('express').Router()



//-----------------------------------------------AJOUTER UN EMPLOYE-----------------------------------------------------------------------
workerRouter.get("/addworker", async (req, res)=>{ //Cette ligne permet de récupérer la page addworker 
    res.render('addworker.twig')// Là elle va s'afficher
})

workerRouter.post("/addworker",upload.single("photo"), async (req, res)=>{ //C'est une fois qu'on appui sur "valider" que le formulaire sera envoyé à la bdd
    req.body.photo = req.file.filename
    req.body.companyId = req.session.companyId
    let worker = new workerModel(req.body) // ca veut dire que une fois tous les champs remplis il va envoyer le body des réponses ( les champs requis remplis) 
    worker.save() // là l'inscription sera validée
    res.redirect('/clientview') // une fois tout ca fait, redirige moi vers la page "connexion"
})
//------------------------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------SUPPRIMER UN EMPLOYE------------------------------------------------------------------------

workerRouter.get("/deleteUser/:id", async (req, res)=>{ // C'est la fonction qui permettra d'effacer mes employés sur la bdd (ne pas oublier l'id)
  await workerModel.deleteOne({_id: req.params.id}) // pendant que : 
    res.redirect("/clientview")
    })

//--------------------------------------------------- MODIFIER EMPLOYE-------------------------------------------------------------------------

workerRouter.get("/updateWorker/:id", authGuard, async (req, res)=>{// Fonction qui affiche la page updateWorker
  let worker = await workerModel.findOne({_id: req.params.id}) // recupère l'id de l'employé
  res.render('updateWorker.twig',{ // affiche moi la page updateWorker
    worker: worker
  })// Elle nous ramene sur la page UpdateWorker twig, pour l'afficher
   
})
workerRouter.post("/updateWorker/:id", upload.single('photo'), authGuard, async (req, res)=>{ // poster une nouvelle photo modifiée
  if (req.file) {
    req.body.photo = req.file.filename
  }
  await workerModel.updateOne({_id: req.params.id}, req.body)
     res.redirect("/clientview")// redirige vers clientview
})
          
          



module.exports = workerRouter






