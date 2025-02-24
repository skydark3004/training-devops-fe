module.exports = {
  apps: [
    {
      name: 'front-end-development',
      script: 'npm',
      args: 'start',
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
        PORT: 8000,
      },
    },
  ],
};
