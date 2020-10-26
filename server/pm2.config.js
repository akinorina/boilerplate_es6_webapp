module.exports = {
  apps : [{
    name: 'boilerplate_es6_webapp',
    script: './dist/public/index.js',
    watch: true,
    ignore_watch: [],
    exec_mode: 'fork',
    env: {
      'NODE_ENV': 'development',
      'PORT': 3300,
      'DATABASE_URL': 'mysql://boilerplate_es6_webapp:boilerplate_es6_webapp@localhost:3306/boilerplate_es6_webapp'
    },
    env_production: {
      'NODE_ENV': 'production',
      'PORT': 3300,
      'DATABASE_URL': 'mysql://boilerplate_es6_webapp:boilerplate_es6_webapp@localhost:3306/boilerplate_es6_webapp'
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
