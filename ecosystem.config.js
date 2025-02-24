module.exports = {
  apps: [
    {
      name: 'front-end-development',
      script: '.next/standalone/server.js',
      instances: '2',
      exec_mode: 'cluster',
      watch: false,
      ignore_watch: ['node_modules', 'logs'],
      output: './logs/out.json',
      error: './logs/error.json',
      log_type: 'json',
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      log_file: './logs/combined.json',
      max_memory_restart: '500M',
      pid_file: './logs/app.pid',
      autorestart: true,
      restart_delay: 5000,
      min_uptime: '60s',
      max_restarts: 5,
      shutdown_with_message: true,
      time: true,

      env_development: {
        NEXT_PUBLIC_NODE_ENV: 'development',
        NEXT_PUBLIC_KEY_ACCESS_TOKEN: 'accessToken',
        PORT: 'root',
        NEXT_PUBLIC_BASE_URL_BACK_END: 'secret',
      },
    },
  ],
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
