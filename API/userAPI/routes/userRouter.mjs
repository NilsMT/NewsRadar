"use strict"
import express from "express";
import { userController } from "../controllers/userController.mjs";
import { User } from "../model/User.mjs";
import { Article } from "../model/Article.mjs";

const routerUser = express.Router()
routerUser.use(express.json());

routerUser.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

/**
 * @swagger
 * /tryLogin:
 *   post:
 *     summary: Authentification de l'utilisateur
 *     description: Authentifie l'utilisateur avec les informations d'identification fournies.
 *     tags : 
 *         - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Adresse e-mail de l'utilisateur.
 *               password:
 *                 type: string
 *                 description: Mot de passe de l'utilisateur.
 *     responses:
 *       200:
 *         description: Authentification réussie.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message de succès.
 *       404:
 *         description: Compte inexistant.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message d'erreur.
 *       400:
 *         description: Mot de passe incorrect ou erreur lors du traitement de la requête.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message d'erreur.
 */
routerUser.post("/tryLogin", async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    userController.findUserFromEmail(email).then( (result) => {
        if (!result){
            return res.status(404).json({ message : "compte inexistant" })
        }else{
            if (result.password == password){
                return res.status(200).json({ message : "authentification réussie" })
            }else{
                return res.status(400).json({ message : "Mot de passe incorrect"})
            }
        }

    })
})

/**
 * @swagger
 * /create/user:
 *   post:
 *     summary: Création de compte utilisateur
 *     description: Crée un nouveau compte utilisateur avec les informations fournies.
 *     tags : 
 *         - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Adresse e-mail du nouvel utilisateur.
 *               password:
 *                 type: string
 *                 description: Mot de passe du nouvel utilisateur.
 *     responses:
 *       200:
 *         description: Compte créé avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message de succès.
 *       409:
 *         description: Compte déjà existant.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message d'erreur.
 */
routerUser.post("/create/user", async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const user = new User({email : email, password : password,remainingSearchNews: 10,remainingSearchPlace: 125 })

    userController.addUser(user)
        .then( (result) => {
            return res.status(200).json({message : "creation du compte réussie"})
        })
        .catch( (err) => {
            return res.status(409).json({message : "Compte déjà existant"})
        })
})
/**
 * @swagger
 * /update/password:
 *   put:
 *     summary: Modification du mot de passe de l'utilisateur
 *     description: Modifie le mot de passe de l'utilisateur avec le nouveau mot de passe fourni.
 *     tags : 
 *         - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Adresse e-mail de l'utilisateur.
 *               password:
 *                 type: string
 *                 description: Mot de passe actuel de l'utilisateur.
 *               new_password:
 *                 type: string
 *                 description: Nouveau mot de passe de l'utilisateur.
 *     responses:
 *       200:
 *         description: Mot de passe changé avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message de succès.
 *       400:
 *         description: Mot de passe non identique ou erreur lors du traitement de la requête.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message d'erreur.
 *       404:
 *         description: Utilisateur inexistant.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message d'erreur.
 */
routerUser.put("/update/password", async ( req, res ) => {
    const email = req.body.email
    const password = req.body.password
    const new_password = req.body.new_password

    const user = await userController.findUserFromEmail(email)
    if (user){
        if (user.password == password){
            userController.updateUser(user.email, { password : new_password})
            .then( result => {
                return res.status(200).json({ message : "Mot de passe changé avec succès" })
            })
        }else{
            return res.status(400).json({ message : "Mot de passe invalide"})
        }
    } else {
        return res.status(404).json({ message : "Utilisateur inexistant "})
    }
})

/**
 * @swagger
 * /delete/user:
 *   delete:
 *     summary: Suppression de l'utilisateur
 *     description: Supprime l'utilisateur avec l'adresse e-mail fournie.
 *     tags : 
 *         - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Adresse e-mail de l'utilisateur à supprimer.
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message de succès.
 */
routerUser.delete("/delete/user", async (req, res) => {
    const email = req.body.email
    await userController.deleteByEmail(email)
    .then( result => {
        return res.status(200).json({ message : "Utilisateur supprimé avec succès" })
    })
})

//Article

/**
 * @swagger
 * /create/savedArticle:
 *   post:
 *     summary: Ajout d'un article sauvegardé
 *     description: Ajoute un nouvel article sauvegardé à la liste des articles sauvegardés de l'utilisateur.
 *     tags : 
 *         - Articles saved
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Adresse e-mail de l'utilisateur.
 *               article:
 *                 type: object
 *                 description: Article à sauvegarder.
 *     responses:
 *       200:
 *         description: Ajout de l'article réussi.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message de succès.
 *                 savedArticles:
 *                   type: array
 *                   description: Liste mise à jour des articles sauvegardés de l'utilisateur.
 *       404:
 *         description: Utilisateur inexistant.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message d'erreur.
 *       500:
 *         description: Erreur avec la route.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message d'erreur.
 */
routerUser.post("/create/savedArticle", async (req, res) => {
    const email = req.body.email
    const article = new Article(req.body.article)
    const user = await userController.findUserFromEmail(email)
    if (!user)
        return res.status(404).json({ message : "Utilisateur inexistant" })
    if (article.id_news == null)
        article.id_news = user.savedArticles.lenght
    user.savedArticles.push(article)
    userController.updateUser(user.email, { savedArticles : user.savedArticles})
    .then( result => {
        return res.status(200).json({ message : "Ajout de l'article réussi", savedArticles : result.savedArticles })
    })
    .catch().catch( err => {
        return res.status(500).json({message : "Erreur avec la route"})
    })
    
})


/**
 * @swagger
 * /delete/savedArticle:
 *   delete:
 *     summary: Suppression d'un article sauvegardé
 *     description: Supprime un article sauvegardé de la liste des articles sauvegardés de l'utilisateur.
 *     tags : 
 *         - Articles saved
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Adresse e-mail de l'utilisateur.
 *               id_article:
 *                 type: string
 *                 description: Identifiant de l'article à supprimer.
 *     responses:
 *       200:
 *         description: Suppression de l'article réussie.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message de succès.
 *                 savedArticles:
 *                   type: array
 *                   description: Liste mise à jour des articles sauvegardés de l'utilisateur.
 *       404:
 *         description: Utilisateur inexistant ou article non trouvé dans les articles sauvegardés de l'utilisateur.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message d'erreur.
 */
routerUser.delete("/delete/savedArticle", async (req, res) => {
    const { email, id_article } = req.body
    const user = await userController.findUserFromEmail(email)
    let index = -1

    if (!user)
        return res.status(404).json({ message : "Utilisateur inexistant" })

    user.savedArticles.forEach(element => {
        if (element.id_news == id_article){
            index = user.savedArticles.indexOf(element)
            return
        }
    });
    if ( index > -1){
        user.savedArticles.splice(index, 1)
        userController.updateUser(user.email, { savedArticles : user.savedArticles })
        .then( result => {
            return res.status(200).json({ message : "Suppression de l'article réussie", savedArticles : result.savedArticles })
        })
    }else{
        return res.status(404).json({ message : "Cet article n'est pas dans les articles sauvegardés de l'utilisateur"})
    }
    
})

/**
 * @swagger
 * /get/savedArticles/{email}:
 *   get:
 *     summary: Récupération des articles sauvegardés
 *     description: Récupère la liste des articles sauvegardés de l'utilisateur.
 *     tags : 
 *         - Articles saved
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: L'adresse e-mail de l'utilisateur.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Articles sauvegardés envoyés avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message de succès.
 *                 savedArticles:
 *                   type: array
 *                   description: Liste des articles sauvegardés de l'utilisateur.
 *       404:
 *         description: Utilisateur inexistant.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message d'erreur.
 */
routerUser.get("/get/savedArticles/:email", async (req, res) => {
    const email = req.params.email
    userController.findUserFromEmail(email)
    .then( (user) => {
        if (user)
            return res.status(200).json({ message : "Articles sauvegardés envoyés avec succès", savedArticles : user.savedArticles})
        else
            return res.status(404).json({ message : "Utilisateur inexistant" })
    })
})

// News requests remaining

/**
 * @swagger
 * /get/remainingNewsSearch/{email}:
 *   get:
 *     summary: Récupération du nombre de recherches d'articles restantes
 *     description: Récupère le nombre de recherches d'articles restantes de l'utilisateur.
 *     tags : 
 *         - Remaining search requests
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: L'adresse e-mail de l'utilisateur.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Nombre de recherches d'articles envoyé avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message de succès.
 *                 limit:
 *                   type: integer
 *                   description: Nombre de recherches d'articles restantes de l'utilisateur.
 *       404:
 *         description: Utilisateur inexistant.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message d'erreur.
 */
routerUser.get("/get/remainingNewsSearch/:email", async (req, res) => {
    const email = req.params.email
    userController.findUserFromEmail(email).then( user => {
        if ( user ){
            return res.status(200).json({ message : "Nombre de recherches d'articles envoyés avec succès", limit : user.remainingSearchNews})
        }else{
            return res.status(404).json({ message : "Utilisateur inexistant" })
        }
    })
})

/**
 * @swagger
 * /update/remainingNewsSearch:
 *   put:
 *     summary: Mise à jour du nombre de recherches d'articles restantes
 *     description: Met à jour le nombre de recherches d'articles restantes de l'utilisateur avec la valeur fournie.
 *     tags : 
 *         - Remaining search requests
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Adresse e-mail de l'utilisateur.
 *               remainingSearchNews:
 *                 type: integer
 *                 description: Nouveau nombre de recherches d'articles restantes de l'utilisateur.
 *     responses:
 *       200:
 *         description: Mise à jour du nombre de recherches d'articles restantes de l'utilisateur réussie.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message de succès.
 *       404:
 *         description: Utilisateur inexistant.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message d'erreur.
 *       500:
 *         description: Erreur avec le DAO ou erreur avec la route.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message d'erreur.
 */
routerUser.put("/update/remainingNewsSearch", async (req, res) => {
    const email = req.body.email
    const remainingSearchNews = req.body.remainingSearchNews
    userController.updateUser(email, {remainingSearchNews : remainingSearchNews})
    .then( user => {
        if (user.remainingSearchNews == remainingSearchNews){
            return res.status(200).json({ message : "Mise à jour du nombre recherches d'articles restantes de l'utilisateur réussi" })
        }else{
            return res.status(500).json({ message : "Erreur avec le DAO" })
        }
    })
    .catch( err => {
        return res.status(404).json({message : "Utilisateur inexistant"})
    })
    .catch( err => {
        return res.status((500)).json({message : "Erreur avec la route"})
    })
})



// Place requests remaining

/**
 * @swagger
 * /get/remainingPlacesSearch/{email}:
 *   get:
 *     summary: Récupération du nombre de recherches de lieux restantes
 *     description: Récupère le nombre de recherches de lieux restantes de l'utilisateur.
 *     tags : 
 *         - Remaining search requests
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: L'adresse e-mail de l'utilisateur.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Nombre de recherches de lieux envoyé avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message de succès.
 *                 limit:
 *                   type: integer
 *                   description: Nombre de recherches de lieux restantes de l'utilisateur.
 *       404:
 *         description: Utilisateur inexistant.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message d'erreur.
 */
routerUser.get("/get/remainingPlacesSearch/:email", async (req, res) => {
    const email = req.params.email
    userController.findUserFromEmail(email).then( user => {
        if ( user ){
            return res.status(200).json({ message : "Nombre de recherches de lieux envoyés avec succès", limit : user.remainingSearchPlace })
        }else{
            return res.status(404).json({ message : "Utilisateur inexistant" })
        }
    })
})

/**
 * @swagger
 * /update/remainingPlacesSearch:
 *   put:
 *     summary: Mise à jour du nombre de recherches de lieux restantes
 *     description: Met à jour le nombre de recherches de lieux restantes de l'utilisateur avec la valeur fournie.
 *     tags : 
 *         - Remaining search requests
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Adresse e-mail de l'utilisateur.
 *               remainingSearchPlace:
 *                 type: integer
 *                 description: Nouveau nombre de recherches de lieux restantes de l'utilisateur.
 *     responses:
 *       200:
 *         description: Mise à jour du nombre de recherches de lieux restantes de l'utilisateur réussie.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message de succès.
 *       404:
 *         description: Utilisateur inexistant.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message d'erreur.
 *       500:
 *         description: Erreur avec le DAO ou erreur avec la route.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message d'erreur.
 */
routerUser.put("/update/remainingPlacesSearch", async (req, res) => {
    const email = req.body.email
    const remainingSearchPlace = req.body.remainingSearchPlace
    userController.updateUser(email, {remainingSearchPlace : remainingSearchPlace})
    .then( user => {
        if (user.remainingSearchPlace == remainingSearchPlace){
            return res.status(200).json( { message : "Mise à jour du nombre recherches de lieux restantes de l'utilisateur réussi" } )
        }else{
            return res.status(500).json({ message : "Erreur avec le DAO", data : user.remainingSearchPlace})
        }
    })
    .catch( err => {
        return res.status(404).json({ message : "Utilisateur inexistant"})
    })
    .catch( err => {
        return res.status(500).json({ message : "Erreur avec la route" })
    })
})

export default routerUser;