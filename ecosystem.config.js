// PM2_SERVE_PORT: 8089
module.exports = {
  apps : [
    {
      name      : 'CIDEM-front',
      script    : './server.js',
      watch     : true,
      instances : 4,
      exec_mode : 'cluster',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production : {
        NODE_ENV: 'production'
      }
    }
  ]
};
