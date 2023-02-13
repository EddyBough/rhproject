const companyModel = require("../models/companyModel")

let authGuard = async (req, res, next)=>{ // le authguard va permettre de sécuriser ma route
    let company = await companyModel.findById(req.session.companyId)
    if (company) {
        next()
    }else{
        res.redirect('/connexion') // sinon, le authguard permettra de me rediriger vers la page "connexion" si mon id ne correpond pas. 
    }
}

module.exports = authGuard