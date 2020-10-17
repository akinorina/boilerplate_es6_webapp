module.exports = {
  apps : [{
    name: 'NAME',
    script: 'dist/public/index.js',
    watch: true,
    ignore_watch: [],
    instances: 3,
    env: {
      'NODE_ENV': 'development'
    },
    env_production: {
      'NODE_ENV': 'production'
    }
  }],

  deploy : {
    production : {
      key  : 'SSH key path',
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-setup': '',
      'post-setup': '',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload pm2.config.js --env production'
    }
  }
};
