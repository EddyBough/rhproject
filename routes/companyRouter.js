const companyRouter = require("express").Router() // Constante pour créer un routeur qui a pour nom userRouter
const companyModel = require("../models/companyModel")
const workerModel = require("../models/workerModel")
const userModel = require("../models/workerModel") // Constante qui va contenir le userModel
const authGuard = require("../services/authguard")
const crypto = require('../services/crypto')

// ------------------------------------------------------ HOME --------------------------------------------------------------------------------
companyRouter.get("/home", async (req, res)=>{
     //Cette ligne permet de creer la route home
    res.render('home.twig',{
        
    })// Elle nous ramene sur la page home twig, pour l'afficher
})
//-------------------------------------------------REGISTER------------------------------------------------------------------------------------
companyRouter.get("/register", async (req, res)=>{ //Cette ligne permet de récupérer la page register (inscription)
    res.render('register.twig')// Là elle va s'afficher
})

companyRouter.post("/register", async (req, res)=>{ //C'est une fois qu'on appui sur "valider" que le formulaire sera envoyé à la bdd
    req.body.password = await crypto.cryptPassword(req.body.password)
    let company = new companyModel(req.body) // ca veut dire que une fois tous les champs remplis il va envoyer le body des réponses ( les champs requis remplis) 
    company.save() // là l'inscription sera validée
    res.redirect('/connexion') // une fois tout ca fait, redirige moi vers la page "connexion"
})
//------------------------------------------------------------------------------------------------------------------------------------

//------------------------------------------------------CONNEXION-------------------------------------------------------------------------
companyRouter.get("/connexion", async (req, res)=>{ //Cette ligne permet de creer la route connexion
    res.render('connexion.twig')// Elle nous ramene sur la page connexion twig, pour l'afficher
})

companyRouter.post("/connexion", async (req, res)=>{ // fonction qui servira à me connecter
    try {
       let company = await companyModel.findOne({mail: req.body.mail}) // ici il va récupérer le mail dans la bdd
       if (company && await crypto.comparePassword(req.body.password, company.password)){ // là il va comparer le mot de passe de la bdd 
        req.session.companyId = company._id
        res.redirect('/clientview')
       }
    } catch (error) {
        res.send(error)
    }
})
//---------------------------------------------------------client view-----------------------------------------------------------------------------
companyRouter.get("/clientview", authGuard, async (req, res)=>{ //sur cette route=> le authguard fera que, si je suis bien logué le reste du code s'executera
    let workers = await workerModel.find()
    res.render('clientview.twig',{ // je suis bien authentifié mon tableau de bord client apparait
        workers: workers
    })
})

//-------------------------------------------------------- AJOUTER BLAME-------------------------------------------------------------------------

companyRouter.get("/addBlame/:id", authGuard, async (req, res)=>{ //sur cette route=> le authguard fera que, si je suis bien logué le reste du code s'executera
    let worker = await workerModel.findById(req.params._id)
    let blame = parseInt(worker.blame)
    blame++
    if (blame >= 3) {
        res.redirect('deleteUser/'+ worker._id)
    }else{
        await workerModel.updateOne({_id: req.params.id},{blame: blame}) 
        res.redirect('clientview')

    }
    });
//----------------------------------------------------------DECONNEXION---------------------------------------------------------------------------
companyRouter.get("/logout", authGuard, async (req, res)=>{ //Cette fonction est pour la deconnexion 
   req.session.destroy() // la methode "destroy" "detruira" ma session
   res.redirect('/home') // redirige vers la page "home"
})



module.exports = companyRouter;