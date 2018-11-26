module.exports = {
  apps : [
    {
      name      : 'CIDEM-front',
      script    : 'serve',
      watch     : true,
      instances : 2,
      exec_mode : 'cluster',
      env: {
        COMMON_VARIABLE: 'true',
        PM2_SERVE_PATH: './dist',
        PM2_SERVE_PORT: 8089,
        NODE_ENV: 'production'
      },
      env_production : {
        NODE_ENV: 'production'
      }
    }
  ]
};
