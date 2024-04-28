import express from "express";
import fetch from "node-fetch";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import serveIndex from 'serve-index';

/**
 * @module routes
 * 
 * @description This express router provides routes to get data about countries and news 
 * from external APIs
 */
const routerExtern = express.Router()

routerExtern.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

const jsdocDir = join(dirname(fileURLToPath(import.meta.url)), 'docs', 'out'); // Chemin vers le dossier contenant les fichiers de documentation JSDoc
routerExtern.use('/docs', express.static(jsdocDir), serveIndex(jsdocDir, { 'icons': true }));

/** 
 * @memberof module:routes
 * @name /externalAPI/NewsByPlace/
 * 
 * @function
 * @description This route return a list of news found related to the place provided
 * @param {string} place a place in the world (country,city,monument,...)
 * @returns {NewsArrayObject|ErrorObject} a json containing the number of results, the next_page id and the news OR a json with a unique error property
 */
routerExtern.get("/NewsByPlace/:place", async (req, res) => {
    let place = req.params.place
    let country = await (await fetch("http://127.0.0.1:3002/placeAPI/place/"+place)).json()
    if ('error_code' in country){
        res.status(country.error_code).json(country)
    }else{
        let news = await (await fetch("http://127.0.0.1:3001/newsAPI/country/"+country.country_code)).json()
        
        if ('error_code' in news){
            res.status(news.error_code).json(news)
        }else{
            res.status(200).json(news)
        }
    }
})

/** 
 * @memberof module:routes
 * @name /externalAPI/NewsByCountry/
 * 
 * @function
 * @description This route return a list of news found related to the country with the specified country code provided
 * @param {string} country_code the alpha-2 code of a country in the world
 * @returns {NewsArrayObject|ErrorObject} a json containing the number of results, the next_page id and the news OR a json with a unique error property
 */
routerExtern.get("/NewsByCountry/:country_code", async (req, res) => {
    let country_code = req.params.country_code
    let news = await(await fetch("http://127.0.0.1:3001/newsAPI/country/"+country_code)).json()
    
    if ('error_code' in news){
        res.status(news.error_code).json(news)
    }else{
        res.status(200).json(news)
    }
})

/** 
 * @memberof module:routes
 * @name /externalAPI/NewsByCountry/
 * 
 * @function
 * @description This route return a list of news found related to the country with the specified country code provided and the city if provided
 * @param {string} country_code the alpha-2 code of a country in the world
 * @param {?string} city the city name that will be searched in news for a more specific result, if not null ( /!\ not very efficient )
 * @returns {NewsArrayObject|ErrorObject} a json containing the number of results, the next_page id and the news OR a json with a unique error property
 */
routerExtern.get("/NewsByCountry/:country_code/:city", async (req, res) => {
    let country_code = req.params.country_code
    let city = req.params.city
    let news = await(await fetch("http://127.0.0.1:3001/newsAPI/country/"+country_code+"/"+city)).json()
    
    if ('error_code' in news){
        res.status(news.error_code).json(news)
    }else{
        res.status(200).json(news)
    }
})

/** 
 * @memberof module:routes
 * @name /externalAPI/CountryByPlace/
 * 
 * @function
 * @description This route return the first country found related to the place provided
 * @param {string} place a place in the world (country,city,monument,...)
 * @returns {CountryObject|ErrorObject} a json that represents a country in our format OR a json with a unique error property
 */
routerExtern.get("/CountryByPlace/:place", async (req, res) => {
    let place = req.params.place
    let country = await(await fetch("http://127.0.0.1:3002/placeAPI/place/"+place)).json()
    
    if ('error_code' in country){
        res.status(country.error_code).json(country)
    }else{
        res.status(200).json(country)
    }
    
})

/** 
 * @memberof module:routes
 * @name /externalAPI/CountriesByPlace/
 * 
 * @function
 * @description This route return a list of countries found related to the place provided
 * @param {string} place a place in the world (country,city,monument,...)
 * @returns {CountryArrayObject|ErrorObject} a json containing the number of results and the countries in our format OR a json with a unique error property
 */
routerExtern.get("/CountriesByPlace/:place", async (req, res) => {
    let place = req.params.place
    let countrys = await(await fetch("http://127.0.0.1:3002/placeAPI/places/"+place)).json()
    
    if ('error_code' in countrys){
        res.status(countrys.error_code).json(countrys)
    }else{
        res.status(200).json(countrys)
    }

})

export default routerExtern;