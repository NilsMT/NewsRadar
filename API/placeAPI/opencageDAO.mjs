import { AGENT } from './const.mjs'
import fetch from 'node-fetch'

/**
 * @memberof module:DAO
 * @description This object is a DAO used for fetch data from the API OpenCage
 * and filter them.
 *
 * @property {string} api_key the key of the api used for all requests (required)
 * @property {string} base_url the url of the api used for all requests (required)
 * 
 * @author David CHOCHO
 */
export const OPENCAGE = new class {
    #api_key = '5f550739c8b64fcf9317954adf673d9b'
    #base_url = 'https://api.opencagedata.com/geocode/v1/json'

    /**
     * @module DAO
     * @description private method that return the url to the
     * api with the api key already included
     * 
     * @returns {string} a url like base_url?key=api_key
     */
    #makeLinkForRequest() {
        return this.#base_url+'?key='+this.#api_key
    }

    /**
     * @memberof module:DAO
     * @description method used for get a country from the OpenCage API
     * linked to the specified place and formatted in a json with filtered fields
     *
     * @async
     * @param {string} place a place in the world (country,city,monument,...)
     * @returns {CountryArrayObject|ErrorObject} a json that represents a country in our format
     */
    async getCountryByPlace(place){
        let url = this.#makeLinkForRequest()+'&q='+place
        let res = await (await fetch(url, {agent : AGENT})).json()

        if (res.status.code!=200){
            return {
                error_code : 401,
                url : url,
                error_message : "Communication error with OpencageAPI"
            }
        }else if (res.total_results == 0){
            return {
                error_code : 201,
                url : url,
                error_message : "No country found with the specified place"
            }
        }
        return this.#toFormattedJson(res.results[0])
    }

    /**
     * @memberof module:DAO
     * @description method used for get a list of countries from the OpenCage API
     * linked to the specified place and formatted in a json with filtered fields
     *
     * @async
     * @param {string} place a place in the world (country,city,monument,...)
     * @returns {CountryArrayObject|ErrorObject} a json containing the number of results and the countries in our format
     */
    async getCountriesByPlace(place){
        let url = this.#makeLinkForRequest()+'&q='+place
        let res = await (await fetch(url, {agent : AGENT})).json()

        if (res.status.code!=200){
            return {
                error_code : 401,
                url : url,
                error_message : "Communication error with OpencageAPI"
            }
        }else if (res.total_results == 0){
            return {
                error_code : 201,
                url : url,
                error_message : "No countries found with the specified place"
            }
        }

        return this.#toFormattedArrayJson(res)
    }

    /**
     * @memberof module:DAO
     * @description method used for format a country json from the OPENCAGE API to our format
     *
     * @async
     * @param {json} country the json object that represent a country returned by a OPENCAGE request
     * @returns {CountryObject} a json that represents a country in our format
     */
    #toFormattedJson(country){
        let adrr = country.annotations.flag+" "+country.formatted
        return {
            longitude: country.geometry.lng,
            latitude: country.geometry.lat,
            currency: country.annotations.currency ? country.annotations.currency.name : null,
            flag: country.annotations.flag,
            continent: country.components.continent,
            country: country.components.country,
            country_code: country.components.country_code,
            city: country.components.city,
            postcode: country.components.postcode,
            adress: adrr
        }
    }

    /**
     * @memberof module:DAO
     * @description method used for format a result json from the OPENCAGE API to our format
     *
     * @async
     * @param {?json} [result=null] the json object that represent an array of countries returned by a OPENCAGE request
     * @returns {CountryArrayObject} a json containing the number of results and the countries in our format
     */
    #toFormattedArrayJson(result = null){

        let results = {
            total_results: result.total_results,
            countries: []
        }

        result.results.map( country => {
            results.countries.push(this.#toFormattedJson(country))
        })
        return results
    }
}