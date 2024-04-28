import{ assert, expect } from 'chai'
import { MongoMemoryServer } from 'mongodb-memory-server'
import supertest from 'supertest'
import userDao from '../dao/userDAO.mjs'
import { config as dotenvConfig } from 'dotenv'
import { APP } from '../server.mjs'

const API_PATH = process.env.API_PATH
const requestWithSupertest = supertest(server)

describe( "Test des routes de l'api User" , function () {
    let mongodb;

    beforeEach(async () => {
        mongodb = await MongoMemoryServer.create();
        const uri = mongodb.getUri();
        userDao.uri = uri;
    });

    afterEach(async () => {
        if (mongodb) {
            await mongodb.stop();
        }
    });

    it("POST /create/user", async () => {
        
    });

    it("", async () => {

    })
})

