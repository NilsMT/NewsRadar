import express from "express";
import { OPENCAGE } from './opencageDAO.mjs'
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import serveIndex from 'serve-index';

/**
 * @module module:routes
 * 
 * @description This express router provides routes to get data about countries and news 
 * from external APIs
 */
const routerData = express.Router()

routerData.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

const jsdocDir = join(dirname(fileURLToPath(import.meta.url)), 'docs', 'out'); // Chemin vers le dossier contenant les fichiers de documentation JSDoc
routerData.use('/docs', express.static(jsdocDir), serveIndex(jsdocDir, { 'icons': true }));

/** 
 * @memberof module:routes
 * @name /placeAPI/place/
 * 
 * @function
 * @description This route return the first country found related to the place provided
 * @param {string} place a place in the world (country,city,monument,...)
 * @returns {CountryObject|ErrorObject} a json that represents a country in our format OR a json with a unique error property
 */
routerData.get("/place/:place", async (req, res) => {
    let place = req.params.place
    let country = await OPENCAGE.getCountryByPlace(place)
    
    if ('error_code' in country){
        res.status(country.error_code).json(country)
    }else{
        res.status(200).json(country)
    }
    
})

/** 
 * @memberof module:routes
 * @name /placeAPI/places/
 * 
 * @function
 * @description This route return a list of countries found related to the place provided
 * @param {string} place a place in the world (country,city,monument,...)
 * @returns {CountryArrayObject|ErrorObject} a json containing the number of results and the countries in our format OR a json with a unique error property
 */
routerData.get("/places/:place", async (req, res) => {
    let place = req.params.place
    let countrys = await OPENCAGE.getCountriesByPlace(place)

    if ('error_code' in countrys) {
        res.status(countrys.error_code).json(countrys)
    }else{
        res.status(200).json(countrys)
    }

})

export default routerData;