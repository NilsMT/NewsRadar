#!/bin/bash
# Se déplacer vers le répertoire userAPI
cd API/userAPI/
npm run start &
cd ../placeAPI/
npm run start &
cd ../newsAPI/
npm run start &
cd ../externalAPI/
npm run start &

# Revenir au répertoire newsradar
cd ../../newsradar/
npm run start 
