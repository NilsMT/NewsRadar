# Accueil

## Constantes 

`PORT = 3000` 

`BASE_URL = http://localhost:PORT/`

## Utilisation des routes

pour acceder aux routes de cette API, il faut ecrire le lien dans ce format :    
`BASE_URL/laroute`

pour inclure les paramètres indiqués quant il y en a il faut le faire comme ceci :   
`BASE_URL/laroute/param1/param2/...`   

Par exemple pour acceder a la route `/externalAPI/NewByCountry/( country_code )`   
l'url complet est : `http://http://localhost:3000/externalAPI/NewsByCountry/fr`

## Codes de retours possibles des routes 

| Code | Signification                                      |
|------|----------------------------------------------------|
| 200  | Succès de la requête                               |
| 201  | Aucun élément trouvé                               |
| 401  | Erreur de communication avec le serveur (paramètre invalide ou inexistant, etc.) |
