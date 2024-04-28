import express from "express";
import { NEWSDATA } from "./newsdataDAO.mjs";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import serveIndex from 'serve-index';

/**
 * @module routes
 * 
 * @description This express router provides routes to get data about countries and news 
 * from external APIs
 */
const routerData = express.Router()

routerData.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    next()
})

const jsdocDir = join(dirname(fileURLToPath(import.meta.url)), 'docs', 'out'); // Chemin vers le dossier contenant les fichiers de documentation JSDoc
routerData.use('/docs', express.static(jsdocDir), serveIndex(jsdocDir, { 'icons': true }));
/** 
 * @memberof module:routes
 * @name /newsAPI/country/
 * 
 * @function
 * @description This route return a list of news found related to the place provided
 * @param {string} country_code the country code that represents the country of the request
 * @returns {NewsArrayObject} a json containing the number of results, the next_page id and the news OR a json with a unique error property
 */
routerData.get("/country/:country_code", async (req, res) => {
    let country_code = req.params.country_code
    let news = await NEWSDATA.getNewsByCountry(country_code)

    if ('error_code' in news){
        res.status(news.error_code).json(news)
    }else{
        res.status(200).json(news)
    }
    
})

/** 
 * @memberof module:routes
 * @name /newsAPI/country/
 * 
 * @function
 * @description This route return a list of news found related to the place provided
 * @param {string} country_code the country code that represents the country of the request
 * @param {?string} city the city name that will be searched in news for a more specific result, if not null ( /!\ not very efficient )
 * @returns {NewsArrayObject} a json containing the number of results, the next_page id and the news OR a json with a unique error property
 */
routerData.get("/country/:country_code/:city", async (req, res) => {
    let country_code = req.params.country_code
    let city = req.params.city
    let news = await NEWSDATA.getNewsByCountry(country_code,city)

    if ('error_code' in news){
        res.status(news.error_code).json(news)
    }else{
        res.status(200).json(news)
    }
    
})

export default routerData;