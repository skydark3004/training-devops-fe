module.exports = {
  deploy: {
    development: {
      user: 'thangl-vietis',
      host: ['34.124.149.226'], // IP server.
      ref: 'origin/main', // Branch Git to deploy
      repo: 'git@github.com:skydark3004/training-devops-fe.git', // Repository Git.
      path: '/home/thangl-vietis/deploy-fe-pm2', // directory to folder pm2 deploy
      'post-deploy': `sh deploy.sh development`,
    },
    staging: {
      user: 'thangl-vietis', // user to ssh
      host: ['34.124.149.226'], // IP server.
      ref: 'origin/main', // Branch Git to deploy
      repo: 'git@github.com:skydark3004/training-devops-fe.git', // Repository Git.
      path: '/home/thangl-vietis/deploy-fe-pm2', // directory to folder pm2 deploy
      'post-deploy': `sh deploy.sh staging`,
    },
  },
};
