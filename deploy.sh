#!/bin/bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

environment=$1

# env client side
cp /home/thangl-vietis/deploy-fe-pm2/.env-${environment} /home/thangl-vietis/deploy-fe-pm2/current/.env

#env server side
cp /home/thangl-vietis/deploy-fe-pm2/ecosystem.${environment}.config.js /home/thangl-vietis/deploy-fe-pm2/current/ecosystem.${environment}.config.js 

npm install
npm run build 

echo "pm2 startOrRestart ecosystem.${environment}.config.js --env ${environment}"

#cp -r public .next/standalone/ 
#cp -r .next/static .next/standalone/.next/ 
pm2 startOrRestart ecosystem.${environment}.config.js --env ${environment}
