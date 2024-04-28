import { AGENT } from "./const.mjs"
import fetch from 'node-fetch'

/**
 * @module DAO
 * @description This object is a DAO used for fetch data from the API NewsData
 * and filter them.
 * 
 * @property {string} api_key the key of the api used for all requests (required)
 * @property {string} base_url the url of the api used for all requests (required)
 * 
 * @author David CHOCHO
 */
export const NEWSDATA = new class {
    #api_key = 'pub_390525b06852ff2f5f249a428ae834636f4f8'
    #base_url = 'https://newsdata.io/api/1/news'


    
    /**
     * @memberof module:DAO
     * @description private method that return the url to the
     * api with the api key already included

     * @returns {string} a url like base_url?apikey=api_key
     */
    #makeLinkForRequest() {
        return this.#base_url+'?apikey='+this.#api_key
    }

    /**
     * @memberof module:DAO
     * @description method used for get a list of news from the NewsData API
     * linked to the specified country and formatted in a json with filtered fields
     *
     * @async
     * @param {string} country_code the country code that represents the country of the request
     * @param {?string} [city=null] the city name that will be searched in news for a more specific result, if not null ( /!\ not very efficient )
     * @returns {NewsArrayObject|ErrorObject} a json containing the number of results, the next_page id and the news
     */
    async getNewsByCountry(country_code, city=null){
        let url = this.#makeLinkForRequest()+(city?'&q='+city:'')+'&country='+country_code
        let news = await (await fetch(url, {agent: AGENT})).json()
        if (news.status == "error"){
            return {
                error_code: 401,
                url: url,
                error: "Communication error with NewsDataAPI"
            }
        }else if (news.totalResults == 0){
            return {
                error_code: 201,
                url: url,
                error: "No such news found for the country : "+country_code
            }
        }
        return this.#toFormattedArrayJson(news)
    }

    /**
     * @memberof module:DAO
     * @description method used for format a news json from the NEWSDATA API to our format
     *
     * @async
     * @param {json} news the json object that represent a news returned by a NEWSDATA request
     * @returns {NewsObject} a json that represents a news in our format
     */
    #toFormattedJson(news){
        return {
            id_news: news.article_id,
            title: news.title,
            link: news.link,
            creator: news.creator,
            description: news.description,
            date: news.pubDate,
            categories: news.category,
            language: news.language,
            image_url: news.image_url,
            source_url: news.source_url,
            source_icon: news.source_icon,
            
        }
    }

    /**
     * @memberof module:DAO
     * @description method used for format a result json from the NEWSDATA API to our format
     *
     * @async
     * @param {?json} [result=null] the json object that represent an array of news returned by a NEWSDATA request
     * @returns {NewsArrayObject} a json containing the number of results, the next_page id and the news in our format
     */
    #toFormattedArrayJson(result = null){

        let multipleNews = {
            total_results: 0,
            next_page : null,
            news: []
        }
        if (result == null || result.totalResults == 0){
            return multipleNews
        }

        multipleNews.total_results = result.totalResults
        multipleNews.next_page = result.nextPage
        result.results.map( news => {
            multipleNews.news.push(this.#toFormattedJson(news))
        })
        return multipleNews
    }
}
