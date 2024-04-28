"use strict"

import { MongoClient } from 'mongodb'
import { config as dotenvConfig } from 'dotenv'
import { User } from '../model/User.mjs'

dotenvConfig()




//Un schema permetant de typer les donner dans mongo
const options = {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["email", "password", "remainingSearchNews", "remainingSearchPlace", "savedArticles"],
            properties: {
                email: {
                    bsonType: "string",
                    pattern: "^\\w+([.-]?\\w+)*@\\w+([.-]?\\w+)*(\\.\\w{2,3})+$",
                    description: "must be a string formatted email and is required"
                },
                password: {
                    bsonType: "string",
                    description: "must be a string and is required"
                },
                remainingSearchNews: {
                    bsonType: "int",
                    description: "must be an integer and is required"
                },
                remainingSearchPlace: {
                    bsonType: "int",
                    description: "must be an integer and is required"
                },
                savedArticles: {
                    bsonType: "array",
                    description: "must be an array and is required",
                    items: {
                        bsonType: "object",
                        required: ["title", "link", "creator", "description", "date", "categories", "language", "image_url", "source_url", "source_icon"],
                        properties: {
                            title: {
                                bsonType: "string",
                                description: "The title of the news item."
                            },
                            link: {
                                bsonType: "string",
                                description: "The URL link to the news item."
                            },
                            creator: {
                                bsonType: "string",
                                description: "The creator or author of the news item."
                            },
                            description: {
                                bsonType: "string",
                                description: "A brief description of the news item."
                            },
                            date: {
                                bsonType: "string",
                                description: "The publication date of the news item."
                            },
                            categories: {
                                bsonType: "array",
                                description: "The category or categories of the news item.",
                                items: {
                                    bsonType: "string"
                                }
                            },
                            language: {
                                bsonType: "string",
                                description: "The language of the news item."
                            },
                            image_url: {
                                bsonType: "string",
                                description: "The URL of the image associated with the news item."
                            },
                            source_url: {
                                bsonType: "string",
                                description: "The source URL from where the news item was retrieved."
                            },
                            source_icon: {
                                bsonType: "string",
                                description: "The URL of the icon representing the source of the news item."
                            }
                        }
                    }
                }
            }
        }
    }
}


const userDao = {
    //Retourne la liste de tous les utilisateurs
    getAllUsers: async () => {
        const client = new MongoClient(userDao.uri)
        try {
            const maBD =  client.db()
            const users= maBD.collection("user", options)
            const cursor = users.find({},{projection: {_id:0,"email":1, "remainingSearchNews":1 , "remainingSearchPlace":1 ,"savedArticles":1 }})
            return (await cursor.toArray()).map((e)=> new User(e))
        } finally {
            await client.close();
        }
    },

    //Retourne un utilisateur suivant  son email ou null
    findUserFromEmail: async (email) => {
        const client = new MongoClient(userDao.uri)
        try {
            const maBD = client.db()
            const users= maBD.collection("user", options)
            const data = await users.findOne({"email": email},{projection: {_id:0 }})
            return data==null? data : new User(data)
        } finally {
            await client.close();
        }
    },
    //Supprime tous les utilisateurs ne renvoie rien
    deleteUsers: async () => {
        const client = new MongoClient(userDao.uri)
        try {
            const maBD = client.db()
            const users= maBD.collection("user", options)
            await users.deleteMany({});
        } finally {
            await client.close();
        }
    },

    deleteByEmail: async ( email ) => {
        const client = new MongoClient(userDao.uri)
        try{
            const maBD = client.db()
            const users = maBD.collection("user", options)
            await users.deleteOne({email : email})
        }finally{
            await client.close()
        }
    },

    //Ajoute un utilisateur et le renvoi
    //En cas d'echec renvoie Promise.reject(...)
    addUser: async (user) => {
        if ((await userDao.findUserFromEmail(user.email))!=null)
            return Promise.reject("duplicate name")
        const client = new MongoClient(userDao.uri)
        try {
            const maBD = client.db()
            const users= maBD.collection("user", options)
            user.savedArticles = []
            await users.insertOne(new User(user))
            return await userDao.findUserFromEmail(user.email)
        } finally {
            await client.close();
        }
    },

    //Met à jour un utilisateur connu par son email
    //renvoie le marking modifié ou Promise.reject(...)
    updateUser: async (email, args = { password : null, remainingSearchNews : null, remainingSearchPlace : null, savedArticles : null}) => {
        if (await userDao.findUserFromEmail(email)==null)
            return Promise.reject("utilisateur inconnu")
        const client = new MongoClient(userDao.uri)
        try {
            const newValues ={}
            if (args.password != null && typeof args.password == 'string')
                newValues["password"] = args.password                   
            if (args.remainingSearchNews != null && typeof args.remainingSearchNews == 'number')
                newValues["remainingSearchNews"] = args.remainingSearchNews
            if (args.remainingSearchPlace != null && typeof args.remainingSearchPlace == 'number')
                newValues["remainingSearchPlace"] = args.remainingSearchPlace
            if (args.savedArticles != null && Array.isArray(args.savedArticles))
                newValues["savedArticles"] = args.savedArticles
            const set = { $set : newValues}
            const maBD = client.db()
            const users= maBD.collection("user", options)
            await users.updateOne({email: email}, set)
            return await userDao.findUserFromEmail(email)
        } finally {
            await client.close();

        }
    },

    resetLimitSearchRequest: async ( limitNews, limitPlaces ) =>{
        const client = new MongoClient(userDao.uri)
        try {
            const maBD = client.db()
            const users = maBD.collection("user", options)
            await users.updateMany({}, {$set : { remainingSearchNews : limitNews, remainingSearchPlace : limitPlaces }})
        }finally{
            client.close()
        }
    }
}

const MONGODB_URI = process.env.MONGO_URL + '/' + process.env.MONGO_DB
userDao.uri = MONGODB_URI

export default userDao