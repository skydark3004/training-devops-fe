#!/bin/bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

environment=$1

npm install
npm run build 

#wait  

cp /home/thangl-vietis/deploy-fe-pm2/ecosystem.${environment}.config.js /home/thangl-vietis/deploy-fe-pm2/current/ecosystem.${environment}.config.js 

pwd 

ls -a 

cp -r public .next/standalone/ 
cp -r .next/static .next/standalone/.next/ 
pm2 startOrRestart ecosystem.${environment}.config.js --env ${environment}
