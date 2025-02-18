#!/bin/bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

environment=$1

npm install
npm run build

cp /home/thangl-vietis/deploy-fe-pm2/.env-${environment} /home/thangl-vietis/deploy-fe-pm2/current/.env


cp -r public .next/standalone/
cp -r .next/static .next/standalone/.next/

export $(grep -v '^#' .env | xargs)

pm2 startOrRestart ecosystem.${environment}.config.js --env ${environment}
