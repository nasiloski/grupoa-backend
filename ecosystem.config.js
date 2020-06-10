module.exports = {
    apps : [
      {
        name: 'API',
        script: 'src/app.js',
        cwd: __dirname ,
        instances: 1,
        autorestart: true,
        wait_ready: true,
        exp_backoff_restart_delay: 100,
        max_memory_restart: '512M',
        env: {
          NDBHOST: '127.0.0.1',
          DBUSER: 'grupoa',
          DBPASSWD: 'grupoa',
          DATABASE: 'grupoa',
          TOKENPASSWD: 'Teste12345@!'
        },
        env_production: {
          DBHOST: '127.0.0.1',
          DBUSER: 'grupoa',
          DBPASSWD: 'grupoa',
          DATABASE: 'grupoa',
          TOKENPASSWD: 'Teste12345@!'
        },
        env_homolog : {
          DBHOST: '127.0.0.1',
          DBUSER: 'grupoa_dev',
          DBPASSWD: 'grupoa_dev',
          DATABASE: 'grupoa_dev',
          TOKENPASSWD: 'Teste12345@!'
        }
      },
      {
        name: 'FronEnd',
        script: '../grupoa_frontend/node_modules/react-scripts/scripts/start.js',
        cwd: __dirname ,
        instances: 1,
        autorestart: true,
        wait_ready: true,
        env: {
          PORT: '80'
        },
        env_production: {
          PORT: '80'
        },
        env_homolog : {
          PORT: '80'
        }
      },      
    ]
  };