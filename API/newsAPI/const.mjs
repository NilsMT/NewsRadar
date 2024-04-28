import express from "express"
import {HttpsProxyAgent} from 'https-proxy-agent';
import path from 'path';

/** 
 * @module constants
 * @description this module provides all constants of this server
 * 
 * @ignore
 */

/**
 * @memberof module:constants
 * 
 * @name APP
 * @description it represents the server that will manage
 * all requests, responses and routes
 * 
 * @constant {Function}
 */
export const APP = express()

/**
 * @memberof module:constants
 * 
 * @name PORT
 * @description the port the server listen to
 * @constant {int}
 * @default 3001
 */
export const PORT = 3001

const proxy = process.env.https_proxy

/**
 * @memberof module:constants
 * 
 * @name AGENT
 * @description the agent handle the presence of a proxy or note 
 * and permit to include it in requests if there is one
 * @constant {?HttpsProxyAgent}
 */
export const AGENT = proxy ? new HttpsProxyAgent(proxy) : null
console.log( proxy ? `Le proxy est ${proxy}` : "Pas de proxy trouvé")

/**
 * @memberof module:constants
 * 
 * @name ROOT
 * @description blalbla
 * @constant {string}
 */
export const ROOT = path.resolve(new URL(import.meta.url).pathname, '..') 