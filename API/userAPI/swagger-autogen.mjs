import swaggerJSDoc from 'swagger-jsdoc';
import { config as dotenvConfig } from 'dotenv';
import fs from 'fs';

dotenvConfig();


const serverPort = process.env.PORT || 8080
const API_PATH = process.env.API_PATH

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/*.mjs'];

const options = {
    swaggerDefinition : {
        openapi: '3.1.0',
        info: {
            title: 'User API Documentation',
            description: "Documentation de l'API User",
            version: '1.0.0'
        },
        tags: [ ],
        servers: [{ url: 'http://localhost:' + serverPort + API_PATH }],
        schemes: ['http', 'https'],
    },
    apis: endpointsFiles,
    tags : [
        { name : "User", description : "Routes gérant les informations sensibles de l'utilisateur"},
        { name : "Articles saved", description : "Routes gérant les articles sauvegardés de l'utilisateur"},
        { name : "Remaining search requests", description : "Routes gérant le nombre de recherches pour chaque API"},
    ]
}

const swaggerSpec = swaggerJSDoc(options)

fs.writeFileSync(outputFile, JSON.stringify(swaggerSpec, null, 2))