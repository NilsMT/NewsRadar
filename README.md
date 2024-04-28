![Bannière de l'IUT de Nantes](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfqjnqCW7ZcqxA21tA1D5cdep4Q0YTXs7LkocAAUlBiA&s)
<br>
Nantes Université - IUT - BUT Informatique

eq_02_03

SAE de Semestre 4 (2ème semestre de BUT2)

# Sommaire

1. [Présentation](#présentation)
   - [Description](#description)
   - [Membres du groupe](#membres-du-groupe)
   - [Les liens du projet](#les-liens-du-projet)
2. [Avertissements](#avertissements)
3. [Structure du projet](#structure-du-projet)
   - [API externes au projet](#api-externes-au-projet)
   - [API internes au projet](#api-internes-au-projet)
   - [Autres](#autres)
4. [Infrastructure du projet](#infrastructure-du-projet)
5. [Les commandes](#les-commandes)
   - [Lancer le projet](#lancer-le-projet)
   - [Générer les docs](#générer-les-docs)
   - [Autres commandes](#autres-commandes)
    - [Vider la base de données](#vider-la-base-de-données)
    - [Peupler la base de données](#peupler-la-base-de-données)
6. [Crédits](#crédits)


 

# Présentation

## Description

Dans le cadre de la SAE du Semestre 4 (2ème semestre de BUT2) nous devions créer un site Web utilisant des microservices (API) communiquants<br>

Notre projet consiste donc à rechercher des articles de journaux en ligne concernant un lieu saisi

## Membres du groupe

- Ibrahim AHAMADA
- David CHOCHO
- Tom FREMONT
- Bastian MARY
- Nils MOREAU--THOMAS

## Les liens du projet

- [Le git du projet](https://gitlab.univ-nantes.fr/pub/but/but2/sae4.real.01_developpement_d_une_application_complexe/groupe02/eq_02_03_moreau-thomas-nils_ahamada-ibrahim_chocho-david_fremont-tom_mary-bastian)
- [La maquette Figma du site web](https://www.figma.com/file/1QYo8rpmqy94S9mNQwBnII/Untitled?type=design&node-id=0%3A1&mode=design&t=hKGEThzH7oE29WMJ-1)
- [Le Trello du projet (pour l'organisation)](https://trello.com/b/1muSBevD/sae-s4)
- [Le Google Drive du projet](https://drive.google.com/drive/folders/1JAHkHc7BOLZikjgkctMQuXiOhc4eKc8T)

# Avertissements

> ⚠️ **Le projet tourne sous Node v20.12.2**<br>Le projet ne fonctionnera pas correctement en dessous de cette version

> ⚠️ **Le site Web à été prévu pour la résolution 1920 x 1080**<br>La disposition des éléments risques d'être problématique en dessous de cette résolution

> ⚠️ **Le projet à été prévu pour les machines de l'IUT de Joffre sous Linux**<br>Le fonctionnement du projet ne peut être garanti à 100% sur une machine différente

# Structure du projet
## API externes au projet

- **[NewsData](https://newsdata.io/)** : pour récupérer des articles concernant un lieu et / ou son pays
- **[OpenCage](https://opencagedata.com)** : pour récupérer les lieux ou pays selon le texte écrit

## API internes au projet

- **[newsAPI](/API/newsAPI)** : elle fait des requêtes à l'api [NewsData](https://newsdata.io/) et "nettoie" les résultats en enlevant les champs inutiles
- **[placeAPI](/API/placeAPI)** : elle fait des requêtes à l'api [OpenCage](https://opencagedata.com) et "nettoie" les résultats en enlevant les champs inutiles
- **[userAPI](/API/userAPI)** : elle fait la gestion des comptes utilisateurs, elle se fait utiliser par le site Web
- **[externalAPI](/API/externalAPI)** : elle fait des requêtes aux api [newsAPI](/API/newsAPI) et [placeAPI](/API/placeAPI), elle se fait utiliser par le site Web

## Autres

- **[tests](/API/tests)** : Les tests des API internes au projet ([userAPI](/API/userAPI), [placeAPI](/API/placeAPI), [newsAPI](/API/newsAPI), [externalAPI](/API/externalAPI))
- **[newsradar](/newsradar)** : Le site Web qui utilise [userAPI](/API/userAPI) et [externalAPI](/API/externalAPI)
- **[auto_refresh](/auto_refresh)** : pour actualiser automatiquement les limites d'appels à chaque API externes chaque jour (00:00) avec un délai de maximum 10 minutes pour tous les comptes utilisateurs
- **[des scripts .sh](/Scripts)** : pour exécuter tel ou tel chose

# Infrastructure du projet

- Un serveur qui fait tourner [le site Web](/newsradar) sur le port 5173
- Un processus qui fait tourner [auto_refresh](/auto_refresh)
- Un serveur express qui fait tourner [externalAPI](/API/externalAPI) sur le port 3000
- Un serveur express qui fait tourner [newsAPI](/API/newsAPI) sur le port 3001
- Un serveur express qui fait tourner [placeAPI](/API/placeAPI) sur le port 3002
- Un serveur express qui fait tourner [userAPI](/API/userAPI) sur le port 3003

# Les commandes

## Lancer le projet

1. Avoir la version 20.12.2 de NodeJS
2. Lancer le service mongodb

3. Lancer le script start_all.sh `./start_all.sh`

### OU

3. Ouvrir un terminal et se rendre dans [externalAPI](/API/externalAPI) et faire `npm run start`
4. Ouvrir un terminal et se rendre dans [newsAPI](/API/newsAPI) et faire `npm run start`
5. Ouvrir un terminal et se rendre dans [placeAPI](/API/placeAPI) et faire `npm run start`
6. Ouvrir un terminal et se rendre dans [userAPI](/API/userAPI) et faire `npm run start`
7. Ouvrir un terminal et se rendre dans [auto_refresh](/auto_refresh) et faire `node main.js`
8. Ouvrir un terminal et se rendre dans [le site Web](/newsradar) et faire `npm run start`



## Générer les docs

- Se rendre dans [externalAPI](/API/externalAPI) et faire `npm run generate-docs`
  - Doc accessible à l'URL [suivante](http://localhost:3000/externalAPI/docs)
- Se rendre dans [newsAPI](/API/newsAPI) et faire `npm run generate-docs`
  - Doc accessible à l'URL [suivante](http://localhost:3001/newsAPI/docs)
- Se rendre dans [placeAPI](/API/placeAPI) et faire `npm run generate-docs`
  - Doc accessible à l'URL [suivante](http://localhost:3002/placeAPI/docs)
- Se rendre dans [userAPI](/API/userAPI) et faire `npm run generate-docs`
  - Doc accessible à l'URL [suivante](http://localhost:3003/)

## Autres commandes

### Vider la base de données
- Se rendre dans [userAPI](/API/userAPI) et faire `npm run clear`

### Peupler la base de données
- Se rendre dans [userAPI](/API/userAPI) et faire `npm run populate`

# Crédits

- **[Stackoverflow](https://stackoverflow.com/)** : pour apporter de nombreuse réponses sur des problèmes rencontrée
- **[Fontawesome]()** : pour les icônes utilisées sur le site Web
- **[Google Fonts](https://fonts.google.com/)** : pour fournir les polices utilisées sur le site Web