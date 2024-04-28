import routerUser from './routes/userRouter.mjs'
import express from 'express'
import { config as dotenvConfig } from 'dotenv'
import fs from 'fs';
import swaggerUi from 'swagger-ui-express';

import cors from 'cors'


dotenvConfig()

const outputFile = "./swagger.json"
const PORT = process.env.PORT
const API_PATH = process.env.API_PATH || '/api/users/v1'
const ENV = process.env.ENV || 'DEV'
const APP = express()

APP.use(cors()) //cross-origin autorisé (pour les routes utilisant body)

APP.use(API_PATH, routerUser)

APP.use(express.json())

APP.get("/", (req, res) => {
    res.redirect(API_PATH)
})

routerUser.get("/", async (req, res) => {
    return res.redirect(API_PATH + "/docs")
})

routerUser.use('/docs', swaggerUi.serve);
routerUser.get('/docs', swaggerUi.setup(JSON.parse(fs.readFileSync(outputFile, 'utf8'))));

if (ENV != "TEST"){
    APP.listen(PORT, () => {
        console.log(`API User listening on port ${PORT}`)
    })
}


export default APP;