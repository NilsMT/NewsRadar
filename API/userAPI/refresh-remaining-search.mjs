import userDao from './dao/userDAO.mjs'
import {config as dotenvConfig} from "dotenv";
import fs from 'fs'
import { setTimeout } from 'timers/promises';


dotenvConfig()

const MtoH = (minute) => {
    return minute * 60 * 1000
}

const PATH = "./cache/cache-refresh.json"

const date_now = ( milliseconds = Date.now() ) => new Date(milliseconds)
const MINUTE = 10

const LIMIT_SEARCH_NEWS = process.env.LIMIT_SEARCH_NEWS || 0
const LIMIT_SEARCH_PLACES = process.env.LIMIT_SEARCH_PLACES || 0

const old_date = async () => {
    const heure_string = fs.readFileSync(PATH, (err, data) => {
        if (err)
            console.log(err)
        else
            return data
    })
    if (date_string){
        const date = JSON.parse(heure_string)
    }
    return date
}
//MtoH(MINUTE)

async function checkAndUpdate() {
    let current_date = Date("2020-07-24")
    while (true) {
        current_date = date_now()
        if (current_date != (await old_date())){
            await updateDate()
            await userDao.resetLimitSearchRequest(LIMIT_SEARCH_NEWS, LIMIT_SEARCH_PLACES)  
            const users = await userDao.getAllUsers()
            users.forEach(user => {
                if (user.remainingSearchNews != LIMIT_SEARCH_NEWS && user.remainingSearchPlaces != LIMIT_SEARCH_PLACES){
                    fs.appendFileSync('./logs/log-'+current_date+".txt", user+'/n'+"probleme avec cet utilisateur")
                }
            });
        }
        setTimeout(200)
    }
}

async function updateDate(){
    fs.writeFileSync(PATH, date_now())
}


await checkAndUpdate();



/***
 * 1 - stocker la derniere date de mise à jour
 * 2 - vérifier les jours au lieu de l'heure
 * 3 - On ne considère pas l'erreur : 
 * on reset, il y a un utilisateur qui effectue une recherche donc ça limite de recherches est modifié au même moment que le reset, throw erreur
 * 
 */