"use strict"
import { Article } from "../model/Article.mjs";

export class User {
    email
    password
    remainingSearchNews = 0
    remainingSearchPlace = 0
    savedArticles = []

    constructor(obj) {
        //declare et instancie les attribut en recopiant ceux de obj
        Object.assign(this, obj)
        this.savedArticles.map( obj => new Article(obj))
    }

}
